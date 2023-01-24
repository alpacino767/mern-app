import { Collapse } from 'antd';
import {
    SettingOutlined,
     UserOutlined,
    CommentOutlined,
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

  const SubscriberNav = () => {

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
    getItem(  <Link className={activeName('/admin')} href='/subscriber'>Dashboard</Link>,'1', <SettingOutlined />),
  
    

    getItem(<Link className={activeName('/subscriber/comments')} href='/subscriber/comments'>Comments</Link>,  '9', <CommentOutlined />),




    getItem(<Link className={activeName(`/subscriber/${auth?.user?._id}`)}href={`/subscriber/${auth?.user?._id}`}>Profile</Link>, '13', <UserOutlined />),

  
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


 export default SubscriberNav