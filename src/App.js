import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/HomePage";
import Register from "./Pages/forms/Register";
import Login from "./Pages/forms/Login";

import Post from "./Pages/post-page/PostPage.jsx";
import CreatePost from "./Pages/createPosts/CreatePost.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
import Footer from "./Components/footer/Footer.jsx";
import PostDetails from "./Pages/postDetails/PostDetails.jsx";
import { ToastContainer } from "react-toastify";
import Category from "./Pages/category/Category.jsx";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="top-center" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* post routes */}
        <Route path="posts">
          <Route index element={<Post />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="details/:id" element={<PostDetails />} />
          <Route path="categories/:category" element={<Category />} />
        </Route>

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
