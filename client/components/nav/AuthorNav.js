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
  import React, { useState, useEffect, useContext} from 'react';
  import Link from 'next/link'
  import { useWindowWidth } from '@react-hook/window-size'

  import { AuthContext } from '../../context/auth';




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

  const AuthorNav = () => {
   
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
    getItem(  <Link className={activeName('/admin')} href='/author'>Dashboard</Link>,'1', <SettingOutlined />),
    getItem('Posts', '2', <PushpinOutlined />, [
   
        getItem(  <Link className={activeName('/author/posts')} href='/author/posts'>All posts</Link>, '3'),
        getItem(<Link className={activeName('/author/posts/new')} href='/author/posts/new'>Add New</Link>, '4'),
    
    
     
      ]),
    

    getItem('Media', '6', <CameraOutlined />, [
      getItem(<Link className={activeName('/author/media/library')} href='/author/media/library'>Library</Link>, '7'),
      getItem(<Link className={activeName('/author/media/new')} href='/author/media/new'>Add new</Link>, '8'),
   
    ]),

    getItem(<Link className={activeName('/admin/comments')} href='/author/comments'>Comments</Link>,  '9', <CommentOutlined />),




    getItem(<Link className={activeName(`/author/${auth?.user?._id}`)}href={`/author/${auth?.user?._id}`}>Profile</Link>, '13', <UserOutlined />),

  
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


 export default AuthorNav