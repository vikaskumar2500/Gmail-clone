import { Inbox } from "@mui/icons-material";
import "./SideBarTool.css";
import { Col, Row } from "react-bootstrap";

import React from "react";
import { NavLink } from "react-router-dom";

const SideBarTool = ({ Icon = { Inbox }, title = "Inbox", count = 223 }) => {
  return (
    <NavLink to={`dashbord/${title.toLowerCase()}`} className="tools">
      <Row className="side-bar-tool">
        <Col xs={1}>
          <Icon />
        </Col>
        <Col xs={6} className="title">
          {title}
        </Col>
        <Col className="count">{count}</Col>
      </Row>
    </NavLink>
  );
};

export default React.memo(SideBarTool);
