import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LabelIcon from '@material-ui/icons/Label';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import StoreIcon from '@material-ui/icons/Store';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import ShopIcon from '@material-ui/icons/Shop';
import { signout, isAuthenticated } from '../auth';
import {itemTotal} from '../core/carthelpers';
import {getPurchaseHistory} from './apiuser';
import moment from 'moment'


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(5),
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: { main: grey[800] }, // Purple and green play nicely together.
  },
  typography: { useNextVariants: true },
});


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dashboard = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [history, setHistory] = useState([])

  const { user: { _id, name, email, role }} = isAuthenticated();

  const token = isAuthenticated().token

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

const userLinks = () => {
    return (
    <div>
      <List>
        {['Shop'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><StoreIcon /></ListItemIcon>
            <Link color="inherit"variant="body2" className={classes.link} href="/shop" >
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>


      <List>
        {['My Chart'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ?
              <Badge className={classes.margin} badgeContent={itemTotal()} color="primary">
                <ShoppingCartIcon />
              </Badge>
              :
              <ShoppingCartIcon />}</ListItemIcon>
            <Link color="inherit"variant="body2" className={classes.link} href="/cart" >
              <ListItemText primary={text} />
            </Link>
            </ListItem>
        ))}
      </List>

      <List>
        {['Update Profile'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><AccountCircle /></ListItemIcon>
            <Link color="inherit"variant="body2" className={classes.link} href={`/profile/${_id}`} >
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>

      <List>
        {['Sign Out'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <Link color="inherit"variant="body2" className={classes.link} onClick={() => signout(() => { window.history.pushState(null, null,"/")})} href="/" >
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
    )
  }

const navLinks = () => {
    return (
    <div>
    <List>
      {['Home'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <HomeIcon /> : <MailIcon />}</ListItemIcon>
          <Link color="inherit"variant="body2" className={classes.link} href="/" >
            <ListItemText primary={text} />
          </Link>
        </ListItem>
      ))}
    </List>

    </div>
    )
  }

const userInfo = () => {
    return (
      <Box component="span" m={1}>

      <ListItem button>
        <Typography variant="h6" >
          User Information
        </Typography>
        <Link color="inherit"variant="body2" className={classes.link} href={`/profile/${_id}`} >
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        </Link>
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

      </Box>
    )
  }

const userPurchaseHistory = () => {
  return (
    <Box component="span" m={1}>
      <ListItem button>
        <Typography variant="h6">
         Purchase History
        </Typography>
      </ListItem>
      {history.map((h, i) => {
          return (
            <List key={i} component="nav" aria-label="secondary mailbox folders">
              <Paper>
                  <ListItem button>
                    <ListItemText className={classes.itemText}>Order Status: {h.status}</ListItemText>
                  </ListItem>
                  {h.products.map((p, i) => {
                      return (
                          <div key={i}>
                             <ListItem button>
                               <ListItemIcon>
                                <ShopIcon />
                               </ListItemIcon>
                               <ListItemText>
                                 {p.name}
                               </ListItemText>
                             </ListItem>

                             <ListItem button>
                               <ListItemIcon>
                                <MonetizationOnIcon />
                               </ListItemIcon>
                               <ListItemText>
                                 Rp {p.price}
                               </ListItemText>
                             </ListItem>

                             <ListItem button>
                               <ListItemIcon>
                                <CalendarTodayIcon />
                               </ListItemIcon>
                               <ListItemText>
                                 {moment(h.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                               </ListItemText>
                             </ListItem>
                            <Divider/>
                          </div>
                      );
                  })}
              </Paper>
            </List>
          );
      })}
    </Box>
  )
}


  return (
    <div className={classes.root}>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
      <AppBar position="fixed" color="primary" >
         <Toolbar>
           <IconButton
            aria-label="show more"
            aria-haspopup="true"
            onClick={handleClickOpen}
            color="inherit"
           >
              <MenuIcon />
           </IconButton>
           <Typography className={classes.title} variant="h6" noWrap>
            User Profile
           </Typography>

        </Toolbar>


        <Dialog
         open={open}
         TransitionComponent={Transition}
         keepMounted
         onClose={handleClose}
         aria-labelledby="alert-dialog-slide-title"
         aria-describedby="alert-dialog-slide-description"
       >

         {navLinks()}
         <Divider />
         {userLinks()}
         <DialogActions>
           <Button onClick={handleClose} color="primary">
             Close
           </Button>
         </DialogActions>
       </Dialog>
      </AppBar>
    </MuiThemeProvider>

       <Container>
         {userInfo()}
          <Divider />
         {userPurchaseHistory()}
       </Container>
    </div>
  );
}

export default Dashboard;
