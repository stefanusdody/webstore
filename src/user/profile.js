import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import {Redirect} from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
import { itemTotal } from '../core/carthelpers';
import { read, update, updateUser } from './apiuser'


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


const Profile = ({match}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);


  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

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
            Update Profile
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
        {userInfo()}

      </main>
    </div>
  );
}

export default Profile;
