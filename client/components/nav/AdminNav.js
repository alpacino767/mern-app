import { Collapse } from 'antd';
import {
    MailOutlined,
    PieChartOutlined,
    PushpinOutlined,
    CameraOutlined,
    SettingOutlined,
    BgColorsOutlined,
    UserOutlined,
    CommentOutlined,
    UserSwitchOutlined,
  } from '@ant-design/icons';
  import { Button, Menu, Layout } from 'antd';
  import { AuthContext } from '../../context/auth';
  import React, { useState, useEffect,useContext} from 'react';
  import Link from 'next/link'
  import { useWindowWidth } from '@react-hook/window-size'





  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }


  const {Sider} = Layout

  const AdminNav = () => {

    // context
    const [auth, setAuth] = useContext(AuthContext)
   
    // state
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };

  const [current, setCurrent] = useState('')

    // hooks
  const onlyWidth = useWindowWidth()
 

 

useEffect(() => {
process.browser && setCurrent(window.location.pathname)
},[process.browser && window.location.pathname])

useEffect(() => {
    if(onlyWidth < 800){
        setCollapsed(true)
    } else if (onlyWidth > 800)
    setCollapsed(false)
},[onlyWidth < 800])


const activeName = (name) => `${current === name && 'active'}`







  const items = [
    getItem(  <Link className={activeName('/admin')} href='/admin'>Dashboard</Link>,'1', <SettingOutlined />),
    getItem('Posts', '2', <PushpinOutlined />, [
   
        getItem(  <Link className={activeName('/admin/posts')} href='/admin/posts'>All posts</Link>, '3'),
        getItem(<Link className={activeName('/admin/posts/new')} href='/admin/posts/new'>Add New</Link>, '4'),
        getItem(<Link className={activeName('/admin/categories')} href='/admin/categories'>Categories</Link>,'5' ),
    
     
      ]),
    

    getItem('Media', '6', <CameraOutlined />, [
      getItem(<Link className={activeName('/admin/media/library')} href='/admin/media/library'>Library</Link>, '7'),
      getItem(<Link className={activeName('/admin/media/new')} href='/admin/media/new'>Add new</Link>, '8'),
   
    ]),

    getItem(<Link className={activeName('/admin/comments')} href='/admin/comments'>Comments</Link>,  '9', <CommentOutlined />),



    getItem('Users', '10', <UserSwitchOutlined />, [
        getItem(<Link className={activeName('/admin/users')} href='/admin/users'>All Users</Link>, '11'),
        getItem(<Link className={activeName('/admin/users/new')} href='/admin/users/new'>Add new</Link>, '12'),
     
      ]),

    getItem(<Link className={activeName(`/admin/${auth?.user?._id}`)}href={`/admin/${auth?.user?._id}`}>Profile</Link>, '13', <UserOutlined />),

    getItem(<Link className={activeName('/admin/customize')}href='/admin/customize'>Customize</Link>, '14', <BgColorsOutlined />),
  
  ];

    return (
      <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}
        style={{
          width: 256,
        }}
      >
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['2', '6', '10']}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
        />
      </Sider>
    );
  };


 export default AdminNav