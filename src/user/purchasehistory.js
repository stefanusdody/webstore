import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorefrontIcon from '@material-ui/icons/Storefront';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { signout, isAuthenticated } from '../auth';
import {itemTotal} from '../core/carthelpers';
import {getPurchaseHistory} from './apiuser'
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
  itemText: {
    fontStyle: 'italic'
  }
}));


const PurchaseHistory = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [history, setHistory] = useState([]);

  const {user: {_id }} = isAuthenticated();

  const token = isAuthenticated().token

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

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
            <ListItemIcon>{index % 2 === 0 ? <StorefrontIcon /> : <MailIcon />}</ListItemIcon>
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
            <ListItemIcon>{index % 2 === 0 ? <AccountCircle /> : <MailIcon />}</ListItemIcon>
            <Link color="inherit"variant="body2" className={classes.link} href={`/profile/${_id}`} >
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>

      <List>
        {['Sign Out'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <ExitToAppIcon /> : <MailIcon />}</ListItemIcon>
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




  const purchaseHistory = history => {
      return (
          <div className="card mb-5">
              <h3 className="card-header">Purchase history</h3>
              <ul className="list-group">

                      {history.map((h, i) => {
                          return (
                            <li key={i} className="list-group-item">
                              <div >
                                 <ListItemText className={classes.itemText}>Order Status: {h.status}</ListItemText>
                                   <hr />
                                  {h.products.map((p, i) => {
                                      return (
                                          <div key={i}>
                                              <ListItemText>Product name: {p.name}</ListItemText>
                                              <ListItemText>Product price: Rp {p.price}</ListItemText>
                                              <ListItemText>
                                                  Purchased On:{" "}
                                                  {moment(p.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                                              </ListItemText>
                                              <hr />
                                          </div>
                                      );
                                  })}
                                  <hr />

                              </div>
                              </li>
                          );
                      })}

              </ul>
          </div>
      );
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
            Purchase History
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
        {navLinks()}
        <Divider />
        {userLinks()}
      </Drawer>
        <main
          className={clsx(classes.content, {
          [classes.contentShift]: open,
         })}
        >
        {purchaseHistory(history)}
      </main>
    </div>
  );
}

export default PurchaseHistory;
