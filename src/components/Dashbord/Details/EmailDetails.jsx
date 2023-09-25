import React, { useState } from "react";
import "./EmailDetails.css";
import { IconButton } from "@mui/material";
import {
  ArrowDropDownOutlined,
  LaunchOutlined,
  MoreVert,
  PersonOutline,
  PrintOutlined,
  ReplyOutlined,
  StarOutline,
} from "@mui/icons-material";
import ContactDetails from "./ContactDetails";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DateDifference from "./DateDifference";
import GetRealTime from "../GetRealTime";

const EmailDetails = () => {
  const [show, setShow] = useState(false);

  const sentEmails = useSelector((state) => state.sent.sentEmails);
  const inboxEmails = useSelector((state) => state.inbox.inboxEmails);
  const { titleId, Id } = useParams();

  let mail = null;
  if (titleId === "inbox") {
    mail = inboxEmails.find((inboxEmail) => inboxEmail.id === Id);
  } else if (titleId === "sent") {
    mail = sentEmails.find((sentEmail) => sentEmail.id === Id);
  }

  const dateDifference = DateDifference(mail?.createdAt);
  const sentTime = GetRealTime(mail?.createdAt);

  return (
    <div className="mail-details">
      <div className="details">
        <div className="details__top">
          <div className="top-left">{mail?.subject}</div>
          <div className="top-right">
            <IconButton>
              <PrintOutlined />
            </IconButton>
            <IconButton>
              <LaunchOutlined />
            </IconButton>
          </div>
        </div>

        <div className="details__mid">
          <div className="mid-left">
            <span className="person">
              <PersonOutline />
            </span>
            <div className="mid-left__right">
              <span className="email-left">
                Email:{" "}
                <span>
                  {"<"}
                  {mail?.to}
                  {">"}
                </span>
              </span>
              <div className="email-right">
                <span>to me</span>
                <IconButton onClick={() => setShow((prev) => !prev)}>
                  <ArrowDropDownOutlined />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="mid-right">
            <span>
              {titleId === "sent" ? sentTime : mail?.createdAt}(
              {dateDifference.time} {dateDifference.type} ago)
            </span>
            <IconButton>
              <StarOutline />
            </IconButton>
            <IconButton>
              <ReplyOutlined />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>

        <div className="details__bottom">
          <span>{mail?.text}</span>
        </div>
      </div>
      {show && <ContactDetails mail={mail} />}
    </div>
  );
};

export default EmailDetails;
