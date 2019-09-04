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
        <td>
          {new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          }).format(new Date(this.props.visit.timestamp))}
        </td>
      </tr>
    );
  }
}

export default Visit;
