import { useState, useEffect,useContext } from 'react';
import { Layout } from 'antd';
import AdminLayout from '../../../components/layout/AdminLayout';
import { Form, Input, Row, Col, Button, List } from 'antd'
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios'
import { toast } from 'react-hot-toast'
// import Item from 'antd/lib/list/Item';

import CategoryUpdatemodal from '../../../components/modal/CategoryUpdateModal';
import { PostContext } from '../../../context/post'

const { Content, Sider } = Layout;


function Categories () {
  // conntext 
  const [post, setPost] = useContext(PostContext)
  // STATE
  const [loading, setLoading] = useState(false)
 
  // update state
  const [updatingCategory, setUpdatingCategory] = useState({})
  const [visible, setVisible] = useState(false)
  // hooks
    const [form] = Form.useForm();


    const { categories } = post



     useEffect(()=> {
      getCategories()
     }, [])



  const getCategories = async () => {

    try {
      const { data } = await axios.get("/categories")
      setPost((prev) => ({ ...prev, categories: data }))
    } catch (error) {
      (error);
    }
  }



    const onFinish =  async (values) => {
        // ('values =>',values);
        try {
          setLoading(true)
          const { data } = await axios.post('/category', values)
        setPost((prev) =>({...prev, categories: [data, ...categories] }))
          // (data);
          toast.success('category created successfully')
          setLoading(false)
          form.resetFields(['name'])
        } catch (error) {
          (error);
          toast.error('Category create failed')
          setLoading(false)
        }
    }

    const handleDelete = async (item) => {
      try {
        const { data } = await axios.delete(`/category/${item.slug}`)
        setPost((prev) => ({
          ...prev,
           categories: categories.filter((cat) => cat._id !==data._id)
          }))
        toast.success('Category deleted successfully')
      } catch (error) {
        (error);
        toast.error('Category delete failed')
      }
    }

    const handleEdit = async (item) => {
    setUpdatingCategory(item)
    setVisible(true)
    }



    const handleUpdate = async (values) => {
    try {
      const { data }  = await axios.put(`/category/${updatingCategory.slug}`,

        values
      )
      
      const newCategories = categories.map((cat) => {
        if (cat._id == data._id) {
          return data
        }
        return cat
      })
      setPost((prev) => ({ ...prev, categories: newCategories}))

      toast.success('Category updated successfully')

      setVisible(false)
      setUpdatingCategory({})
    } catch (error) {
      (error);
      toast.error('Category update failed')
    }
    }

   
    return (
        <AdminLayout>
        <Row>

            {/* first column */}
            <Col xs={22} sm={22} lg={10} offset={1}>
            <h1>Categories</h1> 
          <p>Add new Category</p>


        <Form name="normal_login"
          className="login-form" onFinish={onFinish} form={form}>
        <Form.Item
            name="name"
          >
            <Input prefix={<EditOutlined className="site-form-item-icon" />} placeholder="Give it a name" />
          </Form.Item>
          <Button  loading={loading} type='primary' htmlType='submit'>
            Submit
          </Button>

        </Form>
            </Col>
            {/* second column */}
            <Col xs={22} sm={22} lg={10} offset={1}>
          <List 
          itemLayout='horizontal'
          dataSource={categories}
          renderItem= {(item) => <List.Item
          actions={[
            <a  onClick={()=> handleEdit(item)}>edit</a>,
             <a onClick={()=> handleDelete(item)}>delete</a>
          ]}
          >
            <List.Item.Meta title={item.name} />
          </List.Item>}
          >

          </List>

          

            </Col>
           <CategoryUpdatemodal 
            visible={visible} 
            setVisible={setVisible} 
            handleUpdate={handleUpdate}
             updatingCategory={updatingCategory}/>
        </Row>

        </AdminLayout>
    ); 
}
export default Categories;