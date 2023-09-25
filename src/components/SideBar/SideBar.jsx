import { useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import "./SideBar.css";
import {
  Add,
  Delete,
  Drafts,
  ExpandMore,
  FindInPage,
  Inbox,
  Label,
  LabelImportant,
  Send,
  StarRate,
  WatchLater,
} from "@mui/icons-material";
import React from "react";
import SideBarTool from "./SideBarTool";
import Compose from "../Compose/Compose";
import { useSelector } from "react-redux";

const SideBar = (props) => {
  const [showCompose, setShowCompose] = useState(false);

  const sentEmails = useSelector((state) => state.sent.sentEmails);
  const inboxEmails = useSelector((state) => state.inbox.inboxEmails);
  
  const tools = useMemo(() => [
    { Icon: Inbox, title: "Inbox", count: 300 },
    { Icon: StarRate, title: "Starred", count: 0 },
    { Icon: WatchLater, title: "Snoozed", count: 0 },
    { Icon: Send, title: "Sent", count: 0 },
    { Icon: LabelImportant, title: "Important", count: 0 },
    { Icon: Drafts, title: "Draft", count: 0 },
    { Icon: Label, title: "Category", count: 0 },
    { Icon: Delete, title: "Bin", count: 0 },
    { Icon: FindInPage, title: "Documents", count: 0 },
    { Icon: ExpandMore, title: "More" },
  ], []);
  
  tools[0].count = inboxEmails.length;
  tools[3].count = sentEmails.length;

  const onClickHandler = () => {
    setShowCompose(false);
  };

  return (
    <div className="side-bar">
      <Button
        variant="light"
        className="compose-btn"
        onClick={() => {
          setShowCompose((prev) => !prev);
        }}
      >
        <Add />
        Compose
      </Button>
      {tools.map((tool) => (
        <SideBarTool
          key={tool.title}
          Icon={tool.Icon}
          title={tool.title}
          count={tool.count}
        />
      ))}
      {showCompose && <Compose onClick={onClickHandler} />}
    </div>
  );
};

export default SideBar;
