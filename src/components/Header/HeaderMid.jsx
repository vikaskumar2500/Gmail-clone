import { useState } from "react";
import { IconButton } from "@mui/material";
import "./HeaderMid.css";
import { ExpandMore, Search } from "@mui/icons-material";

const HeaderMid = () => {
  const [focus, setFocus] = useState(false);

  return (
    <div className={focus ? "header-mid focus" : "header-mid"}>
      <IconButton>
        <Search />
      </IconButton>
      <input
        type="text"
        placeholder="Search mail"
        onInput={() => {
          setFocus(true);
        }}
        onClick={() => setFocus(true)}
        onMouseLeave={() => {
          setFocus(false);
        }}
      />
      <IconButton>
        <ExpandMore />
      </IconButton>
    </div>
  );
};

export default HeaderMid;
