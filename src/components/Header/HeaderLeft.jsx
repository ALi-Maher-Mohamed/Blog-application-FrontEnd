import { Link } from "react-router-dom";

const HeaderLeft = ({ setToggle, toggle }) => {
  return (
    <div className="header-left">
      <Link to="/" className="header-logo">
        <strong>BLOG</strong>
        <i className="bi bi-pencil"></i>
      </Link>

      <div
        onClick={() => setToggle((prev) => !prev)}
        className="header-menu"
        role="button"
        aria-label="Toggle menu"
        aria-expanded={toggle}
      >
        <i className={toggle ? "bi bi-x-lg" : "bi bi-list"}></i>
      </div>
    </div>
  );
};

export default HeaderLeft;
