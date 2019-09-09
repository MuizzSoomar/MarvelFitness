import React, { Component } from "react";
import ListService from "../service/ListService";
import "../styles/Profile.css";
import ListVisitsComponent from "../component/ListVisitsComponent.jsx";
import Col from "react-bootstrap/lib/Col";
import Alert from "react-bootstrap/lib/Alert";
import Row from "react-bootstrap/lib/Row";
import Redirect from "react-router-dom/Redirect";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoffee, faEdit} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/lib/Modal";
import Form from "react-bootstrap/lib/Form";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import Button from "react-bootstrap/lib/Button";

const TEST_CUSTOMER_ID = 7;

// export default
class Profile extends Component {
  constructor(props) {
    super(props);
    this.refreshCustomer = this.refreshCustomer.bind(this);
    this.state = {
      visitList: [],
      user: props.customer,
      redirect: false,
    };
  }


  componentDidMount() {
    this.refreshCustomer(this.state.user_id);
    this.refreshVisits();
  }

  refreshVisits() {
    ListService.getAllVisits().then(response => {
      this.refreshCustomer(this.state.user.user_id);
    });
  }

  refreshCustomer(customer_id) {
    ListService.getCustomerById(customer_id).then(response => {
      this.setState(() => {
        return {
          user: response.data
        };
      });
    });
  }

  handleRewardsClick = () => {
    this.setState(() => {
      return {
        redirect: true
      };
    });
  };

  render() {
    if (this.state.redirect) {
      // ********uncomment following lines when the customer profile page is ready*******
      let link = "/rewards";
      return <Redirect push to={link} />;
    }
    return (
      <div className="parent">
        <div className="firstRow">
          <div className="columnOne">
            <h2>Profile</h2>
            <div className="row">
              <Col lg={2}><label>Name:</label></Col>
              <Col lg={10}><div className="entry">{this.state.user.name}</div></Col>
            </div>
            <div className="row">
              <Col lg={2}><label>ID Number:</label></Col>
              <Col lg={10}><div className="entry">{this.state.user.user_id}</div></Col>
            </div>
            <div className="row">
              <label>Email:</label>
              <div className="entry">{this.state.user.username}</div>
            </div>
            <div className="row">
              <Col lg={2}><label>Phone Number:</label></Col>
              <Col lg={10}><div className="entry">{this.state.user.phone_number}</div></Col>
            </div>
            <div className="row">
              <Col lg={2}><label>Address:</label></Col>
              <Col lg={10}><div className="entry">
                {this.state.user.street_one}
                {""} {this.state.user.street_two}
                {""} {this.state.user.city}
                {""} {this.state.user.state}
                {""} {this.state.user.zip}
              </div></Col>
            </div>
          </div>
          <div className="columnTwo">
            <Col sm={7} lg={9} />{" "}
            <Col sm={7} lg={5}>
              <Alert
                variant="warning"
                onClick={this.handleRewardsClick}
                className="reward"
              >
                {this.props.customer.name}'s Rewards Balance: $
                {this.props.customer.rewards_balance}
              </Alert>
            </Col>
          </div>
        </div>

        <div className="secondRow">
          <div className="secondRowHeader">
            <ListVisitsComponent customer = {this.props.customer}></ListVisitsComponent>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
