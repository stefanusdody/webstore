import React, { Component } from 'react';
import {
   Button,
   Container,
   Col,
   Card,
   Form,
   FormGroup,
   Label,
   Input} from 'reactstrap';

import axios from "axios";

import "../App.css"

const box = {
  marginTop: "20px",
  marginBottom: "25px",
  position: "relative",
  fontFamily: "Merriweather",
  fontFamily: "serif",
  fontFamily: "Open Sans Condensed",
  fontFamily: "sans-serif",
  textAlign: "center"
}

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

class SignUpForm extends Component {
 constructor(props){
   super(props);
    this.state={
      name:"",
      address:"",
      phone: "",
      email: "",
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.submitForm = this.submitForm.bind(this);
 }


 handleChangeName(event){
   let value = event.target.value;
  this.setState(() => {
    return { name : value };
   });
  }

 handleChangeAddress(event){
   let value = event.target.value;
   this.setState(() => {
     return { address : value};
   });
 }

 handleChangePhone(event){
   let value = event.target.value;
   this.setState(() => {
     return { phone : value};
   });
 }

 handleChangeEmail(event){
   let value = event.target.value;
   this.setState(() => {
     return { email : value};
   })
 }

 // submitForm(event) {
 // event.preventdefault();
//}
async submitForm(event) {
  event.preventDefault();
  const name = await this.state.name;
  const address = await this.state.address;
  const phone = await this.state.phone;
  const email = await this.state.email;
  if ( name !=="" || address !=="" || phone !=="" || email !=="") {
    await axios
    .post(`${API_URL}/api/users`, {
      name: name,
      address: address,
      phone: phone,
      email: email,
    })
    .then(res => {
      const id = res.data.data.id;
        this.props.history.push(`/api/users/${id}`);
    })
    .catch(error => {
        alert("Terima Kasih Sudah Mendaftar Sebagai Mitra Kami, Kami akan Melakukan Verifikasi Melalui whatsapp");
        console.log(error.res);
      });
    this.setState({ name: "", address: "" , phone: "", email: ""});
  }
}


render() {

  return (
    <Container>
      <Form
       className="loginForm text-info"
       onSubmit={this.submitForm}>
      <h4>Form Pendaftaran</h4>
         <FormGroup>
         <Label for="exampleName">Nama Lengkap</Label>
          <Input
            type="text"
            name="Name"
            id="exampleFirstName"
            placeholder="Nama Lengkap "
            value={this.state.name}
            onChange={this.handleChangeName}
            />
           </FormGroup>
         <FormGroup>
         <Label for="exampleAddress">Alamat</Label>
          <Input
            type="text"
            name="address"
            id="exampleAddress"
            placeholder="Alamat Pengiriman"
            value={this.state.address}
            onChange={this.handleChangeAddress}/>
         </FormGroup>

         <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="text"
              name="email"
              id="exampleEmail"
              placeholder="Alamat Email"
              value={this.state.email}
              onChange={this.handleChangeEmail}/>
         </FormGroup>

        <FormGroup>
           <Label for="examplePhone">Nomor Telepon WhatsApp</Label>
           <Input
              type="text"
              name="phone"
              id="examplePhone"
              placeholder="Nomor WhatsApp"
              value={this.state.phone}
              onChange={this.handleChangePhone} />
        </FormGroup>

          <Button
             outline color="danger"
             size="lg"
             block
             onClick={this.submitForm}> Daftar Sekarang
          </Button>
      </Form>
    </Container>
   );
 };
}

export default SignUpForm;
