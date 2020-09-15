import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import PaymentIcon from '@material-ui/icons/Payment';
import OpenInNewOutlinedIcon from '@material-ui/icons/OpenInNewOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FreeBreakfastOutlinedIcon from '@material-ui/icons/FreeBreakfastOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import Badge from '@material-ui/core/Badge';
import { getPurchaseHistory } from '../user/apiuser'
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
  const [history, setHistory] = useState([]);
  const { user: { _id, name }} = isAuthenticated();
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

  const orderStatus = history.filter(histories => (histories.status === "Tunggu Pembayaran"))

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  const menuId = 'primary-search-account-menu';

  return (
    <div className={classes.grow}>

      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <div className={classes.toolbarTitle}>
           <Avatar alt="Remy Sharp" src={require(`../assets/favicon.ico`)} className={classes.large} />
          </div>


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
                   <ExitToAppIcon/>
                </Link>
                </IconButton>
              </div>
             )}

             {isAuthenticated() && (
               <div>
               <IconButton>
                 <Link color="inherit" href="/payment">
                   <Badge color="secondary" badgeContent={orderStatus.length}>
                      <PaymentIcon />
                   </Badge>
                 </Link>
               </IconButton>


                <Link color="inherit" href="/cart">
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
                  <OpenInNewOutlinedIcon/>
               </IconButton>
               </div>
             )}

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavigationBar;
