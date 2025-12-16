import { Link, NavLink } from "react-router-dom";

import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const isRedHeader =
    location.pathname.startsWith("/nannies") ||
    location.pathname.startsWith("/favorites");

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    !isHomePage && isActive ? `${css.navLink} ${css.active}` : css.navLink;

  return (
    <header className={`${css.header} ${isRedHeader ? css.red : ""}`}>
      <div className={css.container}>

         <Link to="/" aria-label="Home" className={css.logo}>
             <img src="logo.svg" alt="Nanny Services logo" />
         </Link>
        <nav>
          <ul className={css.navigationList}>

            <li className={css.navigationItem}>
              <NavLink to="/" end className={getNavLinkClass}>
                Home
              </NavLink>
            </li>

            <li className={css.navigationItem}>
              <NavLink to="/nannies" className={getNavLinkClass}>
                Nannies
              </NavLink>
            </li>

            {!isHomePage && (
              <li className={css.navigationItem}>
                <NavLink to="/favorites" className={getNavLinkClass}>
                  Favorites
                </NavLink>

              </li>
            )}

            <li className={css.authWrapper}>
              <AuthNavigation />
            </li>

          </ul>
        </nav>
      </div>
    </header>
  );
}