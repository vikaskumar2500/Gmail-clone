import React, { useEffect } from "react";
import "./EmailVerification.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";

const EmailVerification = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(auth?.currentUser);
    const timeOutId = setTimeout(() => {
      if (auth?.currentUser.emailVerified) {
        navigate("/dashbord/inbox");
      } else window.location.reload();
    }, 3e3);

    // cleanup function
    return () => clearTimeout(timeOutId);
  }, [navigate]);

  return (
    <div className="email-verification">
      <h5>Email Verification Pending...</h5>
      <div>We have send you link to your email, please check your email!</div>
    </div>
  );
};

export default EmailVerification;
