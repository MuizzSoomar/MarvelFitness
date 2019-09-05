import React, { Component } from "react";
import ListService from "../service/ListService";
import "../styles/Profile.css";
import Visit from "../component/Visit.js";

// export default
class Profile extends Component {
  constructor(props) {
    super(props);
    this.refreshVisits = this.refreshVisits.bind(this);
    this.state = {
<<<<<<< Updated upstream
      visitList: []
=======
      user: props.customer
>>>>>>> Stashed changes
    };
  }

  componentDidMount() {
<<<<<<< Updated upstream
    this.refreshVisits();
  }

  refreshVisits() {
    ListService.getAllVisits().then(response => {
=======
    this.refreshCustomer(this.state.user_id);
  }


  refreshCustomer(customer_id) {
    ListService.getCustomerById(customer_id).then(response => {
>>>>>>> Stashed changes
      this.setState(() => {
        return {
          visitList: response.data
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
            </div>
            <div className="row">
              <label>ID Number:</label>
            </div>
            <div className="row">
              <label>Email:</label>
            </div>
            <div className="row">
              <label>Phone Number:</label>
            </div>
            <div className="row">
              <label>Address:</label>
            </div>
            <div className="row">
              <label>Reward Balance:</label>
            </div>
          </div>

          <div className="columnTwo">
            <div className="columnTwoHeader">
              <h3>Calendar</h3>
            </div>
          </div>
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
