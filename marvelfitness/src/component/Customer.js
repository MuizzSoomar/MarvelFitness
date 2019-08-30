import React, { Component } from "react";
import { Redirect } from "react-router";

class Customer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    handleCustomerClick = (e) => {
        console.log(this.props.customer)
        this.setState(() => {
            return {
                redirect: true
            }
        });
    };

    render() {
        if (this.state.redirect) {
            // ********uncomment when the customer profile page is ready*******
            // let link = "/customer/" + this.props.customer.customer_id;
            // return <Redirect push to={link} />;
        }
        return (

                <tr onClick={this.handleCustomerClick.bind(this)}>

                    <td>{this.props.customer.customer_id}</td>
                    <td>{this.props.customer.name}</td>

                </tr>

        )
    }
}

export default Customer
