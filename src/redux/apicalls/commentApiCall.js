import { postActions } from "../slices/postSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// create comment
export function createComment(newComment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(`/api/comments`, newComment, {
        headers: { Authorization: "Bearer " + getState().auth.user.token },
      });
      dispatch(postActions.addCommentToPost(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function updateComment(commentId, Comment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/comments/${commentId}`,
        Comment,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        },
      );

      dispatch(postActions.updateCommentPost(data));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
}
export function deleteComment(commentId) {
  return async (dispatch, getState) => {
    try {
      await request.delete(
        `/api/comments/${commentId}`,

        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        },
      );

      dispatch(postActions.deleteCommenFromPost(commentId));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
}
