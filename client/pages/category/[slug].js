import  axios from "axios"
import {Card, Row, Col,Button, Divider, Avatar,Typography} from "antd"
import Link from "antd/lib/typography/Link"
import Head from "next/head"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import useCategory from "../../hooks/useCategory"
import useLatestPosts from "../../hooks/useLatestPosts"

dayjs.extend(relativeTime)

const {Title} = Typography


const SingleCategory = ({ posts, category }) => {

    const { categories } = useCategory()
    const { latestPosts } = useLatestPosts()
    return (
        <>
        <Head>
            <title>{category.name}</title>
            <meta name="description" content={`Read latest posts on ${category.name}`} />

        </Head>

        <div style={{ marginTop: "12px"}}></div>

        <Row gutter={12}>
            <Col sm={24} lg={18} style={{marginBottom: 12}}>
              <h1 style={{textAlign: "center"}}>Posts in {category.name}</h1>
              {/* postlist */}
              {posts.map((post => (
                <Card key={post._id}>
                    <div style={{ display: 'flex'}}>
                        <Avatar 
                         shape="circle" 
                         size={60}
                         style={{ marginRight: 15 }} 
                         src={post.featuredImage?.url || "/images/default.png"} 
                         alt={post.title} />
                         <div>
                            <Link href={`/post/${post.slug}`}>
                            <Title level={3}>{post.title}</Title>
                            </Link>
                            <p>{dayjs(post.createdAt).format("MMMM D YYYY h:m A")} / {""}  
                            by {post?.postedBy?.name}</p>
                         </div>
                    </div>
                </Card>
              )))}



            </Col>
            <Col xs={24} xl={6} >
                    <Divider>  Categories  </Divider>
                    {categories.map(c => (
                        <Link href={`/category/${c.slug}`} key={c._id}>
                            <Button style={{ margin: 2 }}>{c.name}</Button>
                        </Link>
                    ))}

                    <Divider>Latest</Divider>
                    {latestPosts.map((p) => (
                        <Link href={`/post/${p.slug}`} key={p._id}><h4>{p.title}</h4></Link>
                    ))}
                </Col>
        </Row>
        </>
    )
}

export async function getServerSideProps({ params }) {
    const { data } = await axios.get(
        `${process.env.API}/posts-by-category/${params.slug}`
        )
        return {
            props:{
                posts: data.posts,
                category: data.category
            }
        
        }
        
}


export default SingleCategory




