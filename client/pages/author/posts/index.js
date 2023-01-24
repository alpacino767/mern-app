import { useEffect, useState, useContext } from 'react';
import { Button, Row, Col, List } from 'antd';
import AuthorLayout from '../../../components/layout/AuthorLayout';
import Link from 'next/link'
import { PlusOutlined } from '@ant-design/icons'
import axios from 'axios';
import { PostContext } from '../../../context/post'
import { useRouter } from 'next/router'
import PostList from '../../../components/posts/PostList';



function Posts() {

    const [post, setPost] = useContext(PostContext)
    // hook
    const router = useRouter()
    const { posts } = post

    useEffect(() => {
        fetchPosts();
    }, [])

    // ("see author post", post);

    const fetchPosts = async () => {
        try {
            const { data } = await axios.get("/posts-by-author")
            ("see the data", data);
           await setPost((prev) => ({ ...prev, posts: data }))
        } catch (error) {
            (error);
        }
    }

  

    const handleEdit = async (post) => {
        return router.push(`/author/posts/${post.slug}`)
    }

    const handleDelete = async (post) => {
        try {
            const answer = window.confirm("Are you sure you want to delete ?")
            if (!answer) return
            const { data } = await axios.delete(`/post/${post._id}`)
            if (data.ok) {
                setPost((prev) => ({
                    ...prev, posts: prev.posts.filter((p) => (p._id !== post._id))
                }))
            }
        } catch (error) {

        }
    }

    return (
        <AuthorLayout>
            <Row>
                <Col span={24} >
                    <Button
                        type='primary'
                        style={{ marginLeft: '10px', marginTop: '10px' }}>
                        <Link href='/author/posts/new'>
                            <PlusOutlined />  Add new
                        </Link>

                    </Button>
                    <h1 style={{ margin: '10px 10px' }}>{posts.length}Posts</h1>


                    <PostList
                        posts={posts}

                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />

                </Col>
            </Row>

        </AuthorLayout>
    );
}
export default Posts;