import "./update-post-modal.css";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updatePost } from "../../redux/apicalls/postApiCall";
import { fetchCategories } from "../../redux/apicalls/categoryApiCall";

const UpdatePostModal = ({ setUpdatePost, post }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);
  const { categories } = useSelector((state) => state.category);
  // From Submit Handler
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Please fill all the fields");
      return;
    }

    // جهز البيانات فقط بالحقول المطلوبة من backend
    const updatedPost = {
      title,
      description,
    };

    try {
      await dispatch(updatePost(updatedPost, post._id));
      setUpdatePost(false);
    } catch (err) {
      console.log(err.response?.data); // هتشوف أي error من backend
    }
  };
  useEffect(() => {
    dispatch(fetchCategories());
  }, [categories]);

  return (
    <div className="update-post">
      <ToastContainer theme="colored" />
      <form onSubmit={formSubmitHandler} className="update-post-form">
        <abbr title="close">
          <i
            onClick={() => setUpdatePost(false)}
            className="bi bi-x-circle-fill update-post-form-close"
          ></i>
        </abbr>
        <h1 className="update-post-title">Update Post</h1>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          className="update-post-input"
        />
        <select
          className="update-post-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Select A Category
          </option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.title}>
              {cat.title}
            </option>
          ))}
        </select>
        <textarea
          className="update-post-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
        ></textarea>
        <button type="submit" className="update-post-btn">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePostModal;
