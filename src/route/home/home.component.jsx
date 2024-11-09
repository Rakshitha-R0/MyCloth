import { Outlet } from 'react-router-dom';
import Directory from '../../component/directory/directory.component';
import './home.style';
const Home = () =>{
  return (
    <div>
    <Directory/>
     <Outlet/>
     </div>
  );
}

export default Home;