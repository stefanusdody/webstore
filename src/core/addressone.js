import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import AddressService from './addressservice';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  text: {
    textAlign: "center"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));


const Address = () => {
  const classes = useStyles();

  const [values, setValues] = useState({
    provinsi: [],
    kotaAsal: [],
    kotaTujuan: [],
    kotatujuan:"",
    origin: '55',
    destination: '',
    weight: '',
    courier: '',
    hasil: []
  })

const { provinsi, kotaAsal, kotaTujuan, kotatujuan, origin, destination, weight, courier, hasil } = values

const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  //Load categories and set form data
      const init = () => {
        axios.get('https://webstore-api-id.herokuapp.com/api/provinsi')
        .then(response => {
          setValues({
            ...values,
            provinsi: response.data.rajaongkir.results
         })
        })
      }

useEffect(() => {
  init();
}, [])


const handleProvinceTujuan = event => {
  const id = event.target.value;

  axios.get(`https://webstore-api-id.herokuapp.com/api/kota/${id}`)
    .then(response => {
      setValues({
        ...values,
        kotaTujuan: response.data.rajaongkir.results
     })
    })
}

const clickSubmit = event => {
  event.preventDefault();
  setValues({ ...values});
  axios.post('https://webstore-api-id.herokuapp.com/api/ongkir', { origin, destination, weight, courier
  }).then(response => {
    setValues({
      hasil: response.data.rajaongkir.results[0].costs
    })
  })
  .catch(function (error) {
    console.log(error);
  })
};


return (
    <div>
      <Typography variant="h6" gutterBottom className={classes.text}>
        Alamat Pengiriman
      </Typography>
      <Grid item xs={12}>
      <InputLabel htmlFor="age-native-simple">Alamat</InputLabel>
       <TextField
         required
         id="address1"
         name="address1"
         label="Alamat Pengiriman"
         fullWidth
       />
     </Grid>
     <form onSubmit={clickSubmit}>
     <br/>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={6}>
        <InputLabel htmlFor="age-native-simple">Provinsi</InputLabel>
          <select
           onChange={handleProvinceTujuan}
           >
            <option>-- Provinsi --</option>
             { provinsi && provinsi.map((r,i) => (
              <option key={r.province_id} value={r.province_id}>{r.province}</option>
            ))}
          </select>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
         <InputLabel htmlFor="age-native-simple">Kota</InputLabel>
         <select
          value={destination}
          onChange={handleChange('destination')}>
         <option>-- Kota --</option>
          { kotaTujuan && kotaTujuan.map((r,i) => (
            <option key={r.city_id} value={r.city_id}>{r.type} {r.city_name}</option>
          ))}
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
          onChange={handleChange('weight')}
        />
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
         <InputLabel htmlFor="age-native-simple">Kurir</InputLabel>
          <select
           value={courier}
           onChange={handleChange('courier')}>
            <option>-- Pilih KURIR --</option>
            <option value="jne">JNE</option>
            <option value="tiki">TIKI</option>
          </select>
         </Grid>
      </Grid>
      <br/>
      <Button type="submit" variant="contained" >Cek Ongkos Kirim</Button>
      <hr />
      <InputLabel htmlFor="age-native-simple">Pilih Jasa Pengiriman</InputLabel>
      <Table>
         { hasil && hasil.map((service,i) => (
          <TableBody key={i}>
           <AddressService
            service={service}
           />
          </TableBody>
         ))}
      </Table>
     </form>
    </div>
    );
}


export default Address;
