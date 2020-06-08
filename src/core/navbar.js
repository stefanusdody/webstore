import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import OpenInNewOutlinedIcon from '@material-ui/icons/OpenInNewOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FreeBreakfastOutlinedIcon from '@material-ui/icons/FreeBreakfastOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import Badge from '@material-ui/core/Badge';
import {signout, isAuthenticated } from '../auth/index';
import {itemTotal} from './carthelpers';

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
  grey: {
    color: '#fff',
    backgroundColor: grey[900],
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
            <Avatar className={classes.grey}>
              <FreeBreakfastOutlinedIcon/>
            </Avatar>
            <Typography className={classes.toolbarTitle}/>

             {!isAuthenticated() && (
               <div>
               <Link color="inherit" href="/cart">
                  <Badge color="secondary" badgeContent={itemTotal()}>
                     <LocalMallOutlinedIcon/>
                  </Badge>
               </Link>

                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                <Link color="inherit"variant="body2" className={classes.link} href="/signin" >
                   <OpenInNewOutlinedIcon/>
                </Link>
                </IconButton>
              </div>
             )}

             {isAuthenticated() && (
               <div>

                <Link  href="/cart">
                   <Badge color="secondary"  badgeContent={itemTotal()}>
                      <LocalMallOutlinedIcon/>
                   </Badge>
                </Link>

               <IconButton
                aria-label="exit application"
                color="inherit"
                href="/"
                onClick={() => signout(() => { window.history.pushState(null, null,"/")})}
                >
                  <ExitToAppIcon/>
               </IconButton>
               </div>
             )}

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavigationBar;
