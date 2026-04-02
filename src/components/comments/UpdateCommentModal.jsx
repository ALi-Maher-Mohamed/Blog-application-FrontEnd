import "./update-comment-modal.css";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/apicalls/commentApiCall";

const UpdateCommentModal = ({ setUpdateComment, commentforUpdate }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  useEffect(() => {
    setText(commentforUpdate?.text || "");
  }, [commentforUpdate]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!text) {
      toast.error("Please fill this the field ");
      return;
    }

    if (!commentforUpdate?._id) {
      toast.error("Comment not found");
      return;
    }

    dispatch(updateComment(commentforUpdate._id, { text }));
    setUpdateComment(false);
  };
  return (
    <div className="update-comment">
      <ToastContainer theme="colored" />
      <form onSubmit={formSubmitHandler} className="update-comment-form">
        <abbr title="close">
          <i
            onClick={() => setUpdateComment(false)}
            className="bi bi-x-circle-fill update-comment-form-close"
          ></i>
        </abbr>
        <h1 className="update-comment-title">Edit Comment</h1>
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          className="update-comment-input"
          placeholder="Update Comment"
        />
        <button type="submit" className="update-comment-btn">
          Edit Comment
        </button>
      </form>
    </div>
  );
};

export default UpdateCommentModal;
