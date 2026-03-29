import { useEffect, useState } from "react";
import "./create-post.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { createPost } from "../../redux/apicalls/postApiCall";
import { fetchCategories } from "../../redux/apicalls/categoryApiCall";
const CreatePost = () => {
  const dispatch = useDispatch();
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const [title, setTitle] = useState("");
  const [discreption, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const { categories } = useSelector((state) => state.category);

  // form submert handler
  const formSubmetHandler = (e) => {
    e.preventDefault();
    if (!title || !discreption || !category || !file) {
      toast.error("Please fill all the fields");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", discreption);
    formData.append("category", category);
    formData.append("image", file);

    dispatch(createPost(formData));
  };
  const navigate = useNavigate();
  useEffect(() => {
    console.log("isPostCreated:", isPostCreated);

    if (isPostCreated) {
      navigate("/");
      toast.success("Post created successfully");
    }
  }, [isPostCreated, navigate]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [categories, navigate]);
  return (
    <section className="create-post">
      <h1 className="create-post-title">Create New Post</h1>
      <form onSubmit={formSubmetHandler} className="create-post-form">
        <input
          type="text"
          placeholder="Post Title"
          className="create-post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="create-post-input"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.title}>
              {cat.title}
            </option>
          ))}
        </select>
        <textarea
          className="create-post-textarea"
          rows="5"
          placeholder="Post Description"
          value={discreption}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          id="file"
          name="file"
          className="create-post-upload"
        />
        <button type="submit" className="create-post-btn ">
          {loading ? (
            <BallTriangle
              height={20}
              width={20}
              color="#fff"
              ariaLabel="loading"
              wrapperClass={{}}
              wrapperStyle={{}}
              visible={true}
            />
          ) : (
            "Create Post"
          )}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
