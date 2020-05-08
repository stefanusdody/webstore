import React, { Component } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import AddressService from './addressservice';
import {addAddress} from './carthelpers';
import {getAddress} from "./carthelpers";

class Address extends Component {

  constructor() {
    super();
    this.state = {
      provinsi: [],
      kotaAsal: [],
      kotaTujuan: [],
      data: {
        origin: '55',
        destination: '',
        weight: '',
        courier: 'jne',
        service: '',
        cost: ''
      },
      hasil: [],
      service:[]
    }
    this.handleProvince = this.handleProvince.bind(this);
    this.handleProvinceTujuan = this.handleProvinceTujuan.bind(this);
    this.handleWeightandCourier = this.handleWeightandCourier.bind(this);
    this.handleCourier = this.handleCourier.bind(this);
    this.handleKotaAsal = this.handleKotaAsal.bind(this);
    this.handleKotaTujuan = this.handleKotaTujuan.bind(this);
    this.cekOngkir = this.cekOngkir.bind(this);
  }

  componentDidMount() {
    axios.get('https://webstore-api-id.herokuapp.com/api/provinsi')
      .then(response => {
        this.setState({
          provinsi: response.data.rajaongkir.results
        })
        // return axios.get('http://localhost:3011/kota')
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleService() {
    getAddress().then(response => {
      this.setState({
        service: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleProvince(e) {
    const id = e.target.value;
    axios.get(`https://webstore-api-id.herokuapp.com/api/kota/${id}`)
      .then(response => {
        this.setState({
          kotaAsal: response.data.rajaongkir.results
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleProvinceTujuan(e) {
    const id = e.target.value;
    axios.get(`https://webstore-api-id.herokuapp.com/api/kota/${id}`)
      .then(response => {
        this.setState({
          kotaTujuan: response.data.rajaongkir.results
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleWeightandCourier = (name, value) => {
    const data = this.state.data
    data[name] = value
  }



  handleCourier(e) {
    const data = this.state.data
    const value = e.target.value;
    data['courier'] = value;
  }

  handleKotaAsal(e) {
    const data = this.state.data
    const value = e.target.value;
    data['origin'] = value;
  }

  handleKotaTujuan(e) {
    const data = this.state.data
    const value = e.target.value;
    data['destination'] = value;
  }


  cekOngkir(e) {
    e.preventDefault();

    axios.post('https://webstore-api-id.herokuapp.com/api/ongkir', {
      origin: this.state.data.origin,
      destination: this.state.data.destination,
      weight: this.state.data.weight,
      courier: this.state.data.courier
    })
      .then(response => {
        this.setState({
          hasil: response.data.rajaongkir.results[0].costs,
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="App">
      <Grid item xs={12}>
       <InputLabel htmlFor="age-native-simple">Alamat Pengiriman</InputLabel>
       <TextField
         required
         id="address1"
         name="address1"
         fullWidth
       />
     </Grid>
       <form onSubmit={this.cekOngkir}>
       <br/>
        <Grid container spacing={2}>
            <Grid item xs={6} sm={6} md={6}>
              <InputLabel htmlFor="age-native-simple">Provinsi</InputLabel>
             <select
              onChange={this.handleProvinceTujuan}>
             <option>-- Provinsi --</option>
              {this.state.provinsi.map(function (r, i) {
              return <option key={r.province_id} value={r.province_id}>{r.province}</option>
             })}
             </select>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <InputLabel htmlFor="age-native-simple">Kota</InputLabel>
             <select
              onChange={this.handleKotaTujuan}>
             <option>-- Kota --</option>
              {this.state.kotaTujuan.map(function (r, i) {
                return <option key={r.city_id} value={r.city_id}>{r.type} {r.city_name}</option>
              })}
          </select>
          </Grid>
        </Grid>
        <br/>
        <Grid container spacing={2}>
           <Grid item xs={6} sm={6} md={6}>
           <InputLabel htmlFor="age-native-simple">Berat Total</InputLabel>
            <TextField
             type="text"
             placeholder="Isi Berat"
             onChange={event => this.handleWeightandCourier('weight', event.target.value)}
            />
           </Grid>
           <Grid item xs={6} sm={6} md={6}>
            <InputLabel htmlFor="age-native-simple">Pilih Kurir</InputLabel>
            <select onChange={this.handleCourier}>
              <option>-- PILIH KURIR --</option>
              <option value="jne">JNE</option>
              <option value="tiki">TIKI</option>
            </select>
          </Grid>
        </Grid>
          <br />
          <Button type="submit" variant="contained" >Cek Ongkos Kirim</Button>
          <hr />
          <InputLabel htmlFor="age-native-simple">Pilih Jasa Pengiriman</InputLabel>
          <Table>
              {this.state.hasil.map(function (service, i) {
                return (
                  <AddressService
                   service={service}
                  />
                )
              })}
          </Table>
          </form>
      </div>
    );
  }
}


export default Address;
