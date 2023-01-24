import { useContext, useState,useEffect} from "react"
// import  { Row, Col, Input,Button, Image,Divider} from "antd"
// import Media from "../../components/Media"
// import { MediaContext } from "../../context/media"
import axios from "axios"
// import toast from "react-hot-toast"
// import AdminLayout from "../../components/layout/AdminLayout"


const useHome = () => {

// state
const [title, setTitle] = useState("")
const [subtitle, setSubtitle] = useState("")
const [fullWidthImage, setFullWidthImage] = useState("")


useEffect(() => {
   loadHomepage()
}, [])

const loadHomepage = async () => {
    try {
        const { data } = await axios.get("/page/home")
        // ("see", data);
        setTitle(data.title)
        setSubtitle(data.subtitle)
        setFullWidthImage(data.fullWidthImage)
        
    } catch (error) {
     
        (error);
    }
}

// const handleSave = async () => {
//     try {
//         setLoading(true)
//         const { data } = await axios.post("/page", {
//             page: "home",
//             title,
//             subtitle,
//             fullWidthImage: media?.selected?._id,
//         })
//         setLoading(false)
//         toast.success("Saved")
//     } catch (error) {
//         (error);
//         setLoading(false)
//     }
// }
return { title, subtitle, fullWidthImage, setTitle, setSubtitle, setFullWidthImage}
}

export default useHome