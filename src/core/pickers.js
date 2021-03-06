import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getAllOutlets } from './apicore';
import { addTimePickers } from './carthelpers';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: "center"
  },
  submit: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: "center"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  layout: {
    width: 'auto',
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(20),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginBottom: theme.spacing(10),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));

const Pickers = () => {
  const classes = useStyles();
  const [outlets, setOutlets] = useState([]);
  const [error, setError] = useState(false);

  const [values, setValues] = useState({
    date_pickers: "",
    time_pickers: ""
  })

  const { date_pickers, time_pickers } = values

  const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
  };

  const addPickers = () => {
    addTimePickers({ outlets, date_pickers, time_pickers })
  }

  const init = () => {
    getAllOutlets().then(data => {
      if(data.error) {
        setError(data.error)
      } else {
        setOutlets(data)
      }
    });
  };

  useEffect(() => {
    init()
  }, [])

  const showStatus = (status) => {
      return status.role > 0 ?
      <Typography gutterBottom variant="p" component="h6" align="center">
        Status Toko : Buka
      </Typography>
        :
      <Typography gutterBottom variant="p" color="secondary" component="h6" align="center">
        Status Toko : Tutup
      </Typography>
     }


  const statusButton = (status) => {
    return status.role > 0 ?
      <Button
        variant="outlined"
        color="inherit"
        fullWidth
        href="/reviewcart"
        onClick={addPickers}
      >
        Submit
      </Button>

      :
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        align="center"
      >
        Outlet Tutup
      </Button>
   }


  return (
    <Container className={classes.layout}>
       <Paper className={classes.paper}>
          <Typography gutterBottom variant="h5" component="h1" align="center">
           Jadwal Pengambilan
          </Typography>
          <form className={classes.container} noValidate>
           {outlets.map((outlet, i) => (
            <Grid key={i} item xs={12} sm={12} md={12}>
              <Typography
                gutterBottom
                variant="p"
                component="h6"
                align="center"
                value={outlet.name}
                >
                {outlet.name}
              </Typography>
              <Typography gutterBottom variant="p" component="h6" align="center">
                {outlet.address}
              </Typography>
              <Typography gutterBottom variant="p" component="h6" align="center">
                {outlet.city}
              </Typography>
              <br/>
              {showStatus(outlet.status)}
              <br/>
              <Grid container spacing={2}>
                 <Grid item xs={12} sm={12} md={6} align="center">
                     <TextField
                      id="date"
                      fullWidth
                      label="Tanggal Pengambilan"
                      type="date"
                      value={date_pickers}
                      onChange={handleChange("date_pickers")}
                      className={classes.textField}
                      InputLabelProps={{
                      shrink: true,
                      }}
                     />
                 </Grid>
                 <Grid item xs={12} sm={12} md={6} align="center">
                     <TextField
                      id="time"
                      label="Waktu Pengambilan"
                      type="time"
                      value={time_pickers}
                      onChange={handleChange("time_pickers")}
                      className={classes.textField}
                      InputLabelProps={{
                      shrink: true,
                     }}
                 />
              </Grid>
              </Grid>
              <br/>
              <Grid key={i} item xs={12} sm={12} md={12} align="center">
                {statusButton(outlet.status)}
              </Grid>
           </Grid>
          ))}

          </form>
       </Paper>
   </Container>
  );
}

export default Pickers
