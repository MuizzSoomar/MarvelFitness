import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./styles/App.css";
import Routes from "./Routes";
import NavBarRouted from './component/navigation/NavBar.jsx'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import{ updateUser, apiRequest } from './redux/actions/userActions.js'
// import { createSelector } from 'reselect'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {}
    }

    // this.onUpdateUser = this.onUpdateUser.bind(this)
  }

  // onUpdateUser(event) {
  //   this.props.onUpdateUser(event.target.value)
  // }

  updateCustomer = (customer) => {
    this.setState( () => {
      return {customer: customer};
    })
  }

  render() {
    return (
      <div className="App container">
        <NavBarRouted />
        <Routes customer={this.state.customer} updateCustomer={this.updateCustomer}/>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     products: state.products,
//     user: state.user,
//   }
// }


// const productsSelector = createSelector(
//   state => state.products,
//   products => products
// )
//
// const userSelector = createSelector(
//   state => state.user,
//   user => user
// )
//
// const mapStateToProps = createSelector(
//   productsSelector,
//   userSelector,
//   (products, user) => ({
//     products,
//     user
//   })
// );

// const mapActionsToProps = {
//     onUpdateUser: updateUser,
//     onApiRequest: apiRequest
// }


// export default connect(mapStateToProps, mapActionsToProps)(App);
export default App

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
