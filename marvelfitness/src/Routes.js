import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import ListCustomersComponent from "./component/ListCustomersComponent";
import Profile from "./containers/Profile";
import ListRewardsComponent from "./component/ListRewardsComponent";

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/profile" exact component={Profile} />
    <Route path="/customers/search" exact component={ListCustomersComponent} />
    <Route path="/rewards" exact component={ListRewardsComponent} />

    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
