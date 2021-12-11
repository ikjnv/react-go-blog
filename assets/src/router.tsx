import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthPage from './pages/AuthPage';
import HomePage from "./pages/HomePage";
import PostsPage from "./pages/PostsPage";
import Layout from "./components/Layout";
import { PostForm } from "./components/Post";

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/create" element={<PostForm />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
