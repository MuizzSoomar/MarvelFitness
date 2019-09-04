import React, { Component } from "react";
import RewardListService from "../service/RewardListService";
import CustomerListService from "../service/CustomerListService";
import { Redirect } from "react-router";
import BootstrapTable from 'react-bootstrap-table-next';
import Button from "react-bootstrap/lib/Button";
import Modal from "react-bootstrap/lib/Modal";
import Form from "react-bootstrap/lib/Form";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

class ListRewardsComponent extends Component {

    constructor(props) {
        super(props);
        this.refreshRewards = this.refreshRewards.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.state= {
            customer:{email:"fakeemail"},
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
    sendEmail = () => {
        this.closeModal();
        RewardListService.sendEmail(this.state.selectedReward.reward_id, this.state.customer.user_id)
            .then(
                response => {
                    console.log(response);
                }
            )
    };

    componentDidMount() {
        this.refreshRewards();
    }

    refreshRewards() {
        RewardListService.getAllRewards()
            .then(
                response => {
                    this.setState(() => {
                        return {
                            rewardList: response.data
                        }
                    });
                }
            )
        CustomerListService.getAllCustomers()
            .then(
                response => {
                    this.setState( () => {
                        return {
                            customer: response.data[0]
                        }
                    });
                    console.log(this.state.customer.user_id);
                }
            )
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
                this.openModal();
                this.setState({ selectedReward:row });
            }
        };
        return (
            <div className="container">
                <h3>Rewards</h3>
                <div className="container">
                    <BootstrapTable
                        keyField='reward_id'
                        data={this.state.rewardList}
                        columns={this.state.columns}
                        bordered={false}
                        selectRow={selectRow}
                        hover={true}
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
                        <Button variant="primary" onClick={this.sendEmail}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

export default ListRewardsComponent;