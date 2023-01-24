import { useState, useEffect, useContext } from "react";
import AdminLayout from '../../../components/layout/AdminLayout'
import { Row, Col, List, Avatar,Input } from 'antd'
import axios from "axios";
import { toast } from "react-hot-toast"
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthContext } from "../../../context/auth";


export default function AllUsers() {
    // context
    const [auth, setAuth] = useContext(AuthContext)
    // hook
    const router = useRouter()
    // state
    const [users, setUsers] = useState([])
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        if (auth.token) loadUsers()
    }, [auth?.token])


    const loadUsers = async (req, res) => {
        try {
            const { data } = await axios.get("users")
            setUsers(data)
        } catch (error) {
            (error);
        }
    }

    const handleDelete = async (user) => {
        try {
            if (user._id === auth.user._id) {

                alert('You can not delete yourself')
                return
            }
             try {
                const { data } = await axios.delete(`/user/${user._id}`)
                toast.error('User Deleted')
                setUsers((prev) => prev.filter((u) => u._id !== user._id))
             } catch (error) {
                (error);
             }
        } catch (error) {
            (error);
        }
    }

    const filteredusers  = users?.filter(u => u.name.toLowerCase().includes(keyword))


    return (
        <AdminLayout>
            <Row>
                <Col span={24}>
                    <h4>All users ({users?.length})</h4>


                <Input placeholder="Search" type="search"  value={keyword} onChange={e => setKeyword(e.target.value.toLowerCase())}/>

                    <List itemLayout="horizontal"
                        dataSource={filteredusers}
                        renderItem={(user) => (
                            <List.Item
                                actions={[
                                    <Link href={`/admin/users/${user._id}`}>
                                        edit
                                    </Link>,
                                    <a 
                                    disabled={user?._id === auth?.user?._id}
                                     onClick={() => handleDelete(user)}>delete</a>,

                                ]}>
                                <Avatar src={user?.image?.url} >{user?.name[0]}</Avatar>
                                <List.Item.Meta title={user.name} />
                                <List.Item.Meta description={user.email} />
                                <List.Item.Meta description={user.role} />
                                <List.Item.Meta description={`${user?.posts?.length || 0} post`}/>
                            </List.Item>
                        )}
                    >

                    </List>

                </Col>
            </Row>
        </AdminLayout>
    )

}