import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Container, Row, Col } from "reactstrap";
import CustomerListService from "../service/CustomerListService";
import "../styles/Profile.css";
import Visit from "../component/Visit.js";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.refreshVisits = this.refreshVisits.bind(this);
    this.state = {
      visitList: []
    };
  }

  componentDidMount() {
    this.refreshVisits();
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

  render() {
    const visits = this.state.visitList.map(visit => (
      <Visit key={visit.visit_id} visit={visit} />
    ));

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
