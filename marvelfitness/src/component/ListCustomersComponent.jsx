import React, { Component } from "react";
import UserLoginService from "../service/UserLoginService";

class ListCustomersComponent extends Component {
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
      <div className="container">
        <h3>All Courses</h3>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Learn Full stack with Spring Boot and Angular</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListCustomersComponent;
