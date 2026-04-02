import { useState } from "react";
import "./comment-list.css";
import UpdateCommentModal from "./UpdateCommentModal";
import swal from "sweetalert";
// 1. استيراد dayjs والـ plugin الخاص بالوقت النسبي
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/apicalls/commentApiCall";

// 2. تفعيل الـ plugin
dayjs.extend(relativeTime);

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
              {/* 3. استخدام dayjs بدلاً من Component الـ Moment */}
              {dayjs(comment.createdAt).fromNow()}
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
