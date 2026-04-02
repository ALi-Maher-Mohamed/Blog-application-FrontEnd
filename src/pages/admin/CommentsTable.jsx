import { useDispatch, useSelector } from "react-redux";
import "./admin.css";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import {
  deleteComment,
  fetchAllComment,
} from "../../redux/apicalls/commentApiCall";
import {
  SkeletonRow,
  TableSearch,
  TableStatChip,
  TableFooter,
  EmptyRow,
} from "./Tableutils";

const CommentsTable = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteComment(commentId));
        swal("Comment has been deleted!", { icon: "success" });
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(fetchAllComment()).finally(() => setLoading(false));
  }, [dispatch]);

  const filtered =
    comments?.filter(
      (c) =>
        c.text.toLowerCase().includes(search.toLowerCase()) ||
        c.user.username.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  return (
    <div className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <div className="tbl-chips-row">
          <TableStatChip
            icon="bi-chat-square-dots-fill"
            label="Total"
            value={comments?.length}
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
            <i className="bi bi-chat-square-dots-fill" /> Comments
          </h1>
          <TableSearch
            value={search}
            onChange={setSearch}
            placeholder="Search by comment or user…"
          />
        </div>

        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} cols={4} />
                ))
              ) : filtered.length === 0 ? (
                <EmptyRow cols={4} message="No comments found." />
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
                          src={item.user.profilePhoto.url}
                          alt={item.user.username}
                          className="table-user-image"
                        />
                        <span className="table-username">
                          {item.user.username}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="table-comment-text">{item.text}</span>
                    </td>
                    <td>
                      <div className="table-button-group">
                        <button
                          className="btn-delete"
                          onClick={() => deleteCommentHandler(item._id)}
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
            total={comments?.length}
            noun="comments"
          />
        )}
      </div>
    </div>
  );
};

export default CommentsTable;
