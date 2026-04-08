import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Home from "../pages/Home";
import UploadResume from "../pages/UploadResume";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/upload-resume"
            element={
              <ProtectedRoute>
                <UploadResume />
              </ProtectedRoute>
            }
          />
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
