import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import HomeIcon from '@material-ui/icons/Home';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import ShopIcon from '@material-ui/icons/Shop';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import StoreIcon from '@material-ui/icons/Store';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { isAuthenticated } from '../auth';
import { getPurchaseHistory } from './apiuser'
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
  BottomBar: {
    top: 'auto',
    bottom: 0,
  },
  container: {
    marginBottom: theme.spacing(5),
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
  itemText: {
    fontStyle: 'italic'
  },
  toolbarTitle: {
    flex: 1,
  },
}));


const PurchaseHistory = () => {
  const classes = useStyles();

  const [history, setHistory] = useState([]);

  const {user: {_id }} = isAuthenticated();

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


const purchaseHistory = history => {
      return (
        <Box component="span" m={1}>
          <ListItem button>
          </ListItem>
          { history.map((h, i) => {
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
                                     {moment(h.createdAt).format("dddd , MMMM Do YYYY")}
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
      );
  };


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
              Histori Pembelian
           </Typography>
           <IconButton href="/">
             <HomeIcon />
           </IconButton>
        </Toolbar>
      </AppBar>

      <Container className={classes.container}>
        {purchaseHistory(history)}
      </Container>

      <AppBar
        position="fixed"
        color="inherit"
        className={classes.BottomBar}>
        <Grid container>

          <Grid item xs={6} sm={6}>
           <Link color="inherit" href="/shop">
              <ListItem>
                 <ListItemText align="center">
                    <StoreIcon/>
                     Belanja </ListItemText>
              </ListItem>
           </Link>
          </Grid>

          <Grid item xs={6} sm={6}>
            <Link color="inherit" href="/user/dashboard">
               <ListItem>
                 <ListItemText align="center"> <AccountCircle/> Profile </ListItemText>
               </ListItem>
            </Link>
          </Grid>

        </Grid>
      </AppBar>

    </div>
  );
}

export default PurchaseHistory;
