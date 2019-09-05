import React, { Component } from "react";
import ListService from "../service/ListService";
import "../styles/Profile.css";
import ListVisitsComponent from "../component/ListVisitsComponent.jsx";

const TEST_CUSTOMER_ID = 7;

// export default
class Profile extends Component {
  constructor(props) {
    super(props);
    this.refreshCustomer = this.refreshCustomer.bind(this);
    this.state = {
      user: props.customer
    };
  }

  componentDidMount() {
    this.refreshCustomer(this.state.user_id);
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

  render() {
    return (
      <div className="parent">
        <div className="firstRow">
          <div className="columnOne">
            <h2>Profile</h2>
            <div className="row">
              <label>Name:</label>
              <div className="entry">{this.state.user.name}</div>
            </div>
            <div className="row">
              <label>ID Number:</label>
              <div className="entry">{this.state.user.user_id}</div>
            </div>
            <div className="row">
              <label>Email:</label>
              <div className="entry">{this.state.user.email}</div>
            </div>
            <div className="row">
              <label>Phone Number:</label>
              <div className="entry">{this.state.user.phone_number}</div>
            </div>
            <div className="row">
              <label>Address:</label>
              <div className="entry">
                {this.state.user.street_one}
                {""} {this.state.user.street_two}
                {""} {this.state.user.city}
                {""} {this.state.user.state}
                {""} {this.state.user.zip}
              </div>
            </div>
            <div className="row">
              <label>Reward Balance:</label>
              <div className="entry">{this.state.user.rewards_balance}</div>
            </div>
          </div>
        </div>

        <div className="secondRow">
          <div className="secondRowHeader">
            <ListVisitsComponent></ListVisitsComponent>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
