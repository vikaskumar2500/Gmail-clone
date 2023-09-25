import React from "react";
import "./Forgot.css";
import { Button } from "react-bootstrap";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const navigate = useNavigate();
  return (
    <form id="forgot" className="forgot">
      <h5>Forgot Password</h5>
      <IconButton
        onClick={() => {
          navigate("/login");
        }}
      >
        <Close />
      </IconButton>

      <input type="email" id="email" placeholder="Email" />
      <Button type="submit" variant="secondary" className="forgot-button">
        Forgot
      </Button>
    </form>
  );
};

export default Forgot;
