import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../../redux/apicalls/categoryApiCall";

const AddCategoryForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Category title is required");
    setLoading(true);
    await dispatch(createCategory({ title }));
    setTitle("");
    setLoading(false);
    toast.success("Category added!");
  };

  return (
    <div className="add-category-card">
      <div className="add-category-card__header">
        <span className="add-category-card__icon">
          <i className="bi bi-plus-circle-fill" />
        </span>
        <h6 className="add-category-card__title">Add New Category</h6>
      </div>

      <form onSubmit={formSubmitHandler} className="add-category-form">
        <div className="add-category-field">
          <label htmlFor="cat-title">Category Title</label>
          <input
            id="cat-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Technology, Travel, Health…"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="add-category-submit"
          disabled={loading}
        >
          {loading ? (
            <span className="btn-spinner" />
          ) : (
            <>
              <i className="bi bi-plus-lg" />
              Add Category
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
