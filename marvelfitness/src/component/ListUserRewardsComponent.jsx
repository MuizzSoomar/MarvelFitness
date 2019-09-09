import React, { Component } from "react";
import ListService from "../service/ListService";
import { Redirect } from "react-router";
import BootstrapTable from "react-bootstrap-table-next";
import Button from "react-bootstrap/lib/Button";
import Modal from "react-bootstrap/lib/Modal";
import Form from "react-bootstrap/lib/Form";
import { ControlLabel, FormControl, FormGroup } from "react-bootstrap";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Alert from "react-bootstrap/lib/Alert";
import Container from "reactstrap/es/Container";
import { connect } from 'react-redux'
import "../styles/ListRewards.css";

class ListUserRewardsComponent extends Component {

    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.redeemReward = this.redeemReward.bind(this);
        this.refreshRewards = this.refreshRewards.bind(this);
        this.refreshCustomer = this.refreshCustomer.bind(this);
        this.state= {
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
        ListService.sendEmail(this.state.selectedReward.reward_id, this.props.user.id).then(
            response => {
            });

        let new_balance = Number(this.props.user.rewards) - Number(this.state.selectedReward.value);
        ListService.updateBalance(new_balance, this.props.user.id).then(
            response => {
                this.refreshCustomer(this.props.user.id)
            });
    };

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
                    this.props.updateCustomer(response.data)
                }
            );
    }

  componentDidMount() {
    this.refreshCustomer(this.props.user.id);
    this.refreshRewards();
  }

  validateForm() {
    return true;
  }

    render() {

        const selectRow = {
            clickToSelect: true,
            hideSelectColumn: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                if(row.value <= this.props.user.rewards){
                    this.openModal();
                    this.setState({ selectedReward:row });
                }
            }
        };
        const rowClasses = (row, rowIndex) => {
            if(row.value <= this.props.user.rewards){
                return 'inBudget';
            } else {
                return 'outOfBudget';
            }
        };
        return (
            <div className="container">
                <Row><Col sm={6} lg={8} /> <Col sm={6} lg={4}>
                <Alert variant='warning'>
                    {this.props.user.name}'s Rewards Balance: ${this.props.user.rewards}
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
                        <Modal.Title className="modalText">{"Redeem "+ this.state.selectedReward.name + " Reward"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormGroup controlId="email" bsSize="medium">
                                <ControlLabel className="modalText">Confirm Email to Redeem Reward</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="email"
                                    value={this.props.user.username}
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

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ListUserRewardsComponent);
