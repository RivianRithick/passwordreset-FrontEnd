import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Style/HomePage.css";
const HomePage = ({ username }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/login");
  };
  return (
    <div className=" box-container d-flex justify-content-center">
      <div class="card" style={{ width: "50rem" }}>
        <div class="card-body">
          <h1 class="card-title text-center">Hello {username} !</h1>
          <p class="card-text text-center">
            Welcome to Password Reset Application
          </p>
          <div className="d-flex justify-content-center">
            <button className="btn btn-danger" onClick={handleSubmit}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
