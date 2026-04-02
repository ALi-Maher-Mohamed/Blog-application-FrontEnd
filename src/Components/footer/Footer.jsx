import { Link } from "react-router-dom";
import "./footer.css";
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        {/* Brand */}
        <Link to="/" className="site-footer__brand">
          <i className="bi bi-pencil-square" />
          Blog
        </Link>

        {/* Copyright */}
        <p className="site-footer__copy">
          &copy; {new Date().getFullYear()} Blog. All rights reserved.
        </p>

        {/* Links */}
        {/* <nav className="site-footer__links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav> */}
      </div>
    </footer>
  );
};

export default Footer;
