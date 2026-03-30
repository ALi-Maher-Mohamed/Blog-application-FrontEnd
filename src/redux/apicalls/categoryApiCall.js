import { categoryActions } from "../slices/categorySlice";

import request from "../../utils/request";
import { toast } from "react-toastify";

export function fetchCategories() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/categories");
      dispatch(categoryActions.setCategories(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function createCategory(newCatefory) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/categories", newCatefory, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryActions.addCategory(data));
      toast.success("Category Created Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
export function deleteCategory(categoryId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/categories/${categoryId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryActions.deleteCategory(data.categoryId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
