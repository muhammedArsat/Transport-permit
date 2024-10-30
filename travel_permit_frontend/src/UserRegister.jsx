import React, { useState } from "react";
import img from "./images/TP_logo.png";
import "./css/LoginRegister.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  
  // Error state for validation
  const [nameError, setNameError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Validation function
  const validateInputs = () => {
    let isValid = true;

    if (!name) {
      setNameError("*Username is required.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!number) {
      setNumberError("*Phone number is required.");
      isValid = false;
    } else if (!/^\d{10}$/.test(number)) {
      setNumberError("Phone number must be 10 digits");
      isValid = false;
    } else {
      setNumberError("");
    }

    if (!email.trim()) {
      setEmailError("*Email is required.");
      isValid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      /[.\s]$/.test(email)
    ) {
      setEmailError(
        "Please enter a valid email address without trailing dots or spaces."
      );
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("*Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  // Static async registration function
  const register = async (email, password, phone, role) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        email,
        password,
        phone,
        role,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  // Handle registration
  const handleRegister = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const data = await register(email, password, number, role);
      
      if (data.statusCode === 200) {
        alert("Registration successful!");
        navigate("/");
      } else if (data.message === "User already registered") {
        alert("User already registered. Please log in.");
        navigate("/");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
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
          <h1>Register</h1>
          <p className="registerText">Already Registered?</p>
          <p className="registerText">Login now!</p>
          <br />
          <button variant="contained" onClick={() => navigate("/")}>
            <b>Go to Login </b>
          </button>
        </div>
        <div className="box whiteBox">
          <h1>Register</h1>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {nameError && <span style={{ color: "red", fontSize: "12px" }}>{nameError}</span>}

          <input
            type="text"
            id="number"
            name="ph_number"
            placeholder="Phone number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          {numberError && <span style={{ color: "red", fontSize: "12px" }}>{numberError}</span>}

          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <span style={{ color: "red", fontSize: "12px" }}>{emailError}</span>}

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <span style={{ color: "red", fontSize: "12px" }}>{passwordError}</span>}

          <button type="submit" onClick={handleRegister}>
            Register
          </button>

          <div className="media_register">
            <h4><br />Already Registered?</h4>
            <a href="/"><b>Login Now</b></a>
          </div>
        </div>
      </div>
    </div>
  );
}
