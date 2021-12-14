import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthPage from './pages/AuthPage';
import HomePage from "./pages/HomePage";
import UserPostsPage from "./pages/UserPostsPage";
import Layout from "./components/Layout";
import PostsPage from "./pages/PostsPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/user/posts" element={<UserPostsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
