import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import InputIcon from '@material-ui/icons/Input';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MoreIcon from '@material-ui/icons/MoreVert';
import PaymentIcon from '@material-ui/icons/Payment';
import StoreIcon from '@material-ui/icons/Store';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import ListItemText from '@material-ui/core/ListItemText';
import {signout, isAuthenticated } from '../auth/index';
import {itemTotal} from './carthelpers';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
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

const theme = createMuiTheme({
  palette: {
    primary: { main: grey[800] }, // Purple and green play nicely together.
  },
  typography: { useNextVariants: true },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NavigationBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { user } = isAuthenticated()

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >

      <MenuItem>
         <IconButton aria-label="show 11 new notifications" color="inherit">
           <AccountCircle />
         </IconButton>
         <Link color="inherit"variant="body2" className={classes.link} href="/user/dashboard" >
          <ListItemText>Profile</ListItemText>
         </Link>
      </MenuItem>


      <MenuItem>
         <IconButton aria-label="show 4 new mails" color="inherit">
            <HomeIcon />
         </IconButton>
         <Link color="inherit"variant="body2" className={classes.link} href="/" >
           <ListItemText>Home</ListItemText>
         </Link>
      </MenuItem>

      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge color="primary" badgeContent={itemTotal()} className={classes.margin}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
         <Link color="inherit"variant="body2" className={classes.link} href="/cart" >
           <ListItemText>Cart</ListItemText>
         </Link>
      </MenuItem>


      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
            <StoreIcon />
        </IconButton>
          <Link color="inherit"variant="body2" className={classes.link} href="/shop" >
             <ListItemText>Shop</ListItemText>
          </Link>
      </MenuItem>

      <MenuItem>
        <IconButton color="inherit">
            <PaymentIcon />
        </IconButton>
          <Link color="inherit"variant="body2" className={classes.link} href="/paymentconfirmation" >
             <ListItemText>Payment Confirmation</ListItemText>
          </Link>
      </MenuItem>


      {!isAuthenticated() && (
           <div>
           <MenuItem onClick={handleProfileMenuOpen}>
             <IconButton
               aria-label="account of current user"
               aria-controls="primary-search-account-menu"
               aria-haspopup="true"
               color="inherit"
             >
                <InputIcon />
             </IconButton>
              <Link color="inherit"variant="body2" className={classes.link} href="/signin" >
                 <ListItemText>Sign In</ListItemText>
              </Link>
           </MenuItem>
           </div>
         )}



        {isAuthenticated() && (
          <MenuItem>
            <IconButton aria-label="show 11 new notifications" color="inherit">
                <ExitToAppIcon />
            </IconButton>
            <Link
              color="inherit"
              variant="body2"
              className={classes.link}
              href="/"
              onClick={() => signout(() => { window.history.pushState(null, null,"/")})}
              >
              <ListItemText>Sign Out</ListItemText>
             </Link>
          </MenuItem>
        )}
    </Dialog>
  );

  return (
    <div className={classes.grow}>
    <MuiThemeProvider theme={theme}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
           <Typography className={classes.title} variant="h6" noWrap>
             Adirasa
           </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

          <IconButton aria-label="show home" color="inherit">
            <Link color="inherit"variant="body2" className={classes.link} href="/" >
                <Typography className={classes.title} component="p">
                 Home
                </Typography>
            </Link>
          </IconButton>

            <IconButton aria-label="show cart" color="inherit">
             <Badge className={classes.margin} badgeContent={itemTotal()} color="primary">
               <Link color="inherit"variant="body2" className={classes.link} href="/cart" >
                 <Typography className={classes.title} component="p">
                  Cart
                 </Typography>
               </Link>
             </Badge>
            </IconButton>

            <IconButton aria-label="show shop" color="inherit">
              <Link color="inherit"variant="body2" className={classes.link} href="/shop" >
                  <Typography className={classes.title} component="p">
                   Shop
                  </Typography>
              </Link>
            </IconButton>


              <IconButton aria-label="show payment confirmation" color="inherit">

                <Link color="inherit"variant="body2" className={classes.link} href="/paymentconfirmation" >
                  <Typography className={classes.title} component="p">
                    Payment Confirmation
                  </Typography>
                </Link>
              </IconButton>

              <IconButton aria-label="show user dashboard" color="inherit">
                <Link color="inherit"variant="body2" className={classes.link} href="/user/dashboard" >
                  <Typography className={classes.title} component="p">
                   Profile
                  </Typography>
                </Link>
              </IconButton>


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

          </div>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleClickOpen}
          color="inherit"
        >
              <MoreIcon />
        </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </MuiThemeProvider>
    </div>
  );
}

export default NavigationBar;
