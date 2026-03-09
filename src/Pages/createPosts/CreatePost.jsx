import { useState } from "react";
import "./create-post.css";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [discreption, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  // form submert handler
  const formSubmetHandler = (e) => {
    e.preventDefault();

    console.log({ title, discreption, category, file });
  };
  return (
    <div className="section create-post">
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
          <option disabled>select category</option>
          <option value="technology">Technology</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="travel">Travel</option>
          <option value="food">Food</option>
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
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
