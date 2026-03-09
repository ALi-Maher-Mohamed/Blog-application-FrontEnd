import PostList from "../../Components/Posts/PostList";
import Sidbar from "../../Components/sidebar/Sidebar";
import "./home.css";
import { posts, categories } from "../../dummyData";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <section className="home">
      <div className="home-hero-header">
        <div className="home-hero-header-layout">
          <h1 className="home-title">Welcome to BlogPro</h1>
        </div>
      </div>
      <div className="home-latest-post">Latest post</div>
      <div className="home-container">
        <PostList posts={posts.slice(0, 3)} />
        <Sidbar categories={categories} />
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
