import React, { Component } from "react";

import NavigationBar from '../medium/navbar';
import SignUpForm from '../medium/signupform';

class SignUp extends Component {
  render() {
     return (
     <div>
       <NavigationBar/>
       <SignUpForm />
     </div>
     );
  }
}

export default SignUp;
