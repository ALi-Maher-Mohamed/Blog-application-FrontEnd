import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/home/HomePage.jsx";
import Register from "./pages/forms/Register.jsx";
import Login from "./pages/forms/Login.jsx";

import Post from "./pages/post-page/PostPage.jsx";
import CreatePost from "./pages/createPosts/CreatePost.jsx";
import Footer from "./components/footer/Footer.jsx";
import PostDetails from "./pages/postDetails/PostDetails.jsx";
import { ToastContainer } from "react-toastify";
import Category from "./pages/category/Category.jsx";
import Profile from "./pages/profile/Profile.jsx";
import UsersTable from "./pages/admin/UsersTable.jsx";
import PostsTable from "./pages/admin/PostsTable.jsx";
import CommentsTable from "./pages/admin/CommentsTable.jsx";
import CategoriesTable from "./pages/admin/CategoriesTable.jsx";
import ForgotPassword from "./pages/forms/ForgotPassword.jsx";
import ResetPassword from "./pages/forms/ResetPassword.jsx";
import NotFOund from "./pages/not-found/NotFound.jsx";
import { useSelector } from "react-redux";
import VerifyEmail from "./pages/verify-email/VerifingEmail.jsx";
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
