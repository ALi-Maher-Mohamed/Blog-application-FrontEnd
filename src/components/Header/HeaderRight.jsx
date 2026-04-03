import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useContext, useEffect, useRef } from "react";
import { logOutUser } from "../../redux/apicalls/authApiCall";
import { ThemeContext } from "../../context/ThemeContext";

const HeaderRight = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [dropdown, setDropdown] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoutHandler = () => {
    setDropdown(false);
    dispatch(logOutUser());
  };

  return (
    <div className="header-right">
      <button
        onClick={toggleTheme}
        className="theme-toggle-btn"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <i className="bi bi-moon-fill"></i>
        ) : (
          <i className="bi bi-sun-fill"></i>
        )}
      </button>

      {user ? (
        <div className="header-right-user-info" ref={dropdownRef}>
          <div
            className="header-user-wrapper"
            onClick={() => setDropdown((prev) => !prev)}
            role="button"
            aria-expanded={dropdown}
            aria-haspopup="true"
          >
            <span className="header-right-username">{user?.username}</span>

            <img
              src={
                user?.profilePhoto?.url ??
                "public/images/user-avatar.png" +
                  user?.username +
                  "&background=random"
              }
              alt={user?.username}
              className="header-right-user-photo"
            />

            <i
              className="bi bi-caret-down-fill header-caret"
              style={{
                transform: dropdown ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            ></i>
          </div>

          {dropdown && (
            <div className="header-right-dropdown">
              <Link
                to={`/profile/${user?._id}`}
                className="header-dropdown-link"
                onClick={() => setDropdown(false)}
              >
                <i className="bi bi-person-circle"></i>
                <span>Profile</span>
              </Link>

              <button onClick={logoutHandler} className="header-dropdown-link">
                <i className="bi bi-box-arrow-right"></i>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <Link className="header-right-link" to="/login">
            <i className="bi bi-box-arrow-in-right"></i>
            <span>Login</span>
          </Link>
          <Link className="header-right-link" to="/register">
            <i className="bi bi-person-plus"></i>
            <span>Register</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderRight;
