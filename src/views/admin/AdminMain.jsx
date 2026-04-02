import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../redux/apicalls/categoryApiCall";
import { getPostsCount } from "../../redux/apicalls/postApiCall";
import { getUsersCount } from "../../redux/apicalls/profileApiCall";
import AddCategoryForm from "./AddCategoryForm";
import { useEffect } from "react";
import { fetchAllComment } from "../../redux/apicalls/commentApiCall";

const STAT_CARDS = [
  {
    key: "users",
    title: "Total Users",
    icon: "bi-people-fill",
    link: "/admin-dashboard/users-table",
    linkLabel: "Manage users",
    color: "blue",
  },
  {
    key: "posts",
    title: "Total Posts",
    icon: "bi-file-richtext-fill",
    link: "/admin-dashboard/posts-table",
    linkLabel: "Manage posts",
    color: "green",
  },
  {
    key: "categories",
    title: "Categories",
    icon: "bi-tags-fill",
    link: "/admin-dashboard/categories-table",
    linkLabel: "Manage categories",
    color: "warn",
  },
  {
    key: "comments",
    title: "Comments",
    icon: "bi-chat-square-dots-fill",
    link: "/admin-dashboard/comments-table",
    linkLabel: "Manage comments",
    color: "red",
  },
];

const AdminMain = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { usersCount } = useSelector((state) => state.profile);
  const { postsCount } = useSelector((state) => state.post);
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(getUsersCount());
    dispatch(getPostsCount());
    dispatch(fetchCategories());
    dispatch(fetchAllComment());
  }, []);

  const counts = {
    users: usersCount,
    posts: postsCount,
    categories: categories?.length,
    comments: comments?.length,
  };

  return (
    <main className="admin-main">
      {/* ── Welcome Banner ── */}
      <div className="admin-banner">
        <div className="admin-banner__text">
          <h1 className="admin-banner__title">Welcome back 👋</h1>
          <p className="admin-banner__sub">
            Here's what's happening with your platform today.
          </p>
        </div>
        <div className="admin-banner__decoration" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="admin-stats-grid">
        {STAT_CARDS.map(({ key, title, icon, link, linkLabel, color }, i) => (
          <div
            key={key}
            className={`admin-stat-card admin-stat-card--${color}`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="stat-card__top">
              <div className="stat-card__icon-wrap">
                <i className={`bi ${icon}`} />
              </div>
              <span className="stat-card__badge">{title}</span>
            </div>
            <div className="stat-card__count">
              {counts[key] ?? <span className="stat-skeleton" />}
            </div>
            <Link to={link} className="stat-card__link">
              {linkLabel}
              <i className="bi bi-arrow-right-short" />
            </Link>
          </div>
        ))}
      </div>

      {/* ── Add Category ── */}
      <AddCategoryForm />
    </main>
  );
};

export default AdminMain;
