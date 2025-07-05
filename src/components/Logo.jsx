import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

export function Logo() {
  return (
    <Link to="/" className={styles.logoLink}>
      <img
        src="./src/assets/logo.png"
        alt="WorldWise logo"
        className={styles.logo}
      />
    </Link>
  );
}
