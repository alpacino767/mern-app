import axios from 'axios'
import Resizer from 'react-image-file-resizer'



const resizeFile = (file) => 
new Promise((resolve) => {
 Resizer.imageFileResizer(
     file,
     720,
     400,
     'JPEG',
     100,
     0,
     (uri) => {
         resolve(uri)
     },
     "base64"
 )
})



 export const uploadImage = async (file) => {
 // (file);
 try {
     const image = await resizeFile(file)
     ('image base64 =>', image)
  
const { data } = await axios.post('/upload-image', { image })
     ('upload file response => ', data);
     return data
 } catch (error) {
     (error);
 }
}
