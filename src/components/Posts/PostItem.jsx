import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPromptModal = ({ action, onClose, onLogin, onSignup }) => (
  <div className="login-modal-overlay" onClick={onClose}>
    <div className="login-modal" onClick={(e) => e.stopPropagation()}>
      <button className="login-modal-close" onClick={onClose}>
        <i className="bi bi-x-lg"></i>
      </button>
      <div className="login-modal-icon">
        <i className={action === "like" ? "bi bi-heart" : "bi bi-chat"}></i>
      </div>
      <h3 className="login-modal-title">Join the conversation</h3>
      <p className="login-modal-desc">
        Log in to {action === "like" ? "like posts" : "leave comments"}. It only
        takes a second!
      </p>
      <div className="login-modal-actions">
        <button className="login-modal-btn primary" onClick={onLogin}>
          Log in
        </button>
        <button className="login-modal-btn secondary" onClick={onSignup}>
          Sign up for free
        </button>
      </div>
      <button className="login-modal-dismiss" onClick={onClose}>
        Maybe later
      </button>
    </div>
  </div>
);

const PostItem = ({ post, username, userId, isLoggedIn }) => {
  const [liked, setLiked] = useState(false);
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  const profileLink = userId
    ? `/profile/${userId}`
    : `/profile/${post?.user?._id}`;

  const defaultAvatar =
    "https://ui-avatars.com/api/?name=" +
    (username || post?.user?.username || "U") +
    "&background=random";
  const defaultImage =
    "https://picsum.photos/seed/" + (post?._id || "default") + "/800/500";

  const handleLike = () => {
    if (!isLoggedIn) {
      setModal("like");
      return;
    }
    setLiked(!liked);
  };

  const handleComment = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setModal("comment");
    }
  };

  return (
    <>
      {modal && (
        <LoginPromptModal
          action={modal}
          onClose={() => setModal(null)}
          onLogin={() => navigate("/login")}
          onSignup={() => navigate("/register")}
        />
      )}

      <div className="post-item">
        <div className="post-item-info">
          <div className="post-item-author">
            <Link to={profileLink}>
              <img
                src={post?.user?.profilePhoto?.url || defaultAvatar}
                alt="avatar"
                className="post-item-avatar"
              />
            </Link>
            <div className="post-author-details">
              <Link className="post-item-username" to={profileLink}>
                <span>
                  {username ? username : post?.user?.username || "Unknown User"}
                </span>
              </Link>
              <div className="post-item-date">
                {new Date(post?.createdAt || Date.now()).toDateString()}
              </div>
            </div>
          </div>
          <i
            className="bi bi-three-dots"
            style={{ cursor: "pointer", color: "var(--text-secondary)" }}
          ></i>
        </div>

        <div className="post-item-image-wrapper skeleton">
          <img
            src={post?.image?.url || defaultImage}
            alt="Post Cover"
            className="post-item-image"
            onLoad={(e) => e.target.parentElement.classList.remove("skeleton")}
          />
        </div>

        <div className="post-item-details-wrapper">
          <div className="post-item-actions">
            <button
              className={`post-action-btn like-btn ${liked ? "liked" : ""}`}
              onClick={handleLike}
            >
              <i className={liked ? "bi bi-heart-fill" : "bi bi-heart"}></i>
              <span>
                {liked
                  ? (post?.likes?.length || 0) + 1
                  : post?.likes?.length || 0}
              </span>
            </button>
            <Link
              to={`/posts/details/${post?._id}`}
              className="post-action-btn"
              onClick={handleComment}
            >
              <i className="bi bi-chat"></i>
              <span>Comment</span>
            </Link>
          </div>

          <div className="post-item-title-row">
            <h4 className="post-item-title">
              {post?.title || "Untitled Post"}
            </h4>
            <Link
              className="post-item-category"
              to={`/posts/categories/${post?.category}`}
            >
              {post?.category || "General"}
            </Link>
          </div>

          <p className="post-item-description">
            {post?.description ||
              "No description provided for this post. This is a fallback text that shows how the layout behaves when content is limited."}
          </p>

          <Link className="post-item-link" to={`/posts/details/${post?._id}`}>
            View full post
          </Link>
        </div>
      </div>
    </>
  );
};

export default PostItem;
