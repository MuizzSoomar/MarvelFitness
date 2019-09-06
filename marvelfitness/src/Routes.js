import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthenticatedRoute from './component/navigation/AuthenticatedRoute'
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import ListCustomersComponent from "./component/ListCustomersComponent";
import Profile from "./containers/Profile";
import DashboardComponent from './component/dashboard/DashboardComponent'
import LogoutComponentRouted from './component/logout/LogoutComponent'

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <AuthenticatedRoute path="/profile" exact component={Profile} />
    <AuthenticatedRoute path="/customers/search" exact component={ListCustomersComponent} />
    <AuthenticatedRoute path="/dashboard" exact component={DashboardComponent} />
    <AuthenticatedRoute path="/logout" exact component={LogoutComponentRouted} />

    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
