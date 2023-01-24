import { useEffect, useState,useContext } from 'react';
import { Button, Row, Col, List,Input } from 'antd';
import AdminLayout from '../../../components/layout/AdminLayout';
import  Link  from 'next/link'
import { PlusOutlined } from '@ant-design/icons'
import axios from 'axios';
import { PostContext } from '../../../context/post'
import { useRouter } from 'next/router'
import PostList from '../../../components/posts/PostList';
import {AuthContext} from "../../../context/auth"





function Posts() {
    //  context
    const [auth, setAuth] = useContext(AuthContext)
    const [post, setPost] = useContext(PostContext)

    // state
    const [keyword, setKeyword] = useState("")
    // hook
    const router = useRouter()
    const { posts } = post

   useEffect(() => {
    if(auth?.token)fetchPosts();
}, [auth?.token])
  
const fetchPosts = async () => {
    try {
        const { data } = await axios.get("/posts-for-admin")
        
        setPost((prev) => ({ 
            ...prev, posts: data
        }))
    } catch (error) {
        (error);
    }
}

("see the data", posts);

const handleEdit = async (post) => {
return router.push(`/admin/posts/${post.slug}`)
}

const handleDelete = async (post) => {
  try {
    const answer = window.confirm("Are you sure you want to delete ?")
    if (!answer) return
    const { data } = await axios.delete(`/post/${post._id}`)
    if(data.ok) {
        setPost((prev) => ({
            ...prev,  posts: prev.posts.filter((p) => (p._id !== post._id))
        }))
    }
  } catch (error) {
    
  }
}

    return (
        <AdminLayout>
            <Row>
                <Col span={24} >
                    <Button
                        type='primary'
                        style={{ marginLeft: '10px', marginTop: '10px' }}>
                        <Link href='/admin/posts/new'>
                    <PlusOutlined />  Add new
                        </Link>

                    </Button>
                    <h1 style={{margin: '10px 10px'}}>{posts.length}Posts</h1>
                    
                <Input placeholder="Search" type="search"  value={keyword} onChange={e => setKeyword(e.target.value.toLowerCase())}/>
                 <PostList 
                 posts={posts?.filter((p) => p.title.toLowerCase().includes(keyword))} 
                 
                 handleEdit={handleEdit} 
                 handleDelete={handleDelete}
                 />

                </Col>
            </Row>

        </AdminLayout>
    );
}
export default Posts;