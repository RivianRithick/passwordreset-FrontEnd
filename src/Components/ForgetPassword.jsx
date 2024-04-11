import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Style/Form.css";
const ForgetPassword = () => {
  const [responseMsg, setResponseMsg] = useState("");
  const navigate = useNavigate();
  const initialValues = { email: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email address")
      .required("Email is Required"),
  });

  const onSubmit = async (values) => {
    try {
      const res = await axios.post(
        "https://passwordreset-khmr.onrender.com/api/user/forgotpassword",
        values
      );
      setResponseMsg(res.data.message);
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.log(error);
      setResponseMsg(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const handleClick = () => {
    navigate("/login");
  };
  const SignupClick = () => {
    navigate("/");
  };
  return (
    <div class="container">
      <div className="forms-container">
        <div class="signin-signup">
          <form onSubmit={formik.handleSubmit} class="sign-in-form">
            <h2 class="title">Forget Password</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input
                type="email"
                class="form-control"
                id="email"
                aria-describedby="emailHelp"
                required
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Enter your email"
              />
              <div className="errors">
                <span className="text-danger">{formik.errors.email}</span>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div class="content">
              <h3>Forgot Password?</h3>
              <p>
                Enter your email-id to reset your password. We'll send you a
                password reset link to your email.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgetPassword;
