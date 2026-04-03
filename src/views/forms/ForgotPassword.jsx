import "./form.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../redux/apicalls/passwordApicall";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required");
    dispatch(forgetPassword(email));
  };

  return (
    <section className="form-container">
      <h1 className="form-title">Forgot Password</h1>
      <p className="form-subtitle">
        Enter your email and we'll send you a reset link.
      </p>
      <form onSubmit={formSubmitHandler} className="form">
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
        <button type="submit" className="form-btn">
          Send Reset Link
        </button>
      </form>
    </section>
  );
};

export default ForgotPassword;
