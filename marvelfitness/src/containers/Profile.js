import React, { Component } from "react";
import CustomerListService from "../service/CustomerListService";
import "../styles/Profile.css";
import Visit from "../component/Visit.js";

const TEST_CUSTOMER_ID = 1;

// export default
class Profile extends Component {
  constructor(props) {
    super(props);
    this.refreshVisits = this.refreshVisits.bind(this);
    this.refreshCustomer = this.refreshCustomer.bind(this);
    this.state = {
      visitList: [],
      user: []
    };
  }

  componentDidMount() {
    this.refreshVisits();
    this.refreshCustomer(TEST_CUSTOMER_ID);
  }

  refreshVisits() {
    CustomerListService.getAllVisits().then(response => {
      this.setState(() => {
        return {
          visitList: response.data
        };
      });
    });
  }

  refreshCustomer(customer_id) {
    CustomerListService.getCustomerById(customer_id).then(response => {
      this.setState(() => {
        return {
          user: response.data
        };
      });
    });
  }

  render() {
    const visits = this.state.visitList
      .reverse()
      .map(visit => <Visit key={visit.visit_id} visit={visit} />);

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

          {/* <div className="columnTwo">
            <div className="columnTwoHeader">
              <h3>Calendar</h3>
            </div>
          </div> */}
        </div>

        <div className="secondRow">
          <div className="secondRowHeader">
            <h3>List View</h3>
            <div className="container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Customer ID</th>
                    <th>Visit ID</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>{visits}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
