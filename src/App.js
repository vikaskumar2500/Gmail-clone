import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import "./App.css";
import Auth from "./auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/AuthReducer";
import RouteProvider from "./RouteProvider";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    dispatch(authActions.login(isLoggedIn));
  }, [dispatch]);

  return (
    <React.Fragment>
      {isLoggedIn && (
        <>
          <Header />
          <div className="main">
            <SideBar />
            <RouteProvider />
          </div>
        </>
      )}
      {!isLoggedIn && <Auth />}
    </React.Fragment>
  );
};

export default App;
