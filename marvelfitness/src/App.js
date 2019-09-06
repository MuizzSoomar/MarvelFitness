import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./styles/App.css";
import Routes from "./Routes";
import NavBarRouted from './component/navigation/NavBar.jsx'

class App extends Component {
  render() {
    return (
      <div className="App container">
        <NavBarRouted />
        <Routes />
      </div>
    );
  }
}

export default App;
