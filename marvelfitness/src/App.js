import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./styles/App.css";
import Routes from "./Routes";
import NavBarRouted from './component/navigation/NavBar.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {}
    }
  }

  updateCustomer = (customer) => {
    console.log(`in update customer: ${this.state.customer.rewards_balance}`)
    this.setState( () => {
      return {customer: customer};
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="App container">
        <NavBarRouted />
        <Routes customer={this.state.customer} updateCustomer={this.updateCustomer}/>
      </div>
    );
  }
}

export default App;

// {/*<Navbar fluid collapseOnSelect>
//   <Navbar.Header>
//     <Navbar.Brand>
//       <Link to="/">Marvel Fitness</Link>
//     </Navbar.Brand>
//     <Navbar.Toggle />
//   </Navbar.Header>
//   <Navbar.Collapse>
//     <Nav pullRight>
//       <LinkContainer to="/login">
//         <NavItem>Login</NavItem>
//       </LinkContainer>
//       <LinkContainer to="/profile">
//         <NavItem>Profile</NavItem>
//       </LinkContainer>
//       <LinkContainer to="/customers/search" >
//         <NavItem>Customers</NavItem>
//       </LinkContainer>
//       <LinkContainer to="/rewards">
//         <NavItem>Rewards</NavItem>
//       </LinkContainer>
//       <LinkContainer to="/Sign Out">
//         <NavItem>Sign out</NavItem>
//       </LinkContainer>
//     </Nav>
//   </Navbar.Collapse>
// </Navbar>*/}
