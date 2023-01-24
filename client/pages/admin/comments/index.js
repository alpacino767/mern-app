import { useEffect, useState,useContext } from 'react';
import { Button, Row, Col, List,Input } from 'antd';
import AdminLayout from '../../../components/layout/AdminLayout';
import  Link  from 'next/link'
import { PlusOutlined } from '@ant-design/icons'
import axios from 'axios';
import { useRouter } from 'next/router'
import {AuthContext} from "../../../context/auth"
import dayjs from "dayjs"
// import localizedFormat from  "dayjs/plugin/localized"
var localizedFormat = require('dayjs/plugin/localizedFormat')

dayjs.extend(localizedFormat)





function Comments() {
    //  context
    const [auth, setAuth] = useContext(AuthContext)

    // state
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [keyword, setKeyword] = useState("")
    // hook
    const router = useRouter()
 

   useEffect(() => {
    if(auth?.token) {
        fetchComments();
        getTotal()
    }
}, [auth?.token])

useEffect(() => {
    if(page === 1) return 
    if(auth?.token) fetchComments()
}, [page])
  
const fetchComments = async () => {
    try {
        const { data } = await axios.get(`/comments/${page}`)
        setComments([...comments, ...data])
    } catch (error) {
        (error);
    }
}
 const getTotal = async () => {
    try {
        const { data } = await axios.get("/comment-count")
        setTotal(data)
    } catch (error) {
        (error);
    }
 }

const handleDelete = async (comment) => {
  try {
    const answer = window.confirm("Are you sure you want to delete ?")
    if (!answer) return

    const {data} = await axios.delete(`/comment/${comment._id}`)
    if(data?.ok) {
        setComments(comments.filter((c) => c._id !== comment._id))
        setTotal(total - 1)
        toast.success("Comment Deleted Successfully")
    }
  
  } catch (error) {
    
  }
}

const filteredComments = comments?.filter((comment) => comment.content.toLowerCase().includes(keyword) )

    return (
        <AdminLayout>
            <Row>
           
                <Col span={24} >
                
                    <h1 style={{margin: '10px 10px'}}>{comments.length}Comments</h1>
                    
                <Input placeholder="Search" type="search"  value={keyword} onChange={e => setKeyword(e.target.value.toLowerCase())}/>
           
              <List 
              itemLayout='horizontal'
              dataSource={filteredComments}
              renderItem={(item) => (
                <List.Item  actions={[<Link href={`/post/${item?.postId?.slug}#${item._id}`}>view</Link>,
                    <a onClick={() => handleDelete(item)}>delete</a>
                ]}>
                    <List.Item.Meta 
                    description={`On ${item?.postId?.title} | ${
                        item?.postedBy?.name
                        } | ${dayjs(item.createdAt).format("L LT")}`} 
                        title={item.content}
                        />
                </List.Item>
              )}
              />
                </Col>
            </Row>
          {/* { page * 6 < total &&  */}
              <Row>
              <Col span={24} style={{ textAlign: "center"}}>
              <Button
               size='large' type='primary' 
               loading={loading}
                onClick={() => setPage(page + 1)}>
                  Load More
                  </Button>

              </Col>
           
          </Row>
          

          {/* } */}
            

        </AdminLayout>
    );
}
export default Comments;