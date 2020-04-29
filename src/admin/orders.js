import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import CssBaseline from '@material-ui/core/CssBaseline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AppBar from '@material-ui/core/AppBar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PaymentIcon from '@material-ui/icons/Payment';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import CardOrder from './ordercard';
import OrderBoxes from './ordersbox';
import {orderstatus} from './fixedstatus';
import {listOrders, getStatusValues, updateOrderStatus} from './apiadmin';
import {signout, isAuthenticated } from '../auth'

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
  fixedHeight: {
  height: 240,
},
menuOrder: {
  marginTop: theme.spacing(3),
  textAlign: "center"
},
}));


const Orders = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }


  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const [error, setError] = useState(false);

  const {user, token} = isAuthenticated()

  const loadOrders = () => {
    listOrders(user._id, token).then(data => {
      if(data.error) {
        console.log(data.error);
      } else {
        setOrders(data)
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then(data => {
      if(data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    })
  }

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, [])

  const adminLinks = () => {
    return (
    <div>
      <List>
        {['Back to Dashboard'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <Link color="inherit"variant="body2" className={classes.link} href="/admin/dashboard" >
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>

      <List>
        {['Manage Payments'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><PaymentIcon /></ListItemIcon>
            <Link color="inherit"variant="body2" className={classes.link} href="/admin/payments" >
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>

      <List>
       {['Order Status'].map((text, index) => (
        <ListItem button key={text}>
          <Link color="inherit"variant="body2" className={classes.link} >
            <ListItemText primary={text} />
              <OrderBoxes orderstatus={orderstatus} />
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


  const showOrdersLength = () => {
    if(orders.length > 0) {
      return(
        <Typography className={classes.menuOrder} gutterBottom variant="h5" component="h1">
          Total Orders: {orders.length}
        </Typography>
      )
    } else {
      return (
        <Typography component="h1" variant="h5" color="secondary">
          No Orders
        </Typography>
      )
    }
  }


  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then(data => {
      if(data.error) {
        console.log("Status update failed");
      } else {
        loadOrders();
      }
    })
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Order List
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Home'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <Link color="inherit"variant="body2" className={classes.link} href="/" >
                <ListItemText primary={text} />
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        {adminLinks()}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
      {showOrdersLength()}
      <hr/>
      <Grid container spacing={2}>
         {orders.map((order, oindex) => (
          <Grid  key={oindex} item xs={12} sm={12} md={12}>
             <CardOrder order={order}/>
          </Grid>
        ))}
      </Grid>
      </main>
    </div>
  );
}

export default Orders;
