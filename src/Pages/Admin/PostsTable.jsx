import "./admin.css";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPosts } from "../../redux/apicalls/postApiCall";
import {
  SkeletonRow,
  TableSearch,
  TableStatChip,
  TableFooter,
  EmptyRow,
} from "./Tableutils";

const PostsTable = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const deletePostHandler = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(postId));
        swal("Post has been deleted!", { icon: "success" });
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getAllPosts()).finally(() => setLoading(false));
  }, [dispatch]);

  const filtered =
    posts?.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.user.username.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  return (
    <div className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <div className="tbl-chips-row">
          <TableStatChip
            icon="bi-file-richtext-fill"
            label="Total"
            value={posts?.length}
            color="blue"
          />
          <TableStatChip
            icon="bi-search"
            label="Filtered"
            value={search ? filtered.length : null}
            color="warn"
          />
        </div>

        <div className="table-header-row">
          <h1 className="table-title">
            <i className="bi bi-file-richtext-fill" /> Posts
          </h1>
          <TableSearch
            value={search}
            onChange={setSearch}
            placeholder="Search by title or author…"
          />
        </div>

        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Author</th>
                <th>Post Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} cols={4} />
                ))
              ) : filtered.length === 0 ? (
                <EmptyRow cols={4} message="No posts found." />
              ) : (
                filtered.map((item, index) => (
                  <tr
                    key={item._id}
                    className="table-row-reveal"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <td className="table-count">{index + 1}</td>
                    <td>
                      <div className="table-image">
                        <img
                          src={
                            item.user?.profilePhoto?.url ||
                            "/default-profile.png"
                          }
                          alt={item.user?.username}
                          className="table-user-image"
                        />
                        <span className="table-username">
                          {item.user?.username}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="table-post-title">{item.title}</span>
                    </td>
                    <td>
                      <div className="table-button-group">
                        <button className="btn-view">
                          <Link to={`/posts-details/${item._id}`}>
                            <i className="bi bi-eye" /> View
                          </Link>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => deletePostHandler(item._id)}
                        >
                          <i className="bi bi-trash3" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && (
          <TableFooter
            shown={filtered.length}
            total={posts?.length}
            noun="posts"
          />
        )}
      </div>
    </div>
  );
};

export default PostsTable;
