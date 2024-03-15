import { Link, NavLink } from "react-router-dom";
import styles from "../../style/global/Navbar.module.css";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../../redux/user/actions";
function Navbar() {

  
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const HandleLogoutClick = () => {
    dispatch(LogoutUser());
    navigate('/')

  };

  return (
    <div id={styles.header}>
      <div className={styles.links}>
        <div>
        <NavLink to="/home">Suite Store</NavLink>
        <Link to="/products">Products</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/history">History</Link>
        </div>
      <button className={styles.button} onClick={HandleLogoutClick}>
        Logout
      </button>
      
      </div>
    </div>
  );
}

export default Navbar;
