import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Home from "../pages/Home";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

const MainLayout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);
