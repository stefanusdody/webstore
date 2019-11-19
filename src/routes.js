import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AdminRoute from "./auth/adminroute";
import PrivateRoute from "./auth/privateroute";

import AddCategory from "./admin/addcategory";
import AddProduct from "./admin/addproduct";
import Cart from "./core/cart";
import CheckOut from "./core/checkout";
import Home from "./core/home";
import ManageProducts from "./admin/manageproducts";
import ManagePayments from "./admin/managepayments";
import NavigationBar from "./core/navbar";
import Orders from "./admin/orders";
import PaymentConfirmation from "./core/paymentconfirmation";
import Profile from "./user/profile";
import PurchaseHistory from "./user/purchasehistory";
import Review from "./core/review";
import SignIn from "./user/signin";
import SignUp from "./user/signup";
import Shop from "./core/shop";
import UpdateProduct from "./admin/updateproduct";

import Dashboard from "./user/dashboard";
import AdminDashboard from "./user/admindashboard";

const Routes = () => {
 return(
  <Router>
   <React.Fragment>
     <NavigationBar/>
     <Switch>
       <Route exact path="/" component={Home}/>
       <Route path="/cart" exact component={Cart}/>
       <Route path="/checkout" exact component={CheckOut}/>
       <Route path="/signin" component={SignIn}/>
       <Route path="/signup" component={SignUp}/>
       <Route path="/shop" component={Shop}/>
       <Route path="/reviewcart" exact component={Review}/>
       <PrivateRoute
          path="/paymentconfirmation"
          component={PaymentConfirmation}/>
       <PrivateRoute
          path="/user/dashboard"
          component={Dashboard}/>
       <PrivateRoute
          path="/profile/:userId"
          component={Profile}/>
       <PrivateRoute
          path="/user/purchasehistory"
          component={PurchaseHistory}/>
       <AdminRoute
          path="/admin/dashboard"
          component={AdminDashboard}/>
       <AdminRoute
          path="/create/category"
          component={AddCategory}/>
       <AdminRoute
          path="/create/product"
          component={AddProduct}/>
       <AdminRoute
          path="/admin/orders"
          component={Orders}/>
       <AdminRoute
          path="/admin/products"
          component={ManageProducts}/>
       <AdminRoute
          path="/admin/payments"
          component={ManagePayments}/>
       <AdminRoute
          path="/admin/product/update/:productId"
          component={UpdateProduct}/>
     </Switch>
   </React.Fragment>
  </Router>
 );
};

export default Routes;
