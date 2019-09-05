import React, { Component } from "react";
import ListService from "../service/ListService";
import { Redirect } from "react-router";
import BootstrapTable from 'react-bootstrap-table-next';


class ListCustomersComponent extends Component {

    constructor(props) {
        super(props);
        this.refreshCustomers = this.refreshCustomers.bind(this);
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
        ListService.getAllCustomers()
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
        console.log(this.props)
        const selectRow = {
            clickToSelect: true,
            hideSelectColumn: true,
            mode: 'radio',
            onSelect: (row, isSelect, rowIndex, e) => {
                this.props.updateCustomer(row);
                this.setState(() => {
                    return {
                        redirect: true,
                        selectedCustomer: row
                    }
                });
            }
        };
        if (this.state.redirect) {
            // ********uncomment following lines when the customer profile page is ready*******
            // let link = "/customer/" + this.state.selectedCustomer.user_id;
            // return <Redirect push to={link} />;
        }
        return (
            <div className="container">
                <h3>Customers</h3>
                <div className="container">
                    <BootstrapTable
                        keyField='user_id'
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
