import React, { Component } from 'react'
import HelloService from '../../service/HelloService.js'
import { connect } from 'react-redux'
import AuthenticationService from '../../service/AuthenticationService.js'
import { userActions } from '../../redux/actions/userActions.js'

class DashboardComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      helloMessage : '',
    }

    this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
    this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
    this.handleError = this.handleError.bind(this)

    // AuthenticationService.getUserDetails().then(
    //   response => {
    //     console.log(response)
    //     this.props.saveUser({...response.data})
    //   }
    // )
  }



  render() {
    return (
      <div>
        <div>Welcome {this.props.name} {this.props.username}</div>
        <button onClick={this.retrieveWelcomeMessage}>Hello</button>
        <div>{this.state.helloMessage}</div>
    </div>
    );
  }

  retrieveWelcomeMessage() {
    // HelloService.executeHelloService()
    // .then (
    //   response => this.handleSuccessfulResponse(response)
    // )
    // .catch (
    //   console.log("failed")
    // )
    //
    // HelloService.executeHelloBeanService()
    // .then (
    //   response => this.handleSuccessfulResponse(response)
    // )
    // .catch (
    //   console.log("failed")
    // )
    //
    HelloService.executeHelloPathService(sessionStorage.getItem('authenticatedUser'))
    .then (
      response => this.handleSuccessfulResponse(response)
    )
    .catch (
      error => this.handleError(error)
    )
  }

  handleSuccessfulResponse(response) {
    this.setState({helloMessage : response.data.message})
  }

  handleError(error) {
    console.log(error.response)

    let errorMessage = '';

    if (error.message) {
      errorMessage += error.message
    }

    if (error.response && error.response.data) {
      errorMessage += error.response.data.message
    }

    this.setState({ helloMessage : errorMessage })
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.username,
    name: state.user.name
  }
}

export default connect(mapStateToProps)(DashboardComponent)
