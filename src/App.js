import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Template from './components/Template';
import Sidebar from './components/Sidebar';
import Body from './components/Body';
import Navbar from './components/Navbar';
import AddProject from './components/AddProject';
import Users from './components/Users';
import Logout from './components/Logout';
import Orders from './components/Orders';
import Category from './components/Category';
import Brand from './components/Brand';
import ShowProduct from './components/ShowProduct';
import Signup from './components/Signup';





function App() {
  return ( 
    <Router>
      
      <div className="App">
        <Routes>
           
          <Route path="/" element={<Login />} />
          <Route path="/template" element={<Template />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/body" element={<Body />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/addProject" element={<AddProject />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={< Logout/>} />
          <Route path="/orders" element={< Orders/>} />
          <Route path="/category" element={< Category/>} />
          <Route path="/brand" element={< Brand/>} />
          <Route path="/showProduct" element={< ShowProduct/>} />
          <Route path="/signup" element={< Signup/>} />
                  
          
         
          
  
        </Routes>
      </div>
    </Router>
  );
}
export default App;
