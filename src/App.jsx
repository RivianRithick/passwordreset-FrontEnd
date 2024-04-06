import React, { useState } from "react";
import RegisterPage from "./Components/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import ForgetPassword from "./Components/ForgetPassword";
import ResetPassword from "./Components/ResetPassword";
import HomePage from "./Components/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const [username, SetUserName] = useState("");
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route
            path="/login"
            element={<LoginPage SetUserName={SetUserName} />}
          />
          <Route path="/forgot" element={<ForgetPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/home" element={<HomePage username={username} />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
