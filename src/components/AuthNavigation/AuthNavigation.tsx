import { Link, useNavigate } from "react-router-dom";
import css from "./AuthNavigation.module.css";
import { useAuth } from "../../hooks/useAuth";

export default function AuthNavigation() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/sign-in");
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
            <button
              className={css.logoutButton}
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link to="/sign-in" className={css.navigationLogin}>
              Log In
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link
              to="/sign-up"
              className={css.navigationRegistration}
            >
              Registration
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
