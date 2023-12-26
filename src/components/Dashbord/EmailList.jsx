import {
  CheckBoxOutlineBlank,
  DeleteOutlined,
  StarBorderOutlined,
} from "@mui/icons-material";
import "./EmailList.css";

import React, { useEffect } from "react";
import { IconButton } from "@mui/material";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { get, ref, set, update } from "firebase/database";
import { db } from "../../Firebase";
import { useDispatch, useSelector } from "react-redux";
import { sentEmailActions } from "../../store/sentEmailReducer";
import { inboxEmailActions } from "../../store/inboxEmailReducer";
import GetRealTime from "./GetRealTime";

const EmailList = () => {
  const { titleId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sentEmails = useSelector((state) => state.sent.sentEmails);
  const inboxEmails = useSelector((state) => state.inbox.inboxEmails);

  let mails = [];
  if (titleId === "inbox") mails = [...inboxEmails];
  else if (titleId === "sent") mails = [...sentEmails];

  const email = localStorage.getItem("userEmail");
  const updatedEmail = email
    .replaceAll("@gmail.com", "")
    .replaceAll(".", "")
    .replaceAll("_", "");

  useEffect(() => {
    get(ref(db, `sent/${updatedEmail}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val() || [];
          dispatch(sentEmailActions.replaceSentEmails(data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, updatedEmail]);

  useEffect(() => {
    get(ref(db, `inbox/${updatedEmail}`))
      .then((snapshot) => {
        const data = snapshot.val() || [];
        dispatch(inboxEmailActions.replaceInboxEmails(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, updatedEmail]);

  const deleteButtonHandler = (event, mail) => {
    event.stopPropagation();

    if (titleId === "inbox") {
      dispatch(inboxEmailActions.deleteInboxEmail(mail?.id));

      const updatedEmail = mail?.to
        .replaceAll("@gmail.com", "")
        .replaceAll(".", "")
        .replaceAll("_", "");

      const updatedInboxEmails = inboxEmails.filter(
        (inboxEmail) => inboxEmail.id !== mail.id
      );

      set(ref(db, `inbox/${updatedEmail}`), [...updatedInboxEmails])
        .then(() => console.log("sent inbox data Successfull"))
        .catch((error) => console.log(error));
    } else if (titleId === "sent") {
      dispatch(sentEmailActions.deleteSentEmail(mail?.id));

      const updatedEmail = mail?.from
        .replaceAll("@gmail.com", "")
        .replaceAll(".", "")
        .replaceAll("_", "");

      const updatedSentEmails = sentEmails.filter(
        (sentEmail) => sentEmail.id !== mail.id
      );

      set(ref(db, `sent/${updatedEmail}`), [...updatedSentEmails])
        .then(() => console.log("sent inbox data Successfull"))
        .catch((error) => console.log(error));
    }
  };

  const clickHandler = (mail) => {
    if (!mail.read && titleId === "inbox") {
      const updatedInboxEmail = mail?.to
        .replace("@gmail.com", "")
        .replaceAll(".", "")
        .replaceAll("_", "");
      const inboxEmailIndex = inboxEmails.findIndex(
        (inboxEmail) => inboxEmail.id === mail.id
      );
      const newMail = { ...mail, read: true };
      update(ref(db, `inbox/${updatedInboxEmail}/${inboxEmailIndex}`), newMail)
        .then(() => console.log("updated successful!"))
        .catch((error) =>
          console.log(
            "something wrong with the update inbox email",
            error.message
          )
        );
    }

    navigate(`${pathname}/${mail?.id}`);
  };

  return (
    <React.Fragment>
      {mails.map((mail) => (
        <Row
          key={mail?.id}
          className="email-list"
          onClick={clickHandler.bind(null, mail)}
        >
          <Col className="email-list__left">
            <IconButton>
              <CheckBoxOutlineBlank />
            </IconButton>
            {titleId === "inbox" && !mail.read && (
              <div className="read">🔵</div>
            )}
            <span className="email__name">
              {titleId === "sent" ? mail?.to : mail?.from}
            </span>
          </Col>

          <Col className="email-list__mid">
            <IconButton>
              <StarBorderOutlined />
            </IconButton>
            <span className="subject">{mail?.subject}</span> -
            <span className="text">{mail?.text}</span>
          </Col>
          <Col className="email-list__right">
            <IconButton
              className="delete-button"
              onClick={(event) => deleteButtonHandler(event, mail)}
            >
              <DeleteOutlined />
            </IconButton>
            <div className="time">{GetRealTime(mail?.createdAt)}</div>
          </Col>
          <Outlet />
        </Row>
      ))}
    </React.Fragment>
  );
};

export default EmailList;
