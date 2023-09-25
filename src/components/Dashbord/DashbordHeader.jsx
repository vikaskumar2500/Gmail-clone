import { IconButton } from "@mui/material";
import "./DashbordHeader.css";

import React from "react";
import {
  ArrowDropDown,
  CheckBoxOutlineBlank,
  ChevronLeftOutlined,
  ChevronRightOutlined,
  MoreVert,
  Refresh,
} from "@mui/icons-material";

const DashbordHeader = () => {
  return (
    <div className="dashbord-header">
      <div className="dashbord-header__left">
        <IconButton>
          <CheckBoxOutlineBlank />
          {/* <CheckBoxOutlined /> */}
          <ArrowDropDown />
        </IconButton>
        <IconButton title="Refresh" onClick={() => window.location.reload()}>
          <Refresh />
        </IconButton>
        <IconButton>
          <MoreVert />
        </IconButton>
      </div>
      <div className="dashbord-header__right">
        <div>1 - 50 of 10,235</div>
        <IconButton>
          <ChevronLeftOutlined />
        </IconButton>
        <IconButton>
          <ChevronRightOutlined />
        </IconButton>
      </div>
    </div>
  );
};

export default DashbordHeader;
