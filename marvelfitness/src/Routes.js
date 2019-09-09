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
import ListRewardsComponent from "./component/ListRewardsComponent";
import UserProfile from './containers/UserProfile'
import ListUserRewardsComponent from './component/ListUserRewardsComponent'

export default ({updateCustomer, customer}) => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <AuthenticatedRoute path="/profile" exact render={(props) => <Profile {...props} customer={customer} />} />
    <AuthenticatedRoute path="/customers/search" exact render={(props) => <ListCustomersComponent {...props} updateCustomer={updateCustomer} /> }/>
    <AuthenticatedRoute path="/logout" exact component={LogoutComponentRouted} />
    <AuthenticatedRoute path="/rewards" exact render={(props) => <ListRewardsComponent {...props} customer={customer} updateCustomer={updateCustomer} /> }/>
    <AuthenticatedRoute path="/profile/:name" exact component={UserProfile} />
    <AuthenticatedRoute path="/rewards/:name" exact render={(props) => <ListUserRewardsComponent updateCustomer={updateCustomer} />} />

    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);


// Error trials
// <Route path="/customers/search" exact render={(props) => <ListCustomersComponent {...props} updateCustomer={this.props.updateCustomer} /> }/>
// <Route path="/rewards" exact render={(props) => <ListRewardsComponent {...props} customer={this.props.customer} /> }/>
// <Route path="/customers/search" exact component={ListCustomersComponent}/>
// <Route path="/rewards" exact component={ListRewardsComponent}/>
//
// {/* <Route path="/profile" exact render={(props) => <Profile {...props} customer={customer} />}/>
//
// <Route path="/customers/search" exact render={(props) => <ListCustomersComponent {...props} updateCustomer={updateCustomer} /> }/>
// <Route path="/rewards" exact render={(props) => <ListRewardsComponent {...props} customer={customer} /> }/>*/}
//
// // <AuthenticatedRoute path="/dashboard/:name" exact component={DashboardComponent} />
