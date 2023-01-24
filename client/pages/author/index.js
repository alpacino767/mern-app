import { Layout } from 'antd';
import AuthorLayout from '../../components/layout/AuthorLayout';


const { Content, Sider } = Layout;


function Author () {
    return (
        <AuthorLayout>
           <h1>this is author page</h1>

        </AuthorLayout>
    ); 
}
export default Author;