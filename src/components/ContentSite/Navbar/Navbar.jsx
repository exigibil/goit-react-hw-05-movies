import styles from './Navbar.module.css';
import { SiThemoviedatabase } from "react-icons/si";

function Navbar() {
  return (
    <div className={styles.navContainer}>
      <SiThemoviedatabase className={styles.navlogo}/>
      <div className={styles.navlinkContainer}>
        <div className={styles.navlink}><a href='#'>Home</a></div>

        <div className={styles.navlink}><a href='#'>Movies</a></div>
      </div>
    </div>
  );
}

export default Navbar;
