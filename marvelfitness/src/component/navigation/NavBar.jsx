import React, { Component } from 'react'
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import AuthenticationService from '../../service/AuthenticationService.js'

class NavBar extends Component {
  render() {
    let loggedIn = AuthenticationService.isUserLoggedIn()

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
            { loggedIn && <LinkContainer to="/profile">
              <NavItem>Profile</NavItem>
            </LinkContainer> }
            { loggedIn && <LinkContainer to="/customers/search">
              <NavItem>Customers</NavItem>
            </LinkContainer> }
            { loggedIn && <LinkContainer to="/logout">
              <NavItem>Logout</NavItem>
            </LinkContainer> }
            { loggedIn && <LinkContainer to="/dashboard">
              <NavItem>Dashboard</NavItem>
            </LinkContainer>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const NavBarRouted = withRouter(NavBar)

export default NavBarRouted
