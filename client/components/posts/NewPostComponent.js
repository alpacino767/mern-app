import { Layout, Row, Col, Input, Select, Modal, Button,Image } from 'antd';
import { useContext, useState, useEffect } from 'react';
import Editor from 'rich-markdown-editor';
import { ThemeContext } from '../../context/theme'
import axios from 'axios'
import { uploadImage } from '../../functions/upload';
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router';
import { UploadOutlined } from '@ant-design/icons';
import Media from '../media';
import { MediaContext } from '../../context/media';





const { Option } = Select
const { Content, Sider } = Layout;



function NewPostComponent({ page = "admin"}) {

    const savedTitle = () => {
        if (process.browser) {
            if (localStorage.getItem('post-content')) {
                return JSON.parse(localStorage.getItem('post-content'))
            }
        }
    }

    const savedContent = () => {
        if (process.browser) {
            if (localStorage.getItem('post-content')) {
                return JSON.parse(localStorage.getItem('post-content'))
            }
        }
    }

    // context 
    const [theme, setTheme] = useContext(ThemeContext)
    const [media, setMedia] = useContext(MediaContext)


    // STATE
    const [title, setTitle] = useState(savedTitle())
    const [content, setContent] = useState(savedContent())
    const [categories, setCategories] = useState([])
    const [loadedCategories, setLoadedCategories] = useState([])
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    // media modal
    const [visibleMedia, setVisibleMedia] = useState(false)


    // hook
    const router = useRouter()


    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = async () => {
        try {
            const { data } = await axios.get('/categories')
            setLoadedCategories(data)
        } catch (error) {
            (error);
        }
    }

    const handlePublish = async () => {

        try {
            setLoading(true)
            const { data } = await axios.post("/create-post", {
                title,
                 content, 
                 categories,
                 featuredImage: media?.selected?._id,
                 
            })
            if (data?.error) {
                toast.error(data?.error)
                setLoading(false)
            } else {
            
                toast.success('Post created successfully')
                localStorage.removeItem('post-title')
                localStorage.removeItem('post-content')
                setMedia({...media, selected: null})
                router.push(`/${page}/posts`)
            }
        } catch (error) {
            (error);
            toast.error('Post create failed, Try again')
        }
    }

    return (
    
            <Row>
                <Col span={14} offset={1}>
                    {/* <pre>{JSON.stringify(media, null, 4)}</pre> */}
                    <h1>Create New Posts</h1>
                    <Input
                        size='large'
                        value={title}
                        placeholder='Give your post a title'
                        onChange={(e) => {
                            setTitle(e.target.value)
                            localStorage.setItem(
                                'post-title',
                                JSON.stringify(e.target.value)
                            )
                        }} />
                    <br />
                    <br />
                    <div className='editor-scroll'>

                        <Editor
                            defaultValue={content}
                            dark={theme == 'light' ? false : true}
                            onChange={(v) => {
                                setContent(v())
                                localStorage.setItem(
                                    'post-content',
                                    JSON.stringify(v()))
                            }}
                            uploadImage={uploadImage}
                        />
                    </div>
                    <br />
                    <br />
                    {/* <pre>{JSON.stringify(loadedCategories, null, 4)}</pre> */}

                </Col>

                <Col span={6} offset={1}>
                    <Button
                        style={{ margin: '10px 0px 10px 0px', width: "100%" }}
                        onClick={() => setVisible(true)}>
                            Preview
                        </Button>


                    <Button
                        style={{ margin: '10px 0px 10px 0px', width: "100%" }}
                        onClick={() => setMedia({ ...media, showMediaModal: true})}> 
                        <UploadOutlined />  Featured Image
                        </Button>
                     


                    <h1>Categories</h1>
                    <Select
                        mode='multiple'
                        allowClear={true}
                        placeholder={'Select Categories'}
                        style={{ width: '100%' }}
                        onChange={(v) => setCategories(v)}
                    >
                        {loadedCategories.map((item) => <Option key={item.name}>{item.name}</Option>)}

                    </Select>
                     <br />
                     <br />
                   {media?.selected && <Image width="100%" src={media?.selected?.url} /> }

                    <Button
                        loading={loading}
                        style={{ margin: '10px 0px 10px 0px', width: "100%" }}
                        type='primary'
                        onClick={handlePublish}>
                        Publish
                    </Button>
                </Col>
                {/* preview modal */}
                <Modal title='Preview'
                    centered
                    visible={visible}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                    footer={null}
                    width={720}
                >
                    <h1>{title}</h1>

                    <Editor
                        defaultValue={content}
                        dark={theme == 'light' ? false : true}
                        readOnly={true}
                    />
                </Modal>
                {/* media modal */}
                <Modal
                visible={media.showMediaModal}
                centered
                title='Media'
                onOk={() => setMedia({...media, showMediaModal: false})}
                onCancel={() => setMedia({...media, showMediaModal: false})}
                width={720}
                footer={null}
                >
            <Media />
                </Modal>

            </Row>

       
    );
}
export default NewPostComponent;