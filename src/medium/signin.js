import React from 'react';
import {
  Button,
  Container,
  Form,
  Label,
  Input,
  FormGroup
} from 'reactstrap';

import "../App.css"

const SignIn = (props) => {
  return (
    <Container>
      <Form className="loginForm text-info">
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="Insert Your Email" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="Insert Your Password" />
        </FormGroup>
        <br/>
        <Button outline color="danger" size="lg" block> Sign In </Button>
        <br/>
        <Button href="/signup" outline color="info" size="lg" block> Sign Up </Button>
      </Form>
    </Container>
   );
 }

export default SignIn;
