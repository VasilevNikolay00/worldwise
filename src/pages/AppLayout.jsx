import { AppNav } from "../components/AppNav";
import { SideBar } from "../components/SideBar";
import { Map } from "../components/Map";
import styles from "./AppLayout.module.css";
export function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
}
