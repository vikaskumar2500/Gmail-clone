import { IconButton } from "@mui/material";
import "./DetailsHeader.css";

import React from "react";
import {
  ArrowBackOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined,
  Delete,
  DeleteOutlined,
  MoreVert,
  Refresh,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

const DetailsHeader = () => {
  const navigate = useNavigate();
  const { titleId } = useParams();

  return (
    <div className="dashbord-header">
      <div className="dashbord-header__left">
        <IconButton onClick={() => navigate(`/dashbord/${titleId}`)}>
          <ArrowBackOutlined />
        </IconButton>
        <IconButton>
          <Refresh />
        </IconButton>
        <IconButton>
          <Delete/>
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

export default DetailsHeader;
