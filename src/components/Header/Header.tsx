import { Link, NavLink } from "react-router-dom";

import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

export default function Header() {
  return (
    <header className={css.header}>
        <div className={css.container}>
          <Link to="/" aria-label="Home" className={css.logo}>
            <img src="logo.svg" alt="Nanny Services logo" />
          </Link>

          <nav className={css.navigation} aria-label="Main Navigation">
            <ul className={css.navigationList}>
              <li className={css.navigationItem}>
                <NavLink to="/" className={css.navigationLink}>
                  Home
                </NavLink>
              </li>

              <li className={css.navigationItem}>
                <NavLink to="/nannies" className={css.navigationLink}>
                  Nannies
                </NavLink>
              </li>
               <li className={css.authWrapper}>
                  <AuthNavigation />
              </li>
            </ul>
          </nav>
      </div>
    </header>
  );
}