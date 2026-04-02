import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Home from "./views/home/HomePage.jsx";
import Register from "./views/forms/Register.jsx";
import Login from "./views/forms/Login.jsx";

import Post from "./views/post-page/PostPage.jsx";
import CreatePost from "./views/createPosts/CreatePost.jsx";
import Footer from "./components/footer/Footer.jsx";
import PostDetails from "./views/postDetails/PostDetails.jsx";
import { ToastContainer } from "react-toastify";
import Category from "./views/category/Category.jsx";
import Profile from "./views/profile/Profile.jsx";
import UsersTable from "./views/admin/UsersTable.jsx";
import PostsTable from "./views/admin/PostsTable.jsx";
import CommentsTable from "./views/admin/CommentsTable.jsx";
import CategoriesTable from "./views/admin/CategoriesTable.jsx";
import ForgotPassword from "./views/forms/ForgotPassword.jsx";
import ResetPassword from "./views/forms/ResetPassword.jsx";
import NotFOund from "./views/not-found/NotFound.jsx";
import { useSelector } from "react-redux";
import VerifyEmail from "./views/verify-email/VerifingEmail.jsx";
import AdminDashboard from "./views/admin/AdminDashboard.jsx";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="top-center" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />

        <Route
          path="/users/:userId/verify/:token"
          element={!user ? <VerifyEmail /> : <Navigate to="/" />}
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:userId/:token"
          element={<ResetPassword />}
        />
        <Route path="/profile/:id" element={<Profile />} />
        {/* post routes */}
        <Route path="posts">
          <Route index element={<Post />} />
          <Route
            path="create"
            element={user ? <CreatePost /> : <Navigate to="/" />}
          />
          <Route path="details/:id" element={<PostDetails />} />
          <Route path="categories/:category" element={<Category />} />
        </Route>

        <Route path="admin-dashboard">
          <Route
            index
            element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
          />
          <Route
            path="users-table"
            element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />}
          />
          <Route
            path="posts-table"
            element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />}
          />
          <Route
            path="categories-table"
            element={user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />}
          />
          <Route
            path="comments-table"
            element={user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />}
          />
        </Route>
        <Route path="*" element={<NotFOund />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
