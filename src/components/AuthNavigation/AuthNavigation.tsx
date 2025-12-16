import { Link, NavLink, useNavigate, useLocation} from "react-router-dom";
import { toast } from 'react-hot-toast';
import css from "./AuthNavigation.module.css";
import { useAuth } from "../../hooks/useAuth";
import sprite from "/sprite.svg";


export default function AuthNavigation() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

const handleLogout = async () => {
  try {
    await logout();
    toast.success('You have successfully logged out');
    navigate("/");
  } catch {
    toast.error('Logout failed. Please try again.');
  }
};

  if (loading) return null;

  return (
    <ul className={css.authNavigation}>
      {user ? (
        <>
          <li className={css.navigationItem}>
            <Link to="/profile" className={css.profileLink}>
              <div className={css.avatarWrapper}>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User avatar'}
                    className={css.avatar}
                  />
                ) : (
                  <svg
                    className={css.avatarIcon}
                    width="24"
                    height="24"
                    aria-hidden="true"
                  >
                    <use href={`${sprite}#icon-user`} />
                  </svg>
                )}
              </div>

              <span className={css.userName}>
                {user.displayName || 'User'}
              </span>
            </Link>
          </li>

          <li className={css.navigationItem}>
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




