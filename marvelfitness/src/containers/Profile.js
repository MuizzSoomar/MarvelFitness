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
      redirect: false,
    };
  }


  componentDidMount() {
    this.refreshCustomer(this.props.customer_id);
    this.refreshVisits();
  }

  refreshVisits() {
    ListService.getAllVisits().then(response => {
      this.refreshCustomer(this.props.customer.user_id);
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
        <Row>
          <Col sm={6} lg={8} />{" "}
          <Col sm={6} lg={4}>
            <Alert
              variant="warning"
              onClick={this.handleRewardsClick}
              className="reward"
            >
              {this.props.customer.name}'s Rewards Balance: $
              {this.props.customer.rewards_balance}
            </Alert>
          </Col>
        </Row>

        <div className="firstRow">
          <div className="columnOne">
            <h2>Profile</h2>
            <div className="row">
              <Col sm={2} lg={2}><label>Name:</label></Col>
              <Col sm={10} lg={10}><div className="entry">{this.props.customer.name}</div></Col>
            </div>
            <div className="row">
              <Col sm={2} lg={2}><label>ID Number:</label></Col>
              <Col sm={10} lg={10}><div className="entry">{this.props.customer.user_id}</div></Col>
            </div>
            <div className="row">
              <Col sm={2} lg={2}><label>Email:</label></Col>
              <Col sm={10} lg={10}><div className="entry">{this.props.customer.email}</div></Col>
            </div>
            <div className="row">
              <Col sm={2} lg={2}><label>Phone Number:</label></Col>
              <Col sm={10} lg={10}><div className="entry">{this.props.customer.phone_number}</div></Col>
            </div>
            <div className="row">
              <Col sm={2} lg={2}><label>Address:</label></Col>
              <Col sm={10} lg={10}><div className="entry">
                {this.props.customer.street_one}
                {""} {this.props.customer.street_two}
                {""} {this.props.customer.city}
                {""} {this.props.customer.state}
                {""} {this.props.customer.zip}
              </div></Col>
            </div>
          </div>
          <div className="columnTwo">
            <Col sm={7} lg={9} />{" "}
            <Col sm={7} lg={5}>
            </Col>
          </div>
        </div>

        <div className="secondRow">
          <div className="secondRowHeader">
            <ListVisitsComponent customer={this.props.customer}></ListVisitsComponent>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
