import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import AdminRoute from "./auth/adminroute";
import AdminDashboard from "./user/admindashboard";
import AddCategory from "./admin/addcategory";
import AddProduct from "./admin/addproduct";
import Cart from "./core/cart";
import CheckOut from "./core/checkout";
import Dashboard from "./user/dashboard";
import Home from "./core/home";
import ManageProducts from "./admin/manageproducts";
import ManagePayments from "./admin/managepayments";
import Orders from "./admin/orders";
import PaymentConfirmation from "./core/paymentconfirmation";
import PrivateRoute from "./auth/privateroute";
import Profile from "./user/profile";
import PurchaseHistory from "./user/purchasehistory";
import PrimarySearchAppBar from "./core/Appbar"
import Review from "./core/review";
import SignUp from "./user/signup";
import SignIn from "./user/signin";
import Product from './core/product';
import Shop from "./core/shop";
import Order from "./core/order";
import ContactUs from "./core/contact";
import ResiShipment from "./core/resishipment";
import ReviewProducts from "./core/reviewproducts";
import ConfirmationPayment from "./core/confirmation";
import UpdateProduct from "./admin/updateproduct";


const Routes = () => {
  return(
    <BrowserRouter>
     <PrimarySearchAppBar/>
       <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/shop" exact component={Shop}/>
        <Route path="/signin" exact component={SignIn}/>
        <Route path="/signup" exact component={SignUp}/>
        <Route path="/cart" exact component={Cart}/>
        <Route path="/reviewcart" exact component={Review}/>
        <Route path="/caraorder" exact component={Order}/>
        <Route path="/review-products" exact component={ReviewProducts}/>
        <Route path="/konfirmasi-pembayaran" exact component={ConfirmationPayment}/>
        <Route path="/Resi-Pengiriman" exact component={ResiShipment}/>
        <Route path="/Hubungi-Kami" exact component={ContactUs}/>
        <Route path="/product/:productId" exact component={Product} />
        <PrivateRoute
               path="/paymentconfirmation"
               exact
               component={PaymentConfirmation}/>
        <PrivateRoute
               path="/user/dashboard"
               exact
               component={Dashboard}/>
        <PrivateRoute
               path="/profile/:userId"
               exact
               component={Profile}/>
        <PrivateRoute
               path="/user/purchasehistory"
               exact
               component={PurchaseHistory}/>
        <AdminRoute
               path="/admin/dashboard"
               exact
               component={AdminDashboard}/>
        <AdminRoute
               path="/create/category"
               exact
               component={AddCategory}/>
        <AdminRoute
               path="/create/product"
               exact
               component={AddProduct}/>
        <AdminRoute
               path="/admin/orders"
               exact
               component={Orders}/>
        <AdminRoute
               path="/admin/products"
               exact
               component={ManageProducts}/>
        <AdminRoute
               path="/admin/payments"
               exact
               component={ManagePayments}/>
        <AdminRoute
               path="/admin/product/update/:productId"
               exact
               component={UpdateProduct}/>
       </Switch>
   </BrowserRouter>
 );
};

export default Routes;
