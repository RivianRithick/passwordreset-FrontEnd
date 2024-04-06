// LoginPage.js
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style/Form.css";
const LoginPage = ({ SetUserName }) => {
  const [responseMsg, setResponseMsg] = useState("");
  const navigate = useNavigate();

  // formik
  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email address")
      .required("Email is Required"),
    password: Yup.string().min(8).required("Password is Required"),
  });

  const onSubmit = async (values) => {
    try {
      const res = await axios.post(
        "https://passwordreset-khmr.onrender.com/api/user/login",
        values
      );
      setResponseMsg(res.data.message);
      SetUserName(res.data.data.username);
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/home");
      }, 500);
    } catch (error) {
      setResponseMsg(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const [signUpMode, setSignUpMode] = useState(false);
  const toggleMode = () => {
    setSignUpMode((prevMode) => !prevMode);
    navigate("/");
  };
  return (
    <div class={`container ${signUpMode ? "sign-up-mode" : ""}`}>
      <div class="forms-container">
        <div class="signin-signup">
          <form onSubmit={formik.handleSubmit} class="sign-in-form">
            <h2 class="title">Sign in</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <div className="errors">
                <span className="text-danger">{formik.errors.email}</span>
              </div>
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your Password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <div className="errors">
                <span className="text-danger">{formik.errors.password}</span>
              </div>
            </div>
            <button type="submit" className="btn solid">
              Login
            </button>
            <div>
              <Link to="/forgot" className="text-danger">
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>Create Account?</h3>
            <button
              class="btn transparent"
              id="sign-up-btn"
              onClick={toggleMode}
            >
              Sign up
            </button>
          </div>
          <img src="/log.svg" class="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
