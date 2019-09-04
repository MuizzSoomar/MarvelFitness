import React, { Component } from "react";
import RewardListService from "../service/RewardListService";
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
            customer:props.customer,
            rewardList: [],
            columns: [{
                dataField: 'name',
                text: 'Value'
            }, {
                dataField: 'description',
                text: 'Description'
            }],
            redirect: false,
            selectedReward: null,
            showModal: false
        };
    }

    closeModal = () => {
        this.setState({ showModal: false });
    };
    openModal = () => {
        this.setState({ showModal: true });
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
                this.setState({ selectedReward:row.name });
                console.log(row.name);
            }
        };
        const rowEvents = {

        }
        return (
            <div className="container">
                <h3>Rewards</h3>
                <div className="container">
                    <BootstrapTable
                        keyField='name'
                        data={this.state.rewardList}
                        columns={this.state.columns}
                        bordered={false}
                        selectRow={selectRow}
                        hover={true}
                        rowEvents={ rowEvents }
                    />
                </div>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{"Redeem "+ this.state.selectedReward + " Reward"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormGroup controlId="email" bsSize="medium">
                                <ControlLabel>Confirm Email to Redeem Reward</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.closeModal}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

export default ListRewardsComponent;