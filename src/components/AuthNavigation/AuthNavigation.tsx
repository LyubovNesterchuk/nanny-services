import { Link, NavLink, useNavigate, useLocation} from "react-router-dom";
import css from "./AuthNavigation.module.css";
import { useAuth } from "../../hooks/useAuth";

export default function AuthNavigation() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) return null;

  return (
    <ul className={css.authNavigation}>
      {user ? (
        <>
          <li className={css.navigationItem}>
            <Link to="/profile" className={css.navigationLink}>
              Profile
            </Link>
          </li>

          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user.email}</p>
            <button className={css.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <NavLink 
              to="/sign-in"
              state={{ background: location }}
              className={css.navigationLogin}
            >
              Log In
            </NavLink>
          </li>

          <li className={css.navigationItem}>
            <NavLink
              to="/sign-up"
              state={{ background: location }}
              className={css.navigationRegistration}
            >
              Registration
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
}




