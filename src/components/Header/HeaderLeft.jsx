import "./HeaderLeft.css";
import { IconButton } from "@mui/material";
import { Reorder } from "@mui/icons-material";
const HeaderLeft = () => {
  return (
    <div className="header__left">
      <div className="header-left__reorder">
        <IconButton>
          <Reorder />
        </IconButton>
      </div>
      <div className="header-left__logo">
        <img src="../../assets/gmail.png" alt="Gmail-logo" />
      </div>
      <div className="header-left__text">
        <span>Gmail</span>
      </div>
    </div>
  );
};

export default HeaderLeft;
