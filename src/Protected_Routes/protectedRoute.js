import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, type = "admin" }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authentication based on route type
    const isAuthenticated =
      type === "creator"
        ? localStorage.getItem("creator_authenticated") === "true"
        : localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
      // Redirect to appropriate login page
      navigate(type === "creator" ? "/creator/login" : "/");
      return;
    }

    // Optional: Check if user data exists
    const userData =
      type === "creator"
        ? localStorage.getItem("creator_userData")
        : localStorage.getItem("userData");

    if (!userData) {
      // Clear authentication and redirect to login
      if (type === "creator") {
        localStorage.removeItem("creator_authenticated");
        localStorage.removeItem("creator_userData");
        navigate("/creator/login");
      } else {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userData");
        navigate("/");
      }
      return;
    }

    // Optional: Check if login time is not too old (e.g., 24 hours)
    try {
      const user = JSON.parse(userData);
      const loginTime = new Date(user.loginTime);
      const now = new Date();
      const hoursDiff = (now - loginTime) / (1000 * 60 * 60);

      if (hoursDiff > 24) {
        // Session expired, clear data and redirect
        if (type === "creator") {
          localStorage.removeItem("creator_authenticated");
          localStorage.removeItem("creator_userData");
          navigate("/creator/login");
        } else {
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("userData");
          navigate("/");
        }
        return;
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      // Clear invalid data and redirect
      if (type === "creator") {
        localStorage.removeItem("creator_authenticated");
        localStorage.removeItem("creator_userData");
        navigate("/creator/login");
      } else {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userData");
        navigate("/");
      }
      return;
    }
  }, [navigate, type]);

  return children;
};

export default ProtectedRoute;
