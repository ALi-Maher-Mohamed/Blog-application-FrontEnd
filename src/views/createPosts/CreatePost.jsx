import { useEffect, useState } from "react";
import "./create-post.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BallTriangle, ThreeDots } from "react-loader-spinner"; // ضفت ThreeDots للزرار الجديد
import {
  createPost,
  generateAiPostContent,
} from "../../redux/apicalls/postApiCall"; // ضيف الـ function الجديدة
import { fetchCategories } from "../../redux/apicalls/categoryApiCall";

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // استخراج البيانات من الـ Store
  const { loading, isPostCreated, aiContent } = useSelector(
    (state) => state.post,
  );
  const { categories } = useSelector((state) => state.category);

  const [title, setTitle] = useState("");
  const [discreption, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  // تحديث الـ description تلقائياً لما الـ AI يخلص كتابه
  useEffect(() => {
    if (aiContent) {
      setDescription(aiContent);
    }
  }, [aiContent]);

  // جلب التصنيفات عند التحميل
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]); // شيلنا categories و navigate من هنا عشان ميعملش infinite loop

  // التعامل مع نجاح إنشاء البوست
  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
      toast.success("Post created successfully");
    }
  }, [isPostCreated, navigate]);

  // فانكشن توليد المحتوى بالذكاء الاصطناعي
  const aiGenerateHandler = () => {
    if (!title) {
      return toast.warning("Please enter a title to generate content with AI");
    }
    dispatch(generateAiPostContent(title));
  };

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

        {/* زرار الـ AI الجديد */}
        <div className="ai-btn-container" style={{ marginBottom: "10px" }}>
          <button
            type="button"
            onClick={aiGenerateHandler}
            className="ai-generate-btn"
            disabled={loading}
            style={{
              backgroundColor: "#6200ea",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {loading ? (
              <ThreeDots color="#fff" height={15} width={15} />
            ) : (
              "🪄 AI Writer "
            )}
          </button>
        </div>

        <textarea
          className="create-post-textarea"
          rows="8"
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

        <button type="submit" className="create-post-btn">
          {loading ? (
            <BallTriangle height={20} width={20} color="#fff" visible={true} />
          ) : (
            "Create Post"
          )}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
