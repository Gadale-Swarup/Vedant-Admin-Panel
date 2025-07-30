import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/common.scss";
import ScrollToTop from "./Component/ScrollToTop/ScrollToTop";
import ProtectedRoute from "./Protected_Routes/protectedRoute";
import Loader from "./Component/Loader/Loader";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import Booking from "./Pages/Booking/Booking";
import Users from "./Pages/Users/Users";
import CourtManagement from "./Pages/CourtManagement/CourtManagement";

const Layout = lazy(() => import("./Component/Layout/Layout"));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ToastContainer />
      <Suspense fallback={<Loader message="Loading application..." />}>
        <Routes>
          {/* Login route */}
          <Route path="/" element={<Login />} />

          {/* Admin routes with Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="booking" element={<Booking />} />
            <Route path="users" element={<Users />} />
            <Route path="court-management" element={<CourtManagement />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
