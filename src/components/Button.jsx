import styles from "./Button.module.css";
export function Button({ children, onClick, className }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[className]}`}>
      {children}
    </button>
  );
}
