import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { userActions } from '../../redux/actions/userActions.js'
import AuthenticationService from '../../service/AuthenticationService.js'

class LogoutComponent extends Component {
  constructor(props) {
    super(props)

    this.logoutClicked = this.logoutClicked.bind(this)
  }

  logoutClicked = event => {
    console.log('logout successful')
    AuthenticationService.logoutUser()
    this.props.logoutUser()
    this.props.history.push('/')
  }


  render() {
    return (
      <div>
        <h1>Are you sure you want to logout?</h1>
          <Button
            block
            bsSize="large"
            onClick={this.logoutClicked}
          >
            Logout
          </Button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(userActions.logoutUser())
  }
}

const LogoutComponentRouted = withRouter(LogoutComponent)

export default connect(null, mapDispatchToProps)(LogoutComponentRouted)
