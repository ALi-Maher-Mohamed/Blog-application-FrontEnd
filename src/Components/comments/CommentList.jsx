import { useState } from "react";
import "./comment-list.css";
import UpdateCommentModal from "./UpdateCommentModal";
import swal from "sweetalert";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/apicalls/commentApiCall";

const CommentList = ({ comments }) => {
  const [updateComment, setUpdateComment] = useState(false);
  const [commentforUpdate, setCommentforUpdate] = useState(null);
  function updateCommentHandler(comment) {
    setCommentforUpdate(comment);
    setUpdateComment(true);
  }
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // Delete Comment Handler
  const deleteCommentHandler = (comentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteComment(comentId));
      }
    });
  };

  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length} Comments</h4>
      {comments?.map((comment) => (
        <div key={comment._id} className="comment-item">
          <div className="comment-item-info">
            <div className="comment-item-username">{comment?.userName}</div>
            <div className="comment-item-time">
              <Moment fromNow>{comment.createdAt}</Moment> ago
            </div>
          </div>
          <p className="comment-item-text">{comment.text}</p>
          {user?._id === comment?.user && (
            <div className="comment-item-icon-wrapper">
              <i
                onClick={() => updateCommentHandler(comment)}
                className="bi bi-pencil-square"
              ></i>
              <i
                onClick={() => deleteCommentHandler(comment?._id)}
                className="bi bi-trash-fill"
              ></i>
            </div>
          )}
        </div>
      ))}
      {updateComment && (
        <UpdateCommentModal
          commentforUpdate={commentforUpdate}
          setUpdateComment={setUpdateComment}
        />
      )}
    </div>
  );
};

export default CommentList;
