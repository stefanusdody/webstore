import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PrivateRoute from "./auth/privateroute";
import Profile from "./user/profile";
import PurchaseHistory from "./user/purchasehistory";
import SignIn from "./user/signin";
import SignUp from "./user/signup";
import Dashboard from "./user/dashboard";
import Cart from "./core/cart";
import Home from "./core/home";
import Review from "./core/review";
import Shop from "./core/shop";
import NavigationBar from "./core/navbar";
import NavigationBarBottom from "./core/navbottom"
import Product from './core/product';
import Pickers from './core/pickers';
import OrderList from './core/orderlist'

const Routes = () => {
 return(
  <Router>
   <React.Fragment>
   <NavigationBar />
     <Switch>
       <Route exact path="/" component={Home}/>
       <Route exact path="/pickers" component={Pickers}/>
       <Route path="/cart" exact component={Cart}/>
       <Route path="/signin" component={SignIn}/>
       <Route path="/signup" component={SignUp}/>
       <Route path="/shop" component={Shop}/>
       <Route path="/reviewcart" exact component={Review}/>
       <Route path="/product/:productId" exact component={Product} />
       <PrivateRoute
          path="/user/dashboard"
          component={Dashboard}/>
       <PrivateRoute
          path="/profile/:userId"
          component={Profile}/>
       <PrivateRoute
          path="/user/purchasehistory"
          component={PurchaseHistory}/>
       <PrivateRoute
          path="/orderlist"
          component={OrderList}/>
     </Switch>
     <NavigationBarBottom/>
   </React.Fragment>
  </Router>
 );
};

export default Routes;
