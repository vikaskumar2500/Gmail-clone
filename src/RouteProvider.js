import React from "react";
import { Route, Routes, Navigate, useParams } from "react-router-dom";
import Dashbord from "./components/Dashbord/Dashbord";
import Details from "./components/Dashbord/Details/Details";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Forgot from "./auth/Forgot";
import EmailVerification from "./auth/EmailVerification";
import { useSelector } from "react-redux";

const RouteProvider = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { titleId } = useParams();
  console.log(titleId);
  return (
    <React.Fragment>
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Navigate to="/dashbord/inbox" />} />
          <Route path="dashbord" element={<Dashbord />} />
          <Route path="dashbord/:titleId" element={<Dashbord />} />
          <Route path="dashbord/:titleId/:Id" element={<Details />} />
          <Route path="/*" element={<Navigate to="/dashbord/inbox" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </React.Fragment>
  );
};

export default RouteProvider;
