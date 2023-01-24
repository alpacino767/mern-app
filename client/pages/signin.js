import { useContext, useState ,useEffect} from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col } from 'antd';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/auth'
import { useRouter } from 'next/router'

function Signin() {

  // context
  const [auth, setAuth] = useContext(AuthContext)
  // state
  const [loading, setLoading] = useState(false)
  // hooks
  const router = useRouter()
  // const [form] = Form.useForm();

 useEffect(()=> {
  if(auth?.token) {
    router.push('/')
  }
 }, [auth])

  const onFinish = async (values) => {
    // ('values =>', values);
    try {
      setLoading(true)
      const { data } = await axios.post('/signin', values)
     if(data?.error) {
      toast.error(data.error)
      setLoading(false)
     } else {
     
      // save user and token to context
      setAuth({ data })

      
      // save user and token to local storage
      localStorage.setItem('auth', JSON.stringify(data))
      toast.success('Successfully signed in')


      // redirect user
      if(data?.user?.role == "Admin"){
        router.push("/admin")

      } else if (data?.user?.role == "Author"){
      router.push("/author")

      } else {
       router.push("/subscriber")
      }


      // form.resetFields()

     }
    } catch (error) {
      (error);
      setLoading(false)
      toast.error('Sign in  failed. Try again')
    }
  }

  return (
    <Row>
      <Col span={8} offset={8}>
        <h1 style={{ paddingTop: '100px' }}>Sign in</h1>


        <Form
          // form={form}
          name="normal_login"
          className="login-form"
          initialValues={{
            email: 'toon@gmail.com',
            Password: '123456',
            remember: true,

          }}
          onFinish={onFinish}
        >

          <Form.Item
            name="email"
            rules={[
              {
                type: "email"
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

          <Link href='/forgot-password'>Forgot Password</Link>
          <br />
          <br />

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Login
            </Button>

            <br />
            Or   {''}
            <Link href='/signup'>Register now!</Link>
          </Form.Item>
        </Form>

      </Col>


    </Row>
  );
}
export default Signin;