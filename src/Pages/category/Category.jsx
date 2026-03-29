import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PostList from "../../Components/Posts/PostList";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsBasedOnCategory } from "../../redux/apicalls/postApiCall";
import "./category.css";

const Category = () => {
  const { category } = useParams();

  const dispatch = useDispatch();
  const { postsCategories } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <div className="category">
      {postsCategories.length === 0 ? (
        <>
          <h1 className="category-not-found">
            No posts found based on <span>{category}</span>
          </h1>
          <Link to="/posts" className="category-not-found-link">
            Go to posts
          </Link>
        </>
      ) : (
        <>
          <h1 className="category-title">Posts based on {category}</h1>
          <PostList posts={postsCategories || []} />
        </>
      )}
    </div>
  );
};

export default Category;
