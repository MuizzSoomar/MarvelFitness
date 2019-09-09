import React, { Component } from "react";
import ListService from "../service/ListService";
import { Redirect } from "react-router";
import BootstrapTable from 'react-bootstrap-table-next';
import Button from "react-bootstrap/lib/Button";
import Modal from "react-bootstrap/lib/Modal";
import Form from "react-bootstrap/lib/Form";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Alert from "react-bootstrap/lib/Alert";
import Container from "reactstrap/es/Container";
import "../styles/ListRewards.css";

class ListRewardsComponent extends Component {

    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.redeemReward = this.redeemReward.bind(this);
        this.refreshRewards = this.refreshRewards.bind(this);
        this.refreshCustomer = this.refreshCustomer.bind(this);
        console.log(props);
        this.state= {
            customer: this.props.customer,
            rewardList: [],
            columns: [{
                dataField: 'reward_id',
                text: 'Reward ID'
            }, {
                dataField: 'name',
                text: 'Value'
            }, {
                dataField: 'description',
                text: 'Description'
            }],
            redirect: false,
            selectedReward: 1,
            showModal: false
        };
    }

    closeModal = () => {
        this.setState({ showModal: false });
    };
    openModal = () => {
        this.setState({ showModal: true });
    };
    redeemReward = () => {
        this.closeModal();
        ListService.sendEmail(this.state.selectedReward.reward_id, this.state.customer.user_id).then(
            response => {
            });

        let new_balance = Number(this.state.customer.rewards_balance) - Number(this.state.selectedReward.value);
        console.log(`new balance: ${new_balance}`)
        ListService.updateBalance(new_balance, this.state.customer.user_id).then(
            response => {
                this.refreshCustomer(this.state.customer.user_id);
                this.refreshCustomer(this.state.customer.user_id).then(
                    this.props.updateCustomer(this.state.customer)
                );
            });
        console.log(`was customer updated? ${this.props.customer.rewards_balance}`)
    };

    componentDidMount() {
        this.refreshCustomer(this.state.customer.user_id);
        this.refreshRewards();
    }

    refreshRewards() {
        ListService.getAllRewards()
            .then(
                response => {
                    this.setState(() => {
                        return {
                            rewardList: response.data
                        }
                    });
                }
            )
    }

    refreshCustomer(customer_id){
        ListService.getCustomerById(customer_id)
            .then(
                response => {
                    this.setState (() => {
                        return {
                            customer:response.data
                        }
                    })
                }
            );
    }

    validateForm() {
        return true;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
    };

    render() {
        const selectRow = {
            clickToSelect: true,
            hideSelectColumn: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                console.log(row);
                if(row.value <= this.state.customer.rewards_balance){
                    this.openModal();
                    this.setState({ selectedReward:row });
                }
            }
        };
        const rowClasses = (row, rowIndex) => {
            if(row.value <= this.state.customer.rewards_balance){
                return 'inBudget';
            } else {
                return 'outOfBudget';
            }
        };

        return (
            <div className="container">
                <Row><Col sm={6} lg={8} /> <Col sm={6} lg={4}>
                <Alert variant='warning'>
                    {this.state.customer.name}'s Rewards Balance: ${this.state.customer.rewards_balance}
                </Alert></Col></Row>

                <h3>Rewards</h3>
                <div className="container">
                    <BootstrapTable
                        keyField='reward_id'
                        data={this.state.rewardList}
                        columns={this.state.columns}
                        bordered={false}
                        selectRow={selectRow}
                        rowClasses={ rowClasses }
                    />
                </div>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{"Redeem "+ this.state.selectedReward.name + " Reward"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormGroup controlId="email" bsSize="medium">
                                <ControlLabel>Confirm Email to Redeem Reward</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="email"
                                    value={this.state.customer.email}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.redeemReward}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

export default ListRewardsComponent;