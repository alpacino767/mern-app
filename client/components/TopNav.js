import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, LogoutOutlined, UserAddOutlined, UserOutlined,DatabaseOutlined } from '@ant-design/icons';
import { useState, useContext } from 'react';
import ToggleTheme from './ToggleTheme'
import Link from 'next/link';
import { AuthContext } from '../context/auth'
import { useRouter } from 'next/router'

const { SubMenu } = Menu;



const TopNav = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext)
  //  state
  const [current, setCurrent] = useState('mail');
  // hooks
  const router = useRouter()


  const handleClick = (e) => {
    ('click', e);
    setCurrent(e.key)
  }


  const signOut = () => {
    // remove from local storage
    localStorage.removeItem('auth')
    // remove from context
    setAuth({
      user: null,
      token: '',
    })
    // redirect to login
    router.push('/signin')

  }


  const roleBasedLink = () => {
    if(auth?.user?.role === 'Admin'){
      return '/admin'

    } else if (auth.user?.role ==='Author'){
    return '/author'

    } else {
     return "/subscriber"
    }
  }

  return (
    

    <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal' theme='dark'>

<Menu.Item key='mail' icon={<AppstoreOutlined />} >
        <Link href='/'>
            CMS
        </Link>
      </Menu.Item>
      <Menu.Item key='posts' icon={<DatabaseOutlined />} >
        <Link href='/posts'>
            Posts
        </Link>
      </Menu.Item>
      <Menu.Item key='contact' icon={<MailOutlined />} >
        <Link href='/contact'>
            Contact
        </Link>
      </Menu.Item>
  { auth?.user === null && (
     <>
        <Menu.Item style={{ marginLeft: 'auto'}} key='signup' icon={<UserAddOutlined />} >
          <Link href='/signup'>
            Sign Up
          </Link>
        </Menu.Item>
        <Menu.Item key='signin' icon={<UserOutlined />} >
          <Link href='/signin'>
            Sign In
          </Link>
        </Menu.Item>
      </>
      )}

  {  auth?.user !== null &&
 (  <>
        <SubMenu
          key='subMenu'
          icon={<SettingOutlined />}
          title={auth?.user?.name || 'Dashboard'}
          style={{ marginLeft: 'auto' }}
        >
          <Menu.ItemGroup title='Management'>
            <Menu.Item key='settings: 2'>
              <Link href={roleBasedLink()}>
                Dashboard
              </Link></Menu.Item>
          </Menu.ItemGroup>

        </SubMenu>

        <Menu.Item
          onClick={() => signOut()}
          key='signout' icon={<LogoutOutlined />} >
          Sign Out
        </Menu.Item>

      </>)
      }
      <Menu.Item>
        <ToggleTheme />
      </Menu.Item>
    </Menu>


  )
}

export default TopNav;