import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import NotFOund from "./Pages/not-found/NotFound.jsx";
import { useSelector } from "react-redux";
import VerifyEmail from "./Pages/verify-email/VerifingEmail.jsx";

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
        <Route path="/reset-password" element={<ResetPassword />} />
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
