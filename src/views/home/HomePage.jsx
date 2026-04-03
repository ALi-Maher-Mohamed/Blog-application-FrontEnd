import PostList from "../../components/Posts/PostList";
import Sidbar from "../../components/sidebar/Sidebar";
import "./home.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts } from "../../redux/apicalls/postApiCall";

const Home = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchPosts(1));
  }, []);

  const { posts } = useSelector((state) => state.post);

  const stats = [
    { value: `${posts?.length ?? 0}+`, label: "Articles" },
    { value: "12K+", label: "Readers" },
    { value: "40+", label: "Topics" },
  ];

  return (
    <section className="home">
      {/* Hero */}
      <div className="home-hero">
        <div className="home-hero-overlay" />
        <div className="home-hero-content">
          <div className="home-hero-badge">
            <span className="home-hero-badge-dot" />
            Now live — fresh articles every day
          </div>
          <h1 className="home-hero-title">
            Ideas worth <span className="home-hero-accent">reading.</span>
          </h1>
          <p className="home-hero-sub">
            Explore in-depth articles on tech, design, and culture — written by
            people who care.
          </p>
          {/* <div className="home-hero-search">
            <i className="bi bi-search home-hero-search-icon" />
            <input
              type="text"
              placeholder="Search topics, authors, articles…"
              className="home-hero-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="home-hero-search-btn">Search</button>
          </div> */}
          <div className="home-hero-stats">
            {stats.map((s) => (
              <div key={s.label} className="home-hero-stat">
                <span className="home-hero-stat-value">{s.value}</span>
                <span className="home-hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="home-hero-scroll-hint">
          <i className="bi bi-chevron-double-down" />
        </div>
      </div>

      {/* Latest posts section */}
      <div className="home-section-header">
        <div className="home-section-header-left">
          <span className="home-section-tag">Fresh picks</span>
          <h2 className="home-section-title">Latest Posts</h2>
        </div>
        <Link to="/posts" className="home-section-link">
          Browse all <i className="bi bi-arrow-right" />
        </Link>
      </div>

      <div className="home-container">
        <PostList posts={posts} />
        <Sidbar />
      </div>

      {/* CTA banner */}
      <div className="home-cta">
        <div className="home-cta-inner">
          <h2 className="home-cta-title">Never miss a story.</h2>
          <p className="home-cta-desc">
            Join thousands of curious readers discovering new ideas every week.
          </p>
          <Link to="/posts" className="home-cta-btn">
            Explore all posts <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
