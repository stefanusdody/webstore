import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(10),
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
    marginBottom: theme.spacing(3),
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

  return (
    <Container className={classes.layout}>
       <Paper className={classes.paper}>
       <Typography gutterBottom variant="h5" component="h1" align="center">
         Jadwal Pengambilan
       </Typography>
         <form className={classes.container} noValidate>
           <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} align="center">
                 <TextField
                  id="date"
                  fullWidth
                  label="Tanggal Pengambilan"
                  type="date"
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
                  className={classes.textField}
                  InputLabelProps={{
                  shrink: true,
                  }}
                 />
              </Grid>
           </Grid>
         </form>
       </Paper>
   </Container>
  );
}

export default Pickers
