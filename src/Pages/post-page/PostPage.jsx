import "./posts-page.css";
import PostList from "../../Components/Posts/PostList";
import Sidebar from "../../Components/sidebar/Sidebar";
import Pagination from "../../Components/pagination/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsCount } from "../../redux/apicalls/postApiCall";
const POST_PER_PAGE = 3;
const Post = () => {
  const dispatch = useDispatch();
  const { postsCount, posts } = useSelector((state) => state.post);
  const [currentPage, setCurrentPage] = useState(1);
  console.log("البيانات القادمة من ريدكس:", { postsCount, posts });
  const pages = Math.ceil(Number(postsCount || 0) / POST_PER_PAGE);
  console.log("عدد الصفحات النهائي:", pages);
  useEffect(() => {
    dispatch(fetchPosts(currentPage));
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    dispatch(getPostsCount());
  }, []);

  return (
    <>
      <section className="posts-page">
        <PostList posts={posts} />
        <Sidebar />
      </section>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default Post;
