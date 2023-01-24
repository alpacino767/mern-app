import {  useContext, useState } from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input,Row, Col } from 'antd';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/auth'
import { useRouter } from 'next/router'
// import { forgotPassword } from '../../server/controllers/auth';

function ForgotPassword () {

  // context
  const [auth, setAuth] = useContext(AuthContext)
  // state
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState (false)
  // hooks
  const router = useRouter()
  const [form] = Form.useForm();

const forgotPasswordRequest = async (values) => {
   
    try {
        setLoading(true)
        const { data } = await axios.post('/forgot-password',  values )
        if(data.error) {
            toast.error(data.error)
            setLoading(false)
        } else {
            toast.success('Password reset link sent to your email')
            setLoading(false)
            setVisible(true)
        }
    } catch (error) {
        (error);
        toast.error('Forgot Password failed, Try again')
        setLoading(false)
    }
}

const resetPasswordRequest = async (values) => {
   
    try {
        setLoading(true)
        const { data } = await axios.post('/reset-password',  values )
        if(data.error) {
            toast.error(data.error)
            setLoading(false)
        } else {
            toast.success('Password changed successfully. Please login with your new password')
            form.resetFields(['email'])
            setLoading(false)
            setVisible(false)
        }
    } catch (error) {
        (error);
        toast.error('Reset Password failed, Try again')
        setLoading(false)
    }
}
 

    return (
        <Row>
            <Col span={8} offset={8}>
             <h1 style={{paddingTop:'100px'}}>Forgot Password</h1>


    <Form
    form={form}
      name="normal_login"
      className="login-form"
      onFinish={ visible? resetPasswordRequest : forgotPasswordRequest}

      
    >
     
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
    {visible && <>

        <Form.Item
        name="resetCode"
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Enter reset Code" />
      </Form.Item>
        <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please enter your new Password!',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder=" New Password"
        />
      </Form.Item> 
  
    </>}
   

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
        Submit
        </Button>
     
       
      </Form.Item>
    </Form>

            </Col>
         

        </Row>
    ); 
}
export default ForgotPassword;