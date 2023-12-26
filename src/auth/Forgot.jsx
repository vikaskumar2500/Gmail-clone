import React, { useState } from "react";
import "./Forgot.css";
import { Button } from "react-bootstrap";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.log(error);
    } finally {
      setEmail("");
    }
  };

  return (
    <form id="forgot" className="forgot" onSubmit={handleSubmit}>
      <h5>Forgot Password</h5>
      <IconButton
        onClick={() => {
          navigate("/login");
        }}
      >
        <Close />
      </IconButton>

      <input
        type="email"
        id="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" variant="secondary" className="forgot-button">
        Forgot
      </Button>
    </form>
  );
};

export default Forgot;
