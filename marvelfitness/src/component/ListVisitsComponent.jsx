import React, { Component } from "react";
import ListService from "../service/ListService";
import { Redirect } from "react-router";
import BootstrapTable from "react-bootstrap-table-next";

const TEST_CUSTOMER_ID = 7;

class ListVisitsComponent extends Component {
  constructor(props) {
    super(props);
    this.refreshVisits = this.refreshVisits.bind(this);
    this.refreshCustomer = this.refreshCustomer.bind(this);
    this.state = {
      visitList: [],
      columns: [
        {
          dataField: "visit_id",
          text: "Visit ID"
        },
        {
          dataField: "timestamp",
          text: "Timestamp"
        },
        {
          dataField: "customer_id",
          text: "Customer ID"
        }
      ],
      redirect: false,
      selectedVisit: null
    };
  }

  componentDidMount() {
    this.refreshVisits(TEST_CUSTOMER_ID);
    this.refreshCustomer(TEST_CUSTOMER_ID);
  }

  refreshVisits(customer_id) {
    ListService.getVisitsByCustomer(customer_id).then(response => {
      this.setState(() => {
        return {
          visitList: response.data
        };
      });
    });
  }

  refreshCustomer(customer_id) {
    ListService.getCustomerById(customer_id).then(response => {
      this.setState(() => {
        return {
          customer: response.data
        };
      });
    });
  }

  render() {
    const visits = this.state.visitList.reverse();
    visits.forEach(element => {
      {
        element.timestamp = new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }).format(new Date(element.timestamp));
      }
    });
    return (
      <div className="container" id="visits">
        <h3>Visits</h3>
        <div className="container">
          <BootstrapTable
            keyField="visit_id"
            data={visits}
            columns={this.state.columns}
            bordered={false}
          />
        </div>
      </div>
    );
  }
}

export default ListVisitsComponent;
