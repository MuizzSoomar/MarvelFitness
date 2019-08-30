import React, { Component } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Grid
} from "react-bootstrap";
import { Container, Row, Col } from "reactstrap";
import "./Profile.css";
import UserLoginService from "../service/UserLoginService";
import ListCustomersComponent from "../component/ListCustomersComponent";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.refreshCustomers = this.refreshCustomers.bind(this);
  }

  componentDidMount() {
    this.refreshCustomers();
  }

  refreshCustomers() {
    UserLoginService.getAllCustomers().then(response => {
      console.log(response);
    });
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col lg>
            <ControlLabel>Profile</ControlLabel>
          </Col>
          <Col sm="8">Name:</Col>
          <Col sm="8">
            ID Number:
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
