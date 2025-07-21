import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import logo from "../../assets/logo/Logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import BackgroundImage from "../../assets/logo/Home.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simple frontend validation - you can modify these credentials
      const validCredentials = {
        email: "admin@admin.com",
        password: "admin",
      };

      if (
        email === validCredentials.email &&
        password === validCredentials.password
      ) {
        // Store user session in localStorage
        const userData = {
          email: email,
          name: "Admin User",
          role: "admin",
          isAuthenticated: true,
          loginTime: new Date().toISOString(),
        };

        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("isAuthenticated", "true");

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      setError("Invalid credentials, please try again.");
      toast.error("Invalid credentials, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-page">
      <div
        className="login-background"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundColor: "#f0f2f5",
        }}
      ></div>
      <div className="login-container">
        <div className="login-card">
          <div className="logo-section">
            <img
              src={logo}
              alt="Simora.ai"
              className="login-logo"
              style={{
                background: "linear-gradient(to right, #7B3FF1, #4FACFE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            />
            {/* <h3
              className="login-logo"
              style={{
                color: "rgb(72 143 99)",
              }}
            >
              Vedant Sport Academy
            </h3> */}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-group">
              <FiMail className="input-icon" />
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <FiLock className="input-icon" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            className="login-button"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner">
                <span className="spinner"></span>
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" theme="light" />
    </div>
  );
};

export default Login;
