import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Sb.css";

import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("role");
    window.location.href = "/"; // Redirect to the login page
  };

  const [isSidebarOpen, SetSidebarOpen] = useState(false);

  const toggleSideBar = () => {
    SetSidebarOpen(!isSidebarOpen);
  };
  const [isTakkal, setTakkal] = useState(false);
  useEffect(() => {
    const checkTime = () => {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();

      if (currentHour >= 11 && currentHour < 12) {
        setTakkal(true);
      } else {
        setTakkal(false);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div>
      <div className="sb-mob">
        <div className="sb-header">Transport Website</div>
        <div className="sb-menu" onClick={toggleSideBar}>
          &#9776;
        </div>
      </div>

      <div className={`sb ${isSidebarOpen ? "open" : ""}`}>
        <h3>Transport Permit</h3>
        <ul>
          {/* {
        role === "USER" &&(
        
        )
     
       }  */}
          {role === "USER" && (
            <>
              <a href="/user-home">
                <li>Home</li>
              </a>
              <a href="/user-form">
                <li>Normal Application</li>
              </a>
              {isTakkal ? (
            <Link to={`/takal-form`}><li>Takkaal Form</li></Link>
          ) : (
            <li style={{ color: "gray" }}>Takkal Form (only open between 11 am to 12 pm)</li>
          )}
              <a href="/user-dashboard">
                <li>Dashboard</li>
              </a>
            </>
          )}
          {role === "ADMIN" && (
            <>
              <a href="/admin-landingpage">
                <li>Home</li>
              </a>

              <a href="/takkal-pending">
                <li>Tatkkal List</li>
              </a>
              <a href="/admin-approve">
                <li>Pending Lists</li>
              </a>
              <a href="/approved-list">
                <li>Approved List</li>
              </a>
              <a href="/passed-list">
                <li>Passed List</li>
              </a>
            </>
          )}

          {role === "VERIFIER" && (
            <>
             <a href="/check-home">
                <li>Home</li>
              </a>
              <a href="/check-verify">
                <li>Pending Lists</li>
              </a>
            </>
          )}

          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
