import React, { Component } from "react";
import { Link } from "react-router-dom";

class Customer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.customer.customer_id}</td>
        <td>{this.props.customer.name}</td>
      </tr>
    );
  }
}

export default Customer;
