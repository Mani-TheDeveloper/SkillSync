import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import { GlobalErrorModal, NavBar } from "../components";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import ContextProvider from "../context/ContextProvider";
const UploadResume = lazy(() => import("../pages/UploadResume"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/upload-resume"
              element={
                <ProtectedRoute>
                  <Suspense
                    fallback={
                      <div className="h-screen w-screen flex justify-center items-center text-2xl font-medium">
                        Loading ...
                      </div>
                    }
                  >
                    <UploadResume />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Suspense
                    fallback={
                      <div className="h-screen w-screen flex justify-center items-center text-2xl font-medium">
                        Loading ...
                      </div>
                    }
                  >
                    <Dashboard />
                  </Suspense>
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}

const MainLayout = () => (
  <>
    <NavBar />
    <Outlet />
    <GlobalErrorModal />
  </>
);
