import "./posts-page.css";
import PostList from "../../Components/Posts/PostList";
import Sidebar from "../../Components/sidebar/Sidebar";
import { posts, categories } from "../../dummyData";
import Pagination from "../../Components/pagination/Pagination";
import { useEffect } from "react";

const Post = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="posts-page">
        <PostList posts={posts} />
        <Sidebar categories={categories} />
      </section>
      <Pagination />
    </>
  );
};

export default Post;
