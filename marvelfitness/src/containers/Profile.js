import React, { Component } from "react";
import ListService from "../service/ListService";
import "../styles/Profile.css";
import ListVisitsComponent from "../component/ListVisitsComponent.jsx";

// export default
class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
            <ListVisitsComponent></ListVisitsComponent>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
