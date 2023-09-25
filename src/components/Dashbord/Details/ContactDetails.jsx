import React from "react";
import "./ContactDetails.css";
import { Col, Row } from "react-bootstrap";

const ContactDetails = ({ mail }) => {
  const index = mail.from.indexOf("@");
  const mailedBy = mail.from.substring(index + 1);

  // Convert date strings to Date objects
  

  return (
    <div className="contact-overlay">
      <div className="contact-details">
        <Row className="row">
          <Col className="col" xs={4}>
            from:
          </Col>
          <Col>{mail.from}</Col>
        </Row>
        <Row className="row">
          <Col className="col" xs={4}>
            to:
          </Col>
          <Col>{mail.to}</Col>
        </Row>
        <Row className="row">
          <Col className="col" xs={4}>
            date:
          </Col>
          <Col>{mail.createdAt}</Col>
        </Row>
        <Row className="row">
          <Col className="col" xs={4}>
            subject:
          </Col>
          <Col>{mail.subject}</Col>
        </Row>
        <Row className="row">
          <Col className="col" xs={4}>
            mailed-by:
          </Col>
          <Col>{mailedBy}</Col>
        </Row>
      </div>
    </div>
  );
};

export default ContactDetails;
