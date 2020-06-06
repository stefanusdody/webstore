import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {signout, isAuthenticated } from '../auth/index';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  toolbarTitle: {
    flex: 1,
    margin: theme.spacing(1)
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));


const NavigationBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  const menuId = 'primary-search-account-menu';


  return (
    <div className={classes.grow}>

      <AppBar position="fixed" color="inherit">
        <Toolbar>
            <Avatar>H</Avatar>
             {!isAuthenticated() && (
               <div>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                <Link color="inherit"variant="body2" className={classes.link} href="/signin" >
                   <Typography className={classes.title} component="p">
                    Sign In
                   </Typography>
                </Link>
                </IconButton>
              </div>
             )}

             {isAuthenticated() && (
               <IconButton
                aria-label="exit application"
                color="inherit"
                href="/"
                onClick={() => signout(() => { window.history.pushState(null, null,"/")})}
                >
                   <Typography className={classes.title} component="p">
                    Sign Out
                   </Typography>
               </IconButton>
             )}

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavigationBar;
