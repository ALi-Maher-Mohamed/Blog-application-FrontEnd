import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useContext } from "react";
import { logOutUser } from "../../redux/apicalls/authApiCall";
import { ThemeContext } from "../../context/ThemeContext";

const HeaderRight = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [dropdown, setDropdown] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  // logout handler
  const logPutHandler = () => {
    setDropdown(false);
    dispatch(logOutUser());
  };

  return (
    <div className="header-right">
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {theme === "light" ? (
          <i className="bi bi-moon-fill"></i>
        ) : (
          <i className="bi bi-sun-fill"></i>
        )}
      </button>

      {user ? (
        <div className="header-right-user-info">
          {/* الـ div ده هو اللي هيتحكم في فتح وقفل القائمة بالضغط على أي مكان فيه */}
          <div
            className="header-user-wrapper"
            onClick={() => setDropdown((prev) => !prev)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span className="header-right-username">{user?.username}</span>
            <img
              src={user?.profilePhoto.url}
              alt="user_photo"
              className="header-right-user-photo"
            />
            {/* أيقونة سهم اختيارية لتعزيز شكل الـ dropdown */}
            <i
              className={`bi bi-caret-${dropdown ? "up" : "down"}-fill`}
              style={{ fontSize: "12px" }}
            ></i>
          </div>

          {dropdown && (
            <div className="header-right-dropdown">
              <Link
                onClick={() => setDropdown(false)}
                to={`/profile/${user?._id}`}
                className="header-dropdown-item"
              >
                <i className="bi bi-file-person"></i>
                <span>Profile</span>
              </Link>
              <div onClick={logPutHandler} className="header-dropdown-item">
                <i className="bi bi-box-arrow-in-left"></i>
                <span>Logout</span>
              </div>
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
