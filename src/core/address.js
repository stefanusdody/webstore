import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { Input } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import CourierService from './courierservice';
import { makeStyles } from '@material-ui/core/styles';
import { addAddress,getCart } from './carthelpers';


const useStyles = makeStyles(theme => ({
  text: {
    marginTop: theme.spacing(2),
  },
  layout: {
    width: 'auto',
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(8),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));


const Address = () => {
  const classes = useStyles();
  const [ items, setItems ] = useState([]);

  const [values, setValues] = useState({
    provinsi: [],
    kotaAsal: [],
    kotaTujuan: [],
    kotatujuan:"",
    origin: '55',
    destination: '',
    courier: '',
    products:[],
    hasil: [],
    alamat: "",
    kelurahan: "",
    kota: "",
    provinsi: "",
    postal: "",
    address: []
  })

const { provinsi, kotaTujuan, origin, destination, courier, hasil, alamat, kelurahan, postal } = values


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
    setItems(getCart());
  }, [])

const handleProvinceTujuan = event => {
    const id = event.target.value;

    axios.get(`https://webstore-api-id.herokuapp.com/api/provinsi/${id}`)
      .then(response => {
        setValues({
          ...values,
          kotaTujuan: response.data.rajaongkir.results
       })
      })
  }

const getWeight = () => {
      return items.reduce((currentValue, nextValue) => {
        return currentValue + nextValue.count * nextValue.weight
    }, 0)
}

let weight = getWeight();

const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values});
    addAddress({ alamat, kelurahan, courier, destination, postal })
    axios.post('https://webstore-api-id.herokuapp.com/api/ongkir', { origin, destination, weight, courier
    }).then(response => {
      setValues({
        alamat: "",
        kelurahan: "",
        postal: "",
        hasil: response.data.rajaongkir.results[0].costs,
      })
    })
    .catch(function (error) {
      console.log(error);
    })
  };


return (
  <Container>
   <main className={classes.layout}>
     <Paper className={classes.paper}>
      <Typography variant="h6" gutterBottom className={classes.text}>
         Alamat dan Kurir Pengiriman
       </Typography>
    <form onSubmit={clickSubmit}>
      <Grid container spacing={3}>
         <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Nama Jalan"
            fullWidth
            autoComplete="billing address-line1"
            value={alamat}
            onChange={handleChange("alamat")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Kelurahan"
            fullWidth
            autoComplete="billing address-level2"
            value={kelurahan}
            onChange={handleChange("kelurahan")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
        <TextField
           required
           id="postal"
           name="postal"
           label="Kode Pos"
           fullWidth
           autoComplete="postal"
           value={postal}
           onChange={handleChange('postal')}
         />
       </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <InputLabel htmlFor="age-native-simple">Provinsi</InputLabel>
            <Input
              required
              type="select"
              name="select"
              id="exampleSelect"
              onChange={handleProvinceTujuan}>
              <option>-- Provinsi --</option>
               { provinsi && provinsi.map((r,i) => (
              <option  key={r.province_id} value={r.province_id}>{r.province}</option>
               ))}
            </Input>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <InputLabel htmlFor="age-native-simple">Kota</InputLabel>
            <Input
             required
             type="select"
             name="select"
             id="exampleSelect"
             value={destination}
             onChange={handleChange('destination')}>
             <option>-- Kota --</option>
               { kotaTujuan && kotaTujuan.map((r,i) => (
             <option required key={r.city_id} value={r.city_id}>{r.type} {r.city_name}</option>
              ))}
            </Input>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <InputLabel htmlFor="age-native-simple">Berat Total Product</InputLabel>
            <Input
              required
              type="select"
              name="select"
              id="exampleSelect"
              value={weight}
              onChange={handleChange('weight')}>
              { items && items.map((r,i) => (
                <option required key={i} value={r.getWeight}>{getWeight()} gram</option>
              ))}
           </Input>
        </Grid>



        <Grid item xs={12} sm={6} md={6}>
           <InputLabel htmlFor="age-native-simple">Kurir</InputLabel>
             <Input
              required
              type="select"
              name="select"
              id="exampleSelect"
              value={courier}
              onChange={handleChange('courier')}>
              <option>-- Pilih KURIR --</option>
              <option value="jne">JNE</option>
              <option value="tiki">TIKI</option>
             </Input >
        </Grid>
        <br/>
        <Button type="submit" variant="outlined" fullWidth color="primary" >Cek Ongkos Kirim</Button>
         <Typography variant="h6" gutterBottom className={classes.text}>
            Pilih Kurir Pengiriman
          </Typography>
        <Grid container spacing={2}>
          { hasil && hasil.map((service,i) => (
            <Grid  key={i} item xs={12} sm={12} md={12}>
             <CourierService
              service={service}
             />
            </Grid>
           ))}
        </Grid>
      </Grid>
    </form>
    <br/>
    </Paper>
  </main>
  </Container>
  );
}


export default Address;
