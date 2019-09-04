import React, { Component } from "react";
import CustomerListService from "../service/CustomerListService";
import { Redirect } from "react-router";
import BootstrapTable from 'react-bootstrap-table-next';


class ListCustomersComponent extends Component {

    constructor(props) {
        super(props);
        this.refreshCustomers = this.refreshCustomers.bind(this)
        this.state= {
            customerList: [],
            columns: [{
                dataField: 'user_id',
                text: 'ID'
            }, {
                dataField: 'name',
                text: 'Name'
            }],
            redirect: false,
            selectedCustomer: null
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
        const selectRow = {
            clickToSelect: true,
            hideSelectColumn: true,
            mode: 'radio',
            onSelect: (row, isSelect, rowIndex, e) => {
                this.setState(() => {
                    return {
                        redirect: true,
                        selectedCustomer: rowIndex
                    }
                });
            }
        };
        if (this.state.redirect) {
            // ********uncomment following lines when the customer profile page is ready*******
            // let link = "/customer/" + this.state.customerList[this.state.selectedCustomer].user_id;
            // return <Redirect push to={link} />;
        }
        return (
            <div className="container">
                <h3>Customers</h3>
                <div className="container">
                    <BootstrapTable
                        keyField='id'
                        data={this.state.customerList}
                        columns={this.state.columns}
                        bordered={false}
                        selectRow={ selectRow }
                    />
                </div>
            </div>
        )
    }

}

export default ListCustomersComponent;
