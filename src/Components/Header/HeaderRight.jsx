import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logOutUser } from "../../redux/apicalls/authApiCall";

const HeaderRight = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [dropdown, setDropdown] = useState(false);
  // logut handler
  const logPutHandler = () => {
    setDropdown(false);
    dispatch(logOutUser());
  };

  return (
    <div className="header-right">
      {user ? (
        <>
          <div className="header-right-user-info">
            <span
              onClick={() => setDropdown((prev) => !prev)}
              className="header-right-username"
            >
              {user?.username}
            </span>
            <img
              src={user?.profilePhoto.url}
              alt="user_photo"
              className="header-right-user-photo"
            />
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
        </>
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
