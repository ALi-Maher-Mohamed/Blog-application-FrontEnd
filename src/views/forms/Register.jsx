import "./form.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apicalls/authApiCall";
import swal from "sweetalert";

const Register = () => {
  const dispatch = useDispatch();
  const { registerMessage } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "") return toast.error("Username is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");
    if (password.length < 8)
      return toast.error("Password must be at least 8 characters");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    dispatch(registerUser({ username, email, password }));
  };

  if (registerMessage) {
    swal({
      title: "Success!",
      text: registerMessage,
      icon: "success",
      button: "OK",
    }).then(() => {
      navigate("/login");
    });
  }

  return (
    <section className="form-container">
      <h1 className="form-title">Create new account</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            id="username"
            placeholder="Enter your username"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="form-input-wrapper">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="form-input"
            />
            <button
              type="button"
              className="form-eye-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
            </button>
          </div>
          {password && <PasswordStrength password={password} />}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <div className="form-input-wrapper">
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type={showConfirm ? "text" : "password"}
              id="confirmPassword"
              placeholder="Re-enter your password"
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
              <i className={showConfirm ? "bi bi-eye-slash" : "bi bi-eye"}></i>
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
          Register
        </button>
      </form>
      <div className="form-footer">
        Already have an account? <Link to="/login">Login</Link>
      </div>
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

export default Register;
