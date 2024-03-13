import { Link } from "react-router-dom";
import styles from "../../style/global/Navbar.module.css";

function Navbar() {
  return (
    <div id={styles.header}  >
        <div className={styles.links} >
          <Link to="/">Suite Store</Link>
          <Link to="/products">Products</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/history">History</Link>
          <span className={styles.line}></span>
        </div>
        </div>

  );
}

export default Navbar;
