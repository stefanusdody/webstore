import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./core/home";
import SignIn from "./user/signin";
import SignUp from "./user/signup";
import NavigationBar from "./core/navbar";

const Routes = () => {
 return(
  <Router>
   <React.Fragment>
     <NavigationBar/>
     <Switch>
       <Route component={Home} exact path="/" />
       <Route component={SignIn} path="/signin" />
       <Route component={SignUp} path="/signup" />
     </Switch>
   </React.Fragment>
  </Router>
 );
};

export default Routes;
