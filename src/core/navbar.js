import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import CreateIcon from '@material-ui/icons/Create';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MoreIcon from '@material-ui/icons/MoreVert';
import PaymentIcon from '@material-ui/icons/Payment';
import StorefrontIcon from '@material-ui/icons/Storefront';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
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


const NavigationBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { user } = isAuthenticated()

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

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
            <StorefrontIcon />
        </IconButton>
          <Link color="inherit"variant="body2" className={classes.link} href="/product" >
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


      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <div>
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
              <DashboardIcon />
          </IconButton>
          <Link color="inherit"variant="body2" className={classes.link} href="/user/dashboard" >
            <ListItemText>Dashboard</ListItemText>
           </Link>
        </MenuItem>
        </div>
      )}



      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <div>
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
              <DashboardIcon />
          </IconButton>
          <Link color="inherit"variant="body2" className={classes.link} href="/admin/dashboard" >
            <ListItemText>Dashboard</ListItemText>
           </Link>
        </MenuItem>
        </div>
      )}




      {!isAuthenticated() && (
           <div>
           <MenuItem onClick={handleProfileMenuOpen}>
             <IconButton
               aria-label="account of current user"
               aria-controls="primary-search-account-menu"
               aria-haspopup="true"
               color="inherit"
             >
                <AccountCircle />
             </IconButton>
              <Link color="inherit"variant="body2" className={classes.link} href="/signin" >
                 <ListItemText>Sign In</ListItemText>
              </Link>
           </MenuItem>

           <MenuItem onClick={handleProfileMenuOpen}>
             <IconButton
               aria-label="account of current user"
               aria-controls="primary-search-account-menu"
               aria-haspopup="true"
               color="inherit"
             >
                <CreateIcon />
             </IconButton>
              <Link color="inherit"variant="body2" className={classes.link} href="/signup" >
                 <ListItemText>Sign Up</ListItemText>
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
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="default">
        <Toolbar>
           <Typography className={classes.title} variant="h6" noWrap>
             Adirasa
           </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
             <Badge className={classes.margin} badgeContent={itemTotal()} color="primary">
               <Link color="inherit"variant="body2" className={classes.link} href="/cart" >
                 <Typography className={classes.title} component="p">
                  Cart
                 </Typography>
               </Link>
             </Badge>
            </IconButton>

            <IconButton aria-label="show 4 new mails" color="inherit">
              <Link color="inherit"variant="body2" className={classes.link} href="/product" >
                  <Typography className={classes.title} component="p">
                   Shop
                  </Typography>
              </Link>
            </IconButton>


              <IconButton aria-label="show 11 new notifications" color="inherit">

                <Link color="inherit"variant="body2" className={classes.link} href="/paymentconfirmation" >
                  <Typography className={classes.title} component="p">
                    Payment Confirmation
                  </Typography>
                </Link>
              </IconButton>


            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Link color="inherit"variant="body2" className={classes.link} href="/user/dashboard" >
                  <Typography className={classes.title} component="p">
                   Dashboard
                  </Typography>
                </Link>
              </IconButton>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Link color="inherit"variant="body2" className={classes.link} href="/admin/dashboard" >
                  <Typography className={classes.title} component="p">
                    Dashboard
                   </Typography>
                </Link>
              </IconButton>
            )}



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

                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Link color="inherit"variant="body2" className={classes.link} href="/signup" >
                   <Typography className={classes.title} component="p">
                     Sign Up
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
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}

export default NavigationBar;
