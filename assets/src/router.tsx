import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthPage from './pages/AuthPage';
import HomePage from "./pages/HomePage";
import PostsPage from "./pages/PostsPage";
import Layout from "./components/Layout";

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/posts" element={<PostsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
