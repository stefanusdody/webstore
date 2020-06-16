import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import {Redirect} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StoreIcon from '@material-ui/icons/Store';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { isAuthenticated } from '../auth';
import { itemTotal } from '../core/carthelpers';
import { read, update, updateUser } from './apiuser'


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(5),
  },
  BottomBar: {
    top: 'auto',
    bottom: 0,
  },
  container: {
    marginTop: theme.spacing(20),
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  }
}));


const Profile = ({match}) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: false,
    success: false
  });

  const {token} = isAuthenticated()

  const {name, email, password, error, success} = values

  const init = (userId) => {
    // console.log(userId);
    read(userId, token).then(data => {
      if(data.error) {
        setValues({ ...values, error: true})
      } else {
        setValues({
           ...values,
           name: data.name,
           email: data.email,
        })
      }
    })
  }

  useEffect(() => {
    init(match.params.userId)
  }, [])

 const handleChange = name => e => {
   setValues({ ...values, error: false, [name]: e.target.value})
 }

 const clickSubmit = e => {
   e.preventDefault()
   update(match.params.userId, token, {name, email, password}).then(data => {
     if(data.error) {
       console.log(data.error)
     } else {
        updateUser(data, () => {
          setValues({
            ...values,
            name: data.name,
            email: data.email,
            success: true
          });
        });
     }
   });
 };

 const redirectUser = (success) => {
   if(success) {
     return <Redirect to="/cart"/>
   }
 }

 const profileUpdate = (name, email, password) => (
   <form className={classes.form} noValidate>
     <Grid container spacing={2}>

       <Grid item xs={12} >
         <TextField
           autoComplete="fname"
           name="name"
           variant="outlined"
           required
           fullWidth
           id="name"
           label="Full Name"
           autoFocus
           value={name}
           onChange={handleChange("name")}
         />
       </Grid>

       <Grid item xs={12}>
         <TextField
           variant="outlined"
           required
           fullWidth
           id="email"
           label="Email Address"
           name="email"
           autoComplete="email"
           value={email}
           onChange={handleChange("email")}
         />
       </Grid>

       <Grid item xs={12}>
         <TextField
           variant="outlined"
           required
           fullWidth
           name="password"
           label="Password"
           type="password"
           id="password"
           autoComplete="current-password"
           value={password}
           onChange={handleChange("password")}
         />
       </Grid>

     </Grid>
     <br/>
     <Button
       type="submit"
       fullWidth
       variant="contained"
       color="primary"
       className={classes.submit}
       onClick={clickSubmit}
     >
       Submit
     </Button>
   </form>
 )

  const userInfo = () => {
    return (
      <Box component="span" m={1}>
        <Typography variant="h6">
         Profile Update
        </Typography>
        <br/>
        {profileUpdate(name, email, password)}
        {redirectUser(success)}
      </Box>
    )
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" color="inherit" >
         <Toolbar className={classes.toolbar}>
            <Typography
             component="h2"
             variant="h5"
             color="inherit"
             align="left"
             noWrap
             className={classes.toolbarTitle}>
              Update Profile
           </Typography>
           <IconButton href="/">
             <HomeIcon />
           </IconButton>
        </Toolbar>
      </AppBar>

      <Container className={classes.container}>
        {userInfo()}
      </Container>

      <AppBar
        position="fixed"
        color="inherit"
        className={classes.BottomBar}>
        <Grid container>

          <Grid item xs={6} sm={6}>
           <Link color="inherit" href="/cart">
              <ListItem>
                 <ListItemText align="center">
                    <Badge color="primary" badgeContent={itemTotal()}>
                       <ShoppingCartIcon/>
                    </Badge>
                    Keranjang </ListItemText>
              </ListItem>
           </Link>
          </Grid>

          <Grid item xs={6} sm={6}>
            <Link color="inherit" href="/shop">
               <ListItem>
                 <ListItemText align="center"> <StoreIcon/> Belanja </ListItemText>
               </ListItem>
            </Link>
          </Grid>

        </Grid>
      </AppBar>
    </div>
  );
}

export default Profile;
