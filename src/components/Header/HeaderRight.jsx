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
          <div
            className="header-user-wrapper"
            onClick={() => setDropdown((prev) => !prev)}
          >
            {/* الاسم هيظهر فقط في الشاشات الكبيرة جنب الصورة */}
            <span className="header-right-username">{user?.username}</span>

            <img
              src={user?.profilePhoto.url}
              alt="user_photo"
              className="header-right-user-photo"
            />

            {/* سهم صغير بيدي شكل احترافي جداً في اللابتوب */}
            <i
              className="bi bi-caret-down-fill"
              style={{ fontSize: "10px", marginLeft: "2px" }}
            ></i>
          </div>

          {dropdown && (
            <div className="header-right-dropdown">
              {/* محتوى الدروب داون */}
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
