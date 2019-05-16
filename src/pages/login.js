import React, { Component } from "react";

import SignIn from '../medium/signin';
import NavigationBarBottom from "../medium/navbarbottom"

class LogIn extends Component {
  render() {
     return (
     <div>
       <SignIn/>
       <NavigationBarBottom/>
     </div>
     );
  }
}

export default LogIn  ;
