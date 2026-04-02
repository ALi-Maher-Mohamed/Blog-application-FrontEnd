import PostList from "../../components/Posts/PostList";
import Sidbar from "../../components/sidebar/Sidebar";
import "./home.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../../redux/apicalls/postApiCall";
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(1));
  }, []);
  const { posts } = useSelector((state) => state.post);
  return (
    <section className="home">
      <div className="home-hero-header">
        <div className="home-hero-header-layout">
          <h1 className="home-title">Welcome to BlogPro</h1>
        </div>
      </div>
      <div className="home-latest-post">Latest post</div>
      <div className="home-container">
        <PostList posts={posts} />
        <Sidbar />
      </div>
      <div className="home-see-posts-link">
        <Link to="/posts" className="home-link">
          See all posts
        </Link>
      </div>
    </section>
  );
};

export default Home;
