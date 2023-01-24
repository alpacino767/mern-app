import { useState, useContext, useEffect } from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input,Row, Col } from 'antd';
import Link from 'next/link';
import axios from 'axios'
import toast from 'react-hot-toast';
import { AuthContext } from '../context/auth'
import { useRouter } from 'next/router'

function Signup () {


    
  //  context
  const [auth, setAuth] = useContext(AuthContext)
    // hook
    const router = useRouter()
    // (router);

  //  state
   const [loading, setLoading] = useState (false)

   useEffect(()=> {
    if(auth?.token) {
      router.push('/')
    }
   }, [auth])

   

   const onFinish = async(values) => {
    // ('values =>', values);
    setLoading(true)
    try {
      const {data} = await axios.post(
        `signup`, values)
    
      if (data?.error) {
        toast.error(data.error)
        setLoading(false)
      } else {
        // ('signup response =>', data);
        // save in context
        setAuth(data)
        // save in storage
        localStorage.setItem('auth', JSON.stringify(data))
        toast.success('Successfully signed up')
        setLoading(false)
        // redirecting
        router.push('/admin')
      }
    } 

    catch (error) {
      toast.error('Sign Up failed.  Try again')
      (error);
      setLoading(false)
    }
   }

    return (
        <Row>
         
            <Col span={8} offset={8}>
             <h1 style={{paddingTop:'100px'}}>sign up</h1>


    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
        
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            type:"email"
          },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
          Register
        </Button>
        <br />
         Or   {''}
    <Link href='/signin'>Login now!</Link>
      </Form.Item>
    </Form>

            </Col>
         

        </Row>
    ); 
}
export default Signup;