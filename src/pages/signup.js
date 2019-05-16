import React, { Component } from "react";

import SignUpForm from '../medium/signupform';
import NavigationBarBottom from "../medium/navbarbottom"

class SignUp extends Component {
  render() {
     return (
     <div>
       <SignUpForm />
       <NavigationBarBottom/>
     </div>
     );
  }
}

export default SignUp;
