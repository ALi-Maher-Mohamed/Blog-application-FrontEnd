import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/HomePage";
import Register from "./Pages/forms/Register";
import Login from "./Pages/forms/Login";
import Post from "./Pages/post-page/PostPage.jsx";
import CreatePost from "./Pages/createPosts/CreatePost.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Post />} />
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
