import React from 'react';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import Box from '@material-ui/core/Box';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import CssBaseline from '@material-ui/core/CssBaseline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AppBar from '@material-ui/core/AppBar';
import UpdateIcon from '@material-ui/icons/Update';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import LabelIcon from '@material-ui/icons/Label';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ViewListIcon from '@material-ui/icons/ViewList';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
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
}));


const AdminDashboard = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { user: { _id, name, email, role }} = isAuthenticated();

  const adminLinks = () => {
    return (
    <div>
      <List>
        {['Create Category'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><PlaylistAddIcon/></ListItemIcon>
            <Link color="inherit"variant="body2" className={classes.link} href="/create/category" >
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>

      <List>
        {['Create Product'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><LibraryAddIcon/></ListItemIcon>
            <Link color="inherit"variant="body2" className={classes.link} href="/create/product" >
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>

      <List>
        {['View Orders'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><ViewListIcon /></ListItemIcon>
            <Link color="inherit"variant="body2" className={classes.link} href="/admin/orders" >
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>

      <List>
        {['Manage Products'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><UpdateIcon /></ListItemIcon>
            <Link color="inherit"variant="body2" className={classes.link} href="/admin/products" >
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>

      <List>
        {['Sign Out'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><ExitToAppIcon/></ListItemIcon>
            <Link color="inherit"variant="body2" className={classes.link} onClick={() => signout(() => { window.history.pushState(null, null,"/")})} href="/" >
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
    )
  }

  const adminInfo = () => {
    return (
      <Box component="span" m={1}>
        <Typography variant="h6">
         Admin Information
        </Typography>

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
                <ListItemText primary={role === 1 ? "admin" : "Register User"} />
            </ListItem>
          ))}
        </List>

      </Box>
    )
  }


  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

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
            Dashboard
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
              <ListItemIcon>{index % 2 === 0 ? <HomeIcon /> : <MailIcon />}</ListItemIcon>
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
        {adminInfo()}
      </main>
    </div>
  );
}

export default AdminDashboard;
