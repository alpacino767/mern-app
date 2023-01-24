import { Layout } from 'antd';
import AdminNav from '../nav/AdminNav'
import { AuthContext } from '../../context/auth';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {LoadingOutlined} from '@ant-design/icons'
import axios from 'axios';
import LoadingToRedirect from '../LoadingtoRedirect';



const { Header, Footer, Sider, Content } = Layout;




function AdminLayout ({ children }) {

  // context
  const [auth, setAuth] = useContext (AuthContext)

  // state 
  const [loading, setLoading] = useState(true)

  // hooks
  const router = useRouter()

  useEffect(() => {
   
    if(auth?.token) getCurrentAdmin()

  }, [auth?.token])

  const getCurrentAdmin = async () => {
  try {
    const { data } = await axios.get('/current-admin')
   setLoading(false)


  } catch (error) {
    (error);
     router.push('/')
  }
  }


  if(loading) {
    return <LoadingToRedirect />
  }

    return (
        <Layout>
            <AdminNav />
            <Layout>
          <Content>
            {children}
          </Content>
          </Layout>
        </Layout>
    ); 
}
export default AdminLayout;