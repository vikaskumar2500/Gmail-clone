import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import "./Login.css";
import { IconButton } from "@mui/material";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../Firebase";
import { useDispatch } from "react-redux";
import { authActions } from "../store/AuthReducer";

const actionCodeSettings = {
  handleCodeInApp: true,
};

const Login = () => {
  const [hide, setHide] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => userCredential.user)
      .then((user) => {
        setLoading(false);
        setError(null);
        return user.emailVerified;
      })
      .then((verified) => {
        if (!verified) throw new Error("Please verify your email!");

        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userEmail", email);
        dispatch(authActions.login(true));
        navigate("/dashbord/inbox");

        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <form id="login" className="login" onSubmit={formSubmitHandler}>
      <h4>Login</h4>
      <span>Use your google account</span>
      <input
        type="email"
        id="email"
        placeholder="Email"
        ref={emailInputRef}
        required
      />

      <IconButton onClick={() => setHide((prev) => !prev)}>
        <img
          src={!hide ? "../assets/hide.png" : "../assets/visible.png"}
          alt="hide-logo"
          className="pass-logo"
        />
      </IconButton>
      <input
        type={!hide ? "password" : "text"}
        id="password"
        placeholder="Password"
        ref={passwordInputRef}
        required
      />

      <NavLink to={"/forgot"} className="forgot-button">
        Forgot password?
      </NavLink>
      <Button type="submit" variant="primary" className="login-button">
        {!loading ? "Login" : "Sending request..."}
      </Button>
      {error && <span className="error">{error}</span>}
      <div className="register-popup">
        Don't have account?<NavLink to="/register">Register</NavLink>
      </div>
    </form>
  );
};

export default Login;
