import "./Compose.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import {
  CloseFullscreenOutlined,
  CloseSharp,
  MinimizeSharp,
  OpenInFullOutlined,
} from "@mui/icons-material";
import { EditorState } from "draft-js";
import { db } from "../../Firebase";
import { get, ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { sentEmailActions } from "../../store/sentEmailReducer";
import CurrentDate from "./CurrentDate";

const Compose = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);

  const sentEmails = useSelector((state) => state.sent.sentEmails);

  const emailInputRef = useRef();
  const subjectInputRef = useRef();

  const dispatch = useDispatch();

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const text = editorState.getCurrentContent().getPlainText();
    // console.log(text);

    const email = localStorage.getItem("userEmail");
    const updatedEmail = email
      .replaceAll("@gmail.com", "")
      .replaceAll(".", "")
      .replaceAll("_", "");

    const emailData = {
      id: uuidv4(),
      from: email,
      to: emailInputRef.current.value,
      subject: subjectInputRef.current.value,
      text: text,
      read: false,
      createdAt: CurrentDate(),
    };

    // dispatching sent email data!
    dispatch(sentEmailActions.addSentEmail(emailData));

    // const sentPostRef = push(ref(db, "sent/" + updatedEmail));
    // set(sentPostRef, emailData);
    set(ref(db, `sent/${updatedEmail}`), [emailData, ...sentEmails]);

    const recipientEmail = emailInputRef.current.value;

    const updatedRecipientEmail = recipientEmail
      .replaceAll("@gmail.com", "")
      .replaceAll(".", "")
      .replaceAll("_", "");

    get(ref(db, `inbox/${updatedRecipientEmail}`))
      .then((snapshot) => {
        const data = snapshot.val() || [];
        // console.log(data);
        set(ref(db, `inbox/${updatedRecipientEmail}`), [emailData, ...data])
          .then(() => {
            console.log("data sent successfully!!");
          })
          .then((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });

    props.onClick();
  };

  return (
    <div className="overlay">
      <form
        id="compose"
        className={open ? "compose open" : "compose"}
        onSubmit={formSubmitHandler}
      >
        <div className="compose__header">
          <span className="compose__header__left">Sent Message</span>
          <div className="compose__header__right">
            <MinimizeSharp
              onClick={() => {
                props.onClick();
              }}
            />
            {!open && <OpenInFullOutlined onClick={() => setOpen(true)} />}
            {open && <CloseFullscreenOutlined onClick={() => setOpen(false)} />}
            <CloseSharp
              onClick={() => {
                props.onClick();
              }}
            />
          </div>
        </div>
        <div className="compose__body">
          <div className="compose__recipients">
            <label htmlFor="email">
              {focused && "To "}
              <input
                formAction="true"
                id="email"
                type="email"
                ref={emailInputRef}
                placeholder={focused ? "" : "Recipients"}
                onFocus={() => setFocused(true)}
              />
            </label>

            {focused && <span>Cc Bcc</span>}
          </div>
          <div className="compose__subject">
            <input
              type="text"
              placeholder="Subject"
              ref={subjectInputRef}
              onFocus={() => setFocused(false)}
            />
          </div>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName={
              open ? "editorClassName editor__open" : "editorClassName"
            }
            onEditorStateChange={onEditorStateChange}
            onFocus={() => setFocused(false)}
          />
          <Button type="submit" variant="primary">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Compose;
