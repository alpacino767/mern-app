import { Button } from "antd"
import { SendOutlined } from "@ant-design/icons"
import Link from "next/link"

const FullWidthImage = ({
  title = "CMS",
  subtitle = "MERN STACK",
   fullWidthImage = "/images/image1.jpg",
  }) => (
    <>
      <img 
      src={fullWidthImage}
       alt="CMS" 
      style={{ width: "100%", height: "500px", overFlow: "hidden", objectFit:"cover"}} />

      <div  style={{
        textAlign: "center",
        marginTop: "-420px",
        fontSize: "75px",
        textShadow: "2px 2px 4px #000000",
      }}>
        <div style={{
            textAlign: "center",
            marginTop: "-420px",
            fontSize: "75px",
            textShadow: "2px 2px 4px #000000"
        }}></div>
        <h1>{title}</h1>
        <p style={{fontSize: "18px", marginTop: "-100px"}}>{subtitle}</p>
        <Link href="/subscriber">
            <Button type="primary" size="large" icon={<SendOutlined />}>Explore</Button>
        </Link>
      </div>


    </>
)

export default FullWidthImage