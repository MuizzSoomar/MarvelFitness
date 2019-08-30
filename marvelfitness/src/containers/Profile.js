import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Container, Row, Col } from "reactstrap";
import "./Profile.css";

export default class Profile extends Component {
  render() {
    return (
      //   <div className="row">
      //     <div className="column">
      //       <ControlLabel>Calendar</ControlLabel>
      //     </div>
      //     <div className="middle">
      //       <ControlLabel>middle</ControlLabel>
      //     </div>
      //     <div className="right">
      //       <ControlLabel>right</ControlLabel>
      //     </div>

      //     {/* this column will contain the calendar */}
      //   </div>

      <Container>
        <Row className="justify-content-md-center">
          <Col lg>
            <ControlLabel>Profile</ControlLabel>
          </Col>
          <Col sm="8">
            Name:
            <Row>
              <Col sm="8">Email:</Col>
            </Row>
            <Row>
              <Col sm="8">Phone Number:</Col>
            </Row>
            <Row>
              <Col sm="8">Address:</Col>
            </Row>
          </Col>
          <Col lg>
            <ControlLabel>Calendar</ControlLabel>
          </Col>
        </Row>
      </Container>
    );
  }
}
