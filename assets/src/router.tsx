import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home/Home';
import Auth from './pages/AuthPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};
