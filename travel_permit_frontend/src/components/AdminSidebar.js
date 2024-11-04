import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import { FaClipboardList } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

import "../css/Sb.css";


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
                <li>Home    <FaHome className="nav-icons"/>
               
                </li>
              </a>
              <a href="/user-form">
                <li>Normal Form <FaWpforms  className="nav-icons"/></li>
              </a>
              {isTakkal ? (
            <Link to={`/takal-form`}><li>Takkaal Form <FaClipboardList className="nav-icons"/></li></Link>
          ) : (
            <li style={{ color: "gray" }}>Takkal Form (only open between 11 am to 12 pm)<FaClipboardList className="nav-icons"/></li>
          )}
              <a href="/user-dashboard">
                <li>Dashboard <MdSpaceDashboard className="nav-icons"/></li>
              </a>
              <a href="user-profile">
                <li>Profile</li>
              </a>
            </>
          )}
          {role === "ADMIN" && (
            <>
              <a href="/admin-landingpage">
                <li>Home  <FaHome className="nav-icons"/></li>
              </a>

              <a href="/takkal-pending">
                <li>Tatkkal List <FaClipboardList className="nav-icons"/></li>
              </a>
              <a href="/admin-approve">
                <li>Pending Lists<FaWpforms  className="nav-icons"/></li>
              </a>
              <a href="/approved-list">
                <li>Approved List <TiTick className="nav-icons"/></li>
              </a>
              <a href="/passed-list">
                <li>Passed List<TiTick className="nav-icons"/></li>
              </a>
            </>
          )}

          {role === "VERIFIER" && (
            <>
             <a href="/check-home">
             <li>Home  <FaHome className="nav-icons"/></li>
              </a>
              <a href="/check-verify">
                <li>Pending Lists<FaWpforms  className="nav-icons"/></li>
              </a>
            </>
          )}

          <li onClick={handleLogout}>Logout <SlLogout className="nav-icons"/></li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
