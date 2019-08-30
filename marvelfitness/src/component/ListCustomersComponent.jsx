import React, { Component } from "react";
import CustomerListService from "../service/CustomerListService";
import Customer from "./Customer.js"

class ListCustomersComponent extends Component {

    constructor(props) {
        super(props);
        this.refreshCustomers = this.refreshCustomers.bind(this)
        this.state= {
            customerList: []
        };
    }

    componentDidMount() {
      this.refreshCustomers();
    }

    refreshCustomers() {
      CustomerListService.getAllCustomers()
      .then(
        response => {
          this.setState(() => {
              return {
                customerList: response.data
              }
          });
        }
      )
    }

    render() {
        const customers = this.state.customerList.map(customer =>
            <Customer key={customer.customer_id} customer={customer}/>
        );

        return (
            <div className="container">
                <h3>Customers</h3>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListCustomersComponent
