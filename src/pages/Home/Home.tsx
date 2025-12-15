import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import sprite from "/sprite.svg";
export default function Home() {
  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        
        {/* LEFT */}
        <div className={styles.left}>
          <h1 className={styles.title}>
            Make Life Easier <br /> for the Family:
          </h1>

          <p className={styles.subtitle}>
            Find Babysitters Online for All Occasions
          </p>

          <Link to="/nannies" className={styles.cta}>
            Get started 
            <svg
              className={styles.iconArrow}
              width="18"
              height="18"
              aria-hidden="true"
            >
              <use href={`${sprite}#icon-arrow-up-right`} />
            </svg>
          </Link>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={styles.badge}>
            <span className={styles.check}>
              <svg
              className={styles.iconCheck}
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use href={`${sprite}#icon-check`} />
            </svg>
            </span>
            
            <div>
              <p className={styles.badgeText}>Experienced nannies</p>
              <strong className={styles.badgeNumber}>15,000</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

