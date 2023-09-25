import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import "./Register.css";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../Firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

const Register = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hide1, setHide1] = useState(false);
  const [hide2, setHide2] = useState(false);

  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const email = emailInputRef.current.value;
      const password = passwordInputRef.current.value;
      const confirmPass = confirmPasswordInputRef.current.value;
      if (password.trim() !== confirmPass.trim()) {
        setError("Your password doesn't match");
        setLoading(false);
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log(await userCredential);
      const { user } = userCredential;
      console.log(user);
      if (user) {
        // sending the email verification link to the email so that we can verify it!!F
        sendEmailVerification(user);
        navigate("/email-verification");
      }

      emailInputRef.current.value = "";
      passwordInputRef.current.value = "";
      confirmPasswordInputRef.current.value = "";
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  console.log(error);
  return (
    <form id='signup' className="register" onSubmit={formSubmitHandler}>
      <span>Create a Google Account</span>

      <input
        type="email"
        id="email"
        placeholder="Email"
        ref={emailInputRef}
        required
      />

      <IconButton
        className="pass-visible"
        onClick={() => setHide1((prev) => !prev)}
      >
        <img
          src={!hide1 ? "../assets/hide.png" : "../assets/visible.png"}
          alt="hide-logo"
          className="pass-logo"
        />
      </IconButton>

      <input
        type={!hide1 ? "password" : "text"}
        id="password"
        placeholder="Password"
        ref={passwordInputRef}
        required
      />

      <IconButton
        className="confirm-pass-visible"
        onClick={() => setHide2((prev) => !prev)}
      >
        <img
          src={!hide2 ? "../assets/hide.png" : "../assets/visible.png"}
          alt="hide-logo"
          className="confirm-pass-logo"
        />
      </IconButton>

      <input
        type={!hide2 ? "password" : "text"}
        id="confirm-password"
        placeholder="Confirm password"
        ref={confirmPasswordInputRef}
        required
      />

      <Button type="submit" variant="primary" className="register-button">
        {!loading ? "register" : "Sending request..."}
      </Button>
      {error && <div className="error">{error}</div>}
      <div className="login-popup">
        Already have an account?<NavLink to="/login">Login</NavLink>
      </div>
    </form>
  );
};

export default Register;
