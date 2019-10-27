import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./pages/App";
import CartProduct from "./medium/cart";
import NavigationBar from "./medium/navbar";
import NavigationBottom from "./medium/navigationbottom";
import LogIn from "./pages/login";
import SignUp from "./pages/signup";
import ProductList from "./pages/productlist";
import ProductDetail from "./medium/detail";
import {ProductProvider} from "./context"

const Routes = () => {
 return(
  <ProductProvider>
    <Router>
     <React.Fragment>
     <NavigationBar/>
     <Switch>
       <Route component={App} exact path="/" />
       <Route component={CartProduct} exact path="/cart" />
       <Route component={LogIn} path="/login" />
       <Route component={SignUp} path="/signup" />
       <Route component={ProductList} path="/product" />
       <Route component={ProductDetail} path="/productdetail" />
     </Switch>
     <NavigationBottom/>
     </React.Fragment>
    </Router>
  </ProductProvider>
 );
};

export default Routes;