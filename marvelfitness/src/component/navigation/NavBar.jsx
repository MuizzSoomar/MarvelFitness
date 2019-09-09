import React, { Component } from 'react'
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class NavBar extends Component {

  render() {

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
            { !this.props.loggedIn && <LinkContainer to="/login">
              <NavItem>Login</NavItem>
            </LinkContainer>}
            { (this.props.loggedIn && this.props.isCustomer) && <LinkContainer to={`/profile/${this.props.id}`}>
              <NavItem>Profile</NavItem>
            </LinkContainer> }
            { (this.props.loggedIn && !this.props.isCustomer) && <LinkContainer to="/customers/search">
              <NavItem>Customers</NavItem>
            </LinkContainer> }
            { (this.props.loggedIn  && this.props.isCustomer ) && <LinkContainer to={`/rewards/${this.props.id}`}>
              <NavItem>Rewards</NavItem>
            </LinkContainer>}
            { this.props.loggedIn && <LinkContainer to="/logout">
              <NavItem>Logout</NavItem>
            </LinkContainer> }
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
    loggedIn: state.user.loggedIn,
    id: state.user.id
  }
}

const NavBarRouted = withRouter(NavBar)

export default connect(mapStateToProps)(NavBarRouted)

// { loggedIn && <LinkContainer to={`/dashboard/${this.props.username}`}>
//   <NavItem>Dashboard</NavItem>
// </LinkContainer>}

// { (this.props.loggedIn && !this.props.isCustomer) && <LinkContainer to="/rewards">
//   <NavItem>Rewards</NavItem>
// </LinkContainer>}
