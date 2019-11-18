import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AdminRoute from "./auth/adminroute";
import PrivateRoute from "./auth/privateroute";

import Home from "./core/home";
import SignIn from "./user/signin";
import SignUp from "./user/signup";
import NavigationBar from "./core/navbar";
import Shop from "./core/shop";
import PaymentConfirmation from "./core/paymentconfirmation";

import Dashboard from "./user/dashboard";
import AdminDashboard from "./user/admindashboard";

const Routes = () => {
 return(
  <Router>
   <React.Fragment>
     <NavigationBar/>
     <Switch>
       <Route exact path="/" component={Home}/>
       <Route path="/signin" component={SignIn}/>
       <Route path="/signup" component={SignUp}/>
       <Route path="/shop" component={Shop}/>
       <PrivateRoute
          path="/paymentconfirmation"
          component={PaymentConfirmation}/>
       <PrivateRoute
          path="/user/dashboard"
          component={Dashboard}/>
      <AdminRoute
          path="/admin/dashboard"
          component={AdminDashboard}/>
     </Switch>
   </React.Fragment>
  </Router>
 );
};

export default Routes;
