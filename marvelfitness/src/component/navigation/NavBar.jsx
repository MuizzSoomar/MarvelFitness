import React, { Component } from 'react'
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AuthenticationService from '../../service/AuthenticationService.js'

class NavBar extends Component {
  render() {
    let loggedIn = this.props.loggedIn
    let isCustomer = this.props.isCustomer

    return (
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Marvel Fitness</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            { !loggedIn && <LinkContainer to="/login">
              <NavItem>Login</NavItem>
            </LinkContainer>}
            { (loggedIn && isCustomer) && <LinkContainer to="/profile">
              <NavItem>Profile</NavItem>
            </LinkContainer> }
            { (loggedIn && !isCustomer) && <LinkContainer to="/customers/search">
              <NavItem>Customers</NavItem>
            </LinkContainer> }
            { loggedIn && <LinkContainer to="/rewards">
              <NavItem>Rewards</NavItem>
            </LinkContainer>}
            { loggedIn && <LinkContainer to="/logout">
              <NavItem>Logout</NavItem>
            </LinkContainer> }
            { loggedIn && <LinkContainer to={`/dashboard/${this.props.username}`}>
              <NavItem>Dashboard</NavItem>
            </LinkContainer>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    isCustomer: state.user.isCustomer,
    username: state.user.username,
    loggedIn: state.user.loggedIn
  }
}

const NavBarRouted = withRouter(NavBar)

export default connect(mapStateToProps)(NavBarRouted)
