import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthPage from './pages/AuthPage';
import HomePage from "./pages/HomePage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
};
