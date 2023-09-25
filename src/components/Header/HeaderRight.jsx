import "./HeaderRight.css";
import { IconButton } from "@mui/material";
import {
  Settings,
  HelpOutline,
  Apps,
  AccountCircle,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthReducer";
import { sentEmailActions } from "../../store/sentEmailReducer";

const HeaderRight = () => {
  const dispatch = useDispatch();
  const logoutHandler=()=> {
    dispatch(authActions.logout());
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    dispatch(sentEmailActions.replaceSentEmails([]));
  }

  return (
    <div className="header-right">
      <IconButton>
        <HelpOutline />
      </IconButton>
      <IconButton>
        <Settings />
      </IconButton>
      <IconButton>
        <Apps />
      </IconButton>
      <IconButton onClick={logoutHandler}>
        <AccountCircle titleAccess="logout"/>
      </IconButton>
    </div>
  );
};

export default HeaderRight;
