import React, { useState } from "react";
import img from "./images/TP_logo.png";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import UserService from './UserService';
import loadingImg from './images/loginload.svg'
import axios from "axios";

export default function UserLogin({ setIsAuthenticated, setUserRole }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    let isValid = true;
    if (!email) {
      setEmailError("*Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("*Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("*Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
        const response = await axios.post("http://localhost:8080/auth/signin", { email, password });
        const { statusCode, token, refreshToken, expirationTime, role } = response.data || {};

        if (statusCode === 200 && token) {
          localStorage.setItem("token", token);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("expirationTime", expirationTime);
          localStorage.setItem("role", role);
          localStorage.setItem("Email",email)

          setIsAuthenticated(true);
          setUserRole(role);

          console.log("Login successful. Role:", role);
          navigate(role === "ADMIN" ? "/admin-landingpage" : role === "USER" ? "/user-home" : "/check-home");
        } else {
            alert("Login failed. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again later.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div>
      <div className="header">
        <img src={img} alt="Login" />
        <h1>Transport Permit</h1>
      </div>
      <div className="line"></div>
      <div className="page">
        <div className="box pinkBox">
          <h1>Login</h1>
          <p className="registerText">New user?</p>
          <p className="registerText">Register now!</p>
          <br />
          <button onClick={() => navigate("/user-register")}>
            <b>Go to Register</b>
          </button>
        </div>
        <div className="box whiteBox">
          <h1 className="log">Login</h1>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && (
            <span style={{ color: "red", fontSize: "12px", display: "block" }}>
              {emailError}
            </span>
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && (
            <span style={{ color: "red", fontSize: "12px", display: "block" }}>
              {passwordError}
            </span>
          )}
      
          <button onClick={handleLogin} disabled={loading}>
            <b>{loading ? <img src={loadingImg}  alt="loadingPic"   style={{ width: "15px", height: "15px" }}/> : "Login"}</b>
          </button>
          <p>New User? <Link to="/user-register" style={{color:"Black"}}>Register Now</Link></p>
        </div>
      </div>
    </div>
  );
}
