import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import AuthenticationService from '../service/AuthenticationService';
import "../styles/Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "marvelfitness@mailinator.com",
      password: "marvelfitness",
      hasLoginFailed: false,
      showSuccessMessage: false
    };

    this.handleChange = this.handleChange.bind(this)
    this.loginClicked = this.loginClicked.bind(this)
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    this.loginClicked();
    event.preventDefault();
  };

  loginClicked() {
        // if(this.state.username==='marvelfitness@mailinator.com' && this.state.password==='marvelfitness'){
        //     // AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
        //     this.setState({showSuccessMessage:true})
        //     this.setState({hasLoginFailed:false})
        // }
        // else {
        //      this.setState({showSuccessMessage:false})
        //      this.setState({hasLoginFailed:true})
        // }
        //
        AuthenticationService
            .executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
                this.props.history.push(`/customers`)
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })
    }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
