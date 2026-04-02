import { Link } from "react-router-dom";
import { useState } from "react";

const PostItem = ({ post, username, userId }) => {
  const [liked, setLiked] = useState(false); // Local state just for visual animation demo if there's no redux integration here yet.

  const profileLink = userId
    ? `/profile/${userId}`
    : `/profile/${post?.user?._id}`;

  const defaultAvatar =
    "https://ui-avatars.com/api/?name=" +
    (username || post?.user?.username || "U") +
    "&background=random";
  const defaultImage =
    "https://picsum.photos/seed/" + (post?._id || "default") + "/800/500";

  return (
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
            onClick={() => setLiked(!liked)}
          >
            <i className={liked ? "bi bi-heart-fill" : "bi bi-heart"}></i>
            <span>
              {liked
                ? (post?.likes?.length || 0) + 1
                : post?.likes?.length || 0}
            </span>
          </button>
          <Link to={`/posts/details/${post?._id}`} className="post-action-btn">
            <i className="bi bi-chat"></i>
            <span>Comment</span>
          </Link>
        </div>

        <div className="post-item-title-row">
          <h4 className="post-item-title">{post?.title || "Untitled Post"}</h4>
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
  );
};

export default PostItem;
