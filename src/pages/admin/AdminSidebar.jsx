import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  {
    to: "/admin-dashboard/users-table",
    icon: "bi-people-fill",
    label: "Users",
  },
  {
    to: "/admin-dashboard/posts-table",
    icon: "bi-file-richtext-fill",
    label: "Posts",
  },
  {
    to: "/admin-dashboard/categories-table",
    icon: "bi-tags-fill",
    label: "Categories",
  },
  {
    to: "/admin-dashboard/comments-table",
    icon: "bi-chat-square-dots-fill",
    label: "Comments",
  },
];

const AdminSidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="admin-sidebar">
      {/* Logo / brand */}
      <Link to="/admin-dashboard" className="sidebar-brand">
        <span className="sidebar-brand__icon">
          <i className="bi bi-shield-check" />
        </span>
        <span className="sidebar-brand__text">Admin</span>
      </Link>

      <nav className="sidebar-nav">
        <p className="sidebar-nav__label">Navigation</p>
        <ul>
          {NAV_LINKS.map(({ to, icon, label }) => {
            const active = pathname === to;
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`sidebar-link ${active ? "sidebar-link--active" : ""}`}
                >
                  <span className="sidebar-link__icon">
                    <i className={`bi ${icon}`} />
                  </span>
                  <span className="sidebar-link__text">{label}</span>
                  {active && <span className="sidebar-link__dot" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer__avatar">A</div>
        <div className="sidebar-footer__info">
          <span className="sidebar-footer__name">Admin Panel</span>
          <span className="sidebar-footer__role">Super Admin</span>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
