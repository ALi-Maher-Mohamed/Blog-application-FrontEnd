import { Link, useParams } from "react-router-dom";
import "./verifyEmail.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyEmail } from "../../redux/apicalls/authApiCall";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { isEmailVerified } = useSelector((state) => state.auth);
  const { userId, token } = useParams();
  useEffect(() => {
    dispatch(verifyEmail(userId, token));
  }, []);
  return (
    <section className="verify-email">
      {isEmailVerified ? (
        <>
          <i className="bi bi-patch-check verify-email-icon"></i>
          <h1 className="verify-email-title">Your email is verified</h1>

          <Link to="/login" className="verify-email-link">
            Go to home page
          </Link>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default VerifyEmail;
