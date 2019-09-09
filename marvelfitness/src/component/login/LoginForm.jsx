import React, {Component} from 'react'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import AuthenticationService from '../../service/AuthenticationService.js'
import { withRouter } from 'react-router-dom'
import '../../styles/Login.css'

class LoginForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      hasLoginFailed: 'false',
      showLoginSuccess: 'false'
    }

    this.handleChange = this.handleChange.bind(this)
    this.loginClicked = this.loginClicked.bind(this)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  loginClicked = event => {
    event.preventDefault()

    // if (this.state.username !== '' && this.state.password !== '') {
    //   AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
    //   this.props.history.push("/dashboard")
    // }
    // else {
    //   console.log('failed')
    // }

    // AuthenticationService
    // .executeBasicAuthenticationService(this.state.username, this.state.password)
    // .then(
    //   () => {
    //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
    //     this.props.history.push("/dashboard")
    //   }
    // )
    // .catch(
    //   () => {
    //     this.setState({
    //       hasLoginFailed: true,
    //       showLoginSuccess: false
    //     })
    //   }
    // )

    AuthenticationService
    .executeJwtAuthenticationService(this.state.username, this.state.password)
    .then(
      (response) => {
        AuthenticationService.registerSuccessfulLoginJwt(this.state.username, response.data.token)
        this.props.history.push("/dashboard")
      }
    )
    .catch(
      () => {
        this.setState({
          hasLoginFailed: true,
          showLoginSuccess: false
        })
      }
    )
  }

  render() {

    return (
      <div className="Login">
        <form onSubmit={this.loginClicked}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              name="username"
              // value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              // value={this.state.password}
              onChange={this.handleChange}
              type="password"
              name="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            // disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    )
  }
}

const LoginFormRouted = withRouter(LoginForm)

export default LoginFormRouted
