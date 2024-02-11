import {useState} from 'react'
import styles from "./Login.module.css";
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import { useAuth } from '../Context/Auth';
import { Link } from 'react-router-dom';

function Login() {

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const {auth,setAuth} = useAuth();
  const location = useLocation();

  const navigate = useNavigate();
  const handleSubmit =async (e) =>{
    
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", { username, password });
      console.log(res);
      if (res) {
        toast.success(res.data && res.data.message);
        localStorage.setItem("auth", JSON.stringify(res.data));
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        navigate(location.storage || '/home');
      } else {
        toast.error(res.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message); // Access the error message directly
    }
    
  }
  return (
    <div className={styles.container}>
      <img src="https://i.postimg.cc/zX8Zbg5P/avatar.png" alt="" />
      <form action='#' onSubmit={handleSubmit}>
       <input type="text" name="username" placeholder="Username" value={username} onChange={(e)=> setusername(e.target.value)} required></input>

       <input type="text" name="password" placeholder="Password" value={password} onChange={(e)=> setpassword(e.target.value)} required></input>
       
       <div className={styles.btn}>
       <button><Link to="/forgotpassword">Forgot Password</Link></button>
       <button type="submit" >Login</button>
       </div>
      
      </form>
    </div>
  )
}

export default Login
