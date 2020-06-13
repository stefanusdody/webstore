import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';


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
  BottomBar: {
    top: 'auto',
    bottom: 0,
  },
}));


const NavigationBarBottom = () => {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
    <AppBar
      position="fixed"
      color="inherit"
      className={classes.BottomBar}>
      <Grid container>

       <Grid item xs={3} sm={3} md={3}>
         <Link color="inherit" href="/">
           <ListItem>
              <ListItemText align="center" variant="caption"> <HomeOutlinedIcon /> Home </ListItemText>
           </ListItem>
         </Link>
       </Grid>

       <Grid item xs={3} sm={3} md={3}>
         <Link color="inherit" href="/orderlist ">
            <ListItem>
               <ListItemText align="center"> <FormatListBulletedOutlinedIcon/> Order </ListItemText>
            </ListItem>
         </Link>
       </Grid>


        <Grid item xs={3} sm={3} md={3}>
          <Link color="inherit" href="/shop">
            <ListItem>
               <ListItemText align="center"> <MenuBookOutlinedIcon /> Menu </ListItemText>
            </ListItem>
          </Link>
        </Grid>


        <Grid item xs={3} sm={3} md={3}>
          <Link color="inherit" href="/user/dashboard">
             <ListItem>
                <ListItemText align="center"> <AccountCircleOutlinedIcon/> Account </ListItemText>
             </ListItem>
          </Link>
        </Grid>

      </Grid>
    </AppBar>
    </div>
  );
}

export default NavigationBarBottom;
