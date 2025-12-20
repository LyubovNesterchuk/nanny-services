import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";


export default function NotFound() {
  return (
    <div className={styles.container}>
      <img src="/teddy.png" alt="Teddy Bear" className={styles.teddy} />
      <h1 className={styles.title}>404 — Page Not Found</h1>
      <p className={styles.text}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className={styles.homeBtn}>
        Go to Home
      </Link>
    </div>
  );
}