import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import { Logo } from "./Logo.jsx";
import { useAuth } from "../contexts/FakeAuthContext.jsx";
export function PageNav() {
  const { isAuthenticated } = useAuth();
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Logo></Logo>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        {!isAuthenticated && (
          <li>
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
