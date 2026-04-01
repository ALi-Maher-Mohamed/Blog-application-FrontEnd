import { postActions } from "../slices/postSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// جلب البوستات بصفحات معينة
export function fetchPosts(pageNumber) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}`);
      dispatch(postActions.setPosts(data));
    } catch (error) {
      // حماية الـ Catch باستخدام الـ Optional Chaining
      toast.error(error.response?.data?.message || "Internal Server Error");
    }
  };
}

// توليد محتوى البوست بالذكاء الاصطناعي
export function generateAiPostContent(title) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setLoading());
      const { data } = await request.post(
        `/api/posts/ai-write`,
        { title },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        },
      );

      dispatch(postActions.setAiContent(data.aiContent));
      toast.success("تم توليد المقال بنجاح! 🪄");
    } catch (error) {
      dispatch(postActions.clearLoading());
      toast.error(error.response?.data?.message);
    }
  };
}

// توليد ملخص (Summary) للبوست
export function generateAiPostSummary(description) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setLoading());
      const { data } = await request.post(
        `/api/posts/ai-summarize`,
        { description },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        },
      );

      dispatch(postActions.setAiSummary(data.summary));
      toast.success("تم توليد الملخص بنجاح!");
    } catch (error) {
      dispatch(postActions.clearLoading());
      toast.error(error.response?.data?.message || "فشل تلخيص المقال");
    }
  };
}

// جلب إجمالي عدد البوستات
export function getPostsCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/count`);
      dispatch(postActions.setPostsCount(data));
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal Server Error");
    }
  };
}

// جلب البوستات بناءً على القسم
export function fetchPostsBasedOnCategory(category) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?category=${category}`);

      // تأكد أن الاسم يطابق تماماً ما هو موجود في الـ postSlice.js
      dispatch(postActions.setPostsCategories(data));
    } catch (error) {
      toast.error(error.response?.data?.message || "Category Fetch Failed");
      console.log(error.response?.data?.message || "Something went wrong");
    }
  };
}
export function createPost(newPost) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setLoading());
      await request.post(`/api/posts`, newPost, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });

      // تأكد أن الاسم يطابق تماماً ما هو موجود في الـ postSlice.js
      dispatch(postActions.setIsPostCreated());
      setTimeout(() => {
        dispatch(postActions.clearIsPostCreated());
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message);
      dispatch(postActions.clearLoading());
      console.log(error);
      console.log(error.response?.data?.message || "Something went wrong");
    }
  };
}

export function fetchSinglePost(postId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/${postId}`);
      dispatch(postActions.setPost(data));
    } catch (error) {
      // حماية الـ Catch باستخدام الـ Optional Chaining
      toast.error(error.response.data.message);
    }
  };
}
export function toggleLikePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/posts/like/${postId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        },
      );
      dispatch(postActions.setLike(data));
    } catch (error) {
      // حماية الـ Catch باستخدام الـ Optional Chaining
      toast.error(error.response.data.message);
    }
  };
}
export function updatePostImage(newImage, postId) {
  return async (getState) => {
    try {
      await request.put(`/api/posts/update-image/${postId}`, newImage, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Image Updated Successfully");
    } catch (error) {
      // حماية الـ Catch باستخدام الـ Optional Chaining
      toast.error(error.response.data.message);
    }
  };
}
export function updatePost(newPost, postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/posts/${postId}`, newPost, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          // **لا تحط Content-Type**، axios هيضبطها تلقائي مع FormData
        },
      });

      dispatch(postActions.setPost(data));

      const currentPosts = getState().post.posts;
      const updatedPosts = currentPosts.map((p) =>
        p._id === postId ? data : p,
      );
      dispatch(postActions.setPosts(updatedPosts));

      toast.success("Post Updated Successfully");
    } catch (error) {
      console.log(error.response?.data); // هتشوف أي error من backend
      toast.error(error.response?.data?.message || "Update Failed");
    }
  };
}
export function deletePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          // **لا تحط Content-Type**، axios هيضبطها تلقائي مع FormData
        },
      });

      dispatch(postActions.deletePost(data.postId));
      toast.success("Post Deleted Successfully");
    } catch (error) {
      console.log(error.response?.data); // هتشوف أي error من backend
      toast.error(error.response?.data?.message || "Delete Failed");
    }
  };
}

export function getAllPosts() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts`);
      dispatch(postActions.setPosts(data));
    } catch (error) {
      // حماية الـ Catch باستخدام الـ Optional Chaining
      toast.error(error.response?.data?.message || "Internal Server Error");
    }
  };
}
