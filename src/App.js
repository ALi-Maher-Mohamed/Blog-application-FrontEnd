import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/HomePage";
import Register from "./Pages/forms/Register";
import Login from "./Pages/forms/Login";

import Post from "./Pages/post-page/PostPage.jsx";
import CreatePost from "./Pages/createPosts/CreatePost.jsx";
import AdminDashboard from "./Pages/admin/AdminDashboard.jsx";
import Footer from "./Components/footer/Footer.jsx";
import PostDetails from "./Pages/postDetails/PostDetails.jsx";
import { ToastContainer } from "react-toastify";
import Category from "./Pages/category/Category.jsx";
import Profile from "./Pages/profile/Profile.jsx";
import UsersTable from "./Pages/admin/UsersTable.jsx";
import PostsTable from "./Pages/admin/PostsTable.jsx";
import CommentsTable from "./Pages/admin/CommentsTable.jsx";
import CategoriesTable from "./Pages/admin/CategoriesTable.jsx";
import ForgotPassword from "./Pages/forms/ForgotPassword.jsx";
import ResetPassword from "./Pages/forms/ResetPassword.jsx";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="top-center" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile/:id" element={<Profile />} />
        {/* post routes */}
        <Route path="posts">
          <Route index element={<Post />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="details/:id" element={<PostDetails />} />
          <Route path="categories/:category" element={<Category />} />
        </Route>

        <Route path="admin-dashboard">
          <Route index element={<AdminDashboard />} />
          <Route path="users-table" element={<UsersTable />} />
          <Route path="posts-table" element={<PostsTable />} />
          <Route path="categories-table" element={<CategoriesTable />} />
          <Route path="comments-table" element={<CommentsTable />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
