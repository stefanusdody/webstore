import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Toolbar from '@material-ui/core/Toolbar';
import LabelIcon from '@material-ui/icons/Label';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StoreIcon from '@material-ui/icons/Store';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { isAuthenticated } from '../auth';
import {itemTotal} from '../core/carthelpers';
import { getPurchaseHistory } from './apiuser';


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
    marginTop: theme.spacing(5),
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  }
}));


const Dashboard = () => {
  const classes = useStyles();
  const [history, setHistory] = useState([])

  const { user: { _id, name, email, role }} = isAuthenticated();

  const token = isAuthenticated().token


  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        setHistory(data)
      }
    })
  }

  useEffect(() => {
    init(_id, token)
  }, [])


const userInfo = () => {
    return (
      <Box component="span" m={1}>
      <ListItem button>
        <Typography variant="h6" >
          User Information
        </Typography>
      </ListItem>

        <List>
          {[''].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <AccountCircle /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>

        <List>
          {[''].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <MailOutlineIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={email} />
            </ListItem>
          ))}
        </List>

        <List>
          {[''].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <LabelIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={role === 1 ? "admin" : "Registered User"} />
            </ListItem>
          ))}
        </List>
        <DialogActions>
          <Button href={`/profile/${_id}`} color="primary">
            Edit Profile
          </Button>
          <Button href={'/user/purchasehistory'} color="primary">
            Histori Pembelian
          </Button>
        </DialogActions>
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
              User Profile
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

export default Dashboard;
