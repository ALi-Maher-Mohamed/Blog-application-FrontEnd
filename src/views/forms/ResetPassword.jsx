import "./form.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getResetPaassword,
  resetPaassword,
} from "../../redux/apicalls/passwordApicall";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.password);
  const { userId, token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    dispatch(getResetPaassword(userId, token));
  }, [userId, token]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("Password is required");
    if (password.length < 8)
      return toast.error("Password must be at least 8 characters");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    dispatch(resetPaassword({ password, confirmPassword }, { userId, token }));
  };

  return (
    <section className="form-container">
      {isError ? (
        <h1 className="form-title">Not Found</h1>
      ) : (
        <>
          <h1 className="form-title">Reset Password</h1>
          <form onSubmit={formSubmitHandler} className="form">
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <div className="form-input-wrapper">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your new password"
                  className="form-input"
                />
                <button
                  type="button"
                  className="form-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i
                    className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                  ></i>
                </button>
              </div>
              {password && <PasswordStrength password={password} />}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm New Password
              </label>
              <div className="form-input-wrapper">
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  type={showConfirm ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Re-enter your new password"
                  className={`form-input ${
                    confirmPassword
                      ? password === confirmPassword
                        ? "input-valid"
                        : "input-invalid"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  className="form-eye-btn"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  <i
                    className={showConfirm ? "bi bi-eye-slash" : "bi bi-eye"}
                  ></i>
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <span className="form-hint error">Passwords do not match</span>
              )}
              {confirmPassword && password === confirmPassword && (
                <span className="form-hint success">Passwords match</span>
              )}
            </div>
            <button type="submit" className="form-btn">
              Reset Password
            </button>
          </form>
        </>
      )}
    </section>
  );
};

const PasswordStrength = ({ password }) => {
  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const score = getStrength();
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const classes = [
    "",
    "strength-weak",
    "strength-fair",
    "strength-good",
    "strength-strong",
  ];

  return (
    <div className="password-strength">
      <div className="strength-bars">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`strength-bar ${i <= score ? classes[score] : ""}`}
          />
        ))}
      </div>
      {score > 0 && (
        <span className={`strength-label ${classes[score]}`}>
          {labels[score]}
        </span>
      )}
    </div>
  );
};

export default ResetPassword;
