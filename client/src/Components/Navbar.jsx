import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Navbar.module.css";
import { useAuth } from '../Context/Auth';

function Navbar() {
  const {auth,setAuth}=useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    // toast.success("Logout Sucessfully");
  };
  return (
    <div className={styles.main}>  
     <Link to="/" className={styles.logo}><p >MyBlog</p> </Link>
     <nav className={styles.loginregister}>
     {!auth.user ? (
              <ul className={styles.loginregister1}>
                <li >
                  <Link  to="/register">
                    Register
                  </Link>
                </li>
                <li >
                  <Link  to="/login">
                    login
                  </Link>
                </li>
              </ul>
            ) : (
              <>
                <li className={styles.loginregister2}>
                      <Link
                        onClick={handleLogout}
                        to="/login"
                      >
                        logout
                      </Link>
                </li>
              </>
            )}
     </nav>
    </div>
  )
}

export default Navbar
