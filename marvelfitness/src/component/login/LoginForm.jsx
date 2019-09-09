import React, {Component} from 'react'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { Redirect } from "react-router"
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { userActions } from '../../redux/actions/userActions.js'
import '../../styles/Login.css'

class LoginForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      isLoading: false
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

    console.log("dispatching login")
    const user = {username: this.state.username, password: this.state.password}
    this.props.startLogin(user)
  }

  render() {
    if (this.props.loggedIn) {
      if (this.props.isCustomer) {
        return <Redirect push to={`/profile/${this.props.id}`} />
      }
      else {
        return <Redirect push to={"/customers/search"} />
      }
    }
    else {
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
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    isCustomer: state.user.isCustomer,
    id: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startLogin: (user) => dispatch(userActions.startLogin(user)),
    loginUser: (user) => dispatch(userActions.loginUser(user))
  }
}
const LoginFormRouted = withRouter(LoginForm)


export default connect(mapStateToProps, mapDispatchToProps)(LoginFormRouted)
