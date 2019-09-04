import React, { Component } from "react";
import { Link } from "react-router-dom";

class Visit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.visit.customer_id}</td>
        <td>{this.props.visit.visit_id}</td>
        <td>{this.props.visit.timestamp}</td>
      </tr>
    );
  }
}

export default Visit;
