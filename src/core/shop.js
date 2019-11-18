import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import SearchItem from './search';
import CheckBoxes from "./checkbox";
import CardProduct from "./card";
import { signout } from '../auth';
import { getCategories, getFilteredProducts } from './apicore';
import {itemTotal} from './carthelpers';


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
  card: {
    textAlign: "center",
    marginTop: theme.spacing(2),
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
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '50%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
}));


const Shop = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: []}
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  //Load categories and set form data
  const init = () => {
    getCategories().then(data => {
      if(data.error) {
        setError(data.error)
      } else {
        setCategories(data)
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then(data => {
      if(data.error) {
        setError(data.error)
      } else {
        setFilteredResults(data.data)
        setSize(data.size)
        setSkip(0)
      }
    });
  };

  const loadMore = () => {
    //load more
    let toSkip = skip + limit
    getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
      if(data.error) {
        setError(data.error)
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size)
        setSkip(toSkip)
      }
    });
  };

  useEffect(() => {
    init()
    loadFilteredResults(skip, limit, myFilters.filters)
  }, [])

  const handleFilters = (filters, filterBy) => {
    // console.log('SHOP',filters, filterBy);
    const newFilters = {...myFilters};
    newFilters.filters[filterBy] = filters;

    loadFilteredResults(myFilters.filters)
    setMyFilters(newFilters);
  };

  const filtersLinks = () => {
    return (
    <div>
     {/* Filter Tools */}
      <List>
        {['Search by Category'].map((text, index) => (
          <ListItem button key={text}>
            <Link color="inherit"variant="body2" className={classes.link}>
              <ListItemText primary={text} />
              <CheckBoxes categories={categories} handleFilters={filters => handleFilters(filters, "category")} />
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
    {/* Navigation Tools */}
    <List>
      {['Home'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <HomeIcon /> : <HomeIcon />}</ListItemIcon>
          <Link color="inherit"variant="body2" className={classes.link} href="/" >
            <ListItemText primary={text} />
          </Link>
        </ListItem>
      ))}

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


      {['Sign Out'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <ExitToAppIcon /> : <ExitToAppIcon /> }</ListItemIcon>
          <Link color="inherit"variant="body2" className={classes.link} onClick={() => signout(() => { window.history.pushState(null, null,"/")})} href="/" >
              <ListItemText primary={text} />
          </Link>
          </ListItem>
      ))}
    </List>
    </div>
    )
  }

  const loadMoreButton = () => {
    return (
      size > 0 && size >= limit && (
        <Button onClick={loadMore} size="small" color="secondary">
          Load More
        </Button>
      )
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
          <Link color="inherit"variant="body2" className={classes.link} href="/" >
            <Typography className={classes.title} variant="h6" noWrap>
              Adirasa
            </Typography>
         </Link>
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
        {filtersLinks()}
      </Drawer>
       <main
         className={clsx(classes.content, {
           [classes.contentShift]: open,
           })}
       >
       <div>
       </div>
         <SearchItem />
       <Typography className={classes.card} gutterBottom variant="h5" component="h1">
           Pilih Snack Favorite Kamu
       </Typography>
        <Grid container spacing={4}>
          {filteredResults.map((product, i) => (
            <Grid key={i} item xs={12} sm={3} md={3}>
              <CardProduct
               product={product}
               showViewImage= {true}
               showViewImageCarousel={false}
               showViewDescriptions={false}
               showViewCategories={false}
               showAddedProduct={false}
               />
            </Grid>
          ))}
        </Grid>
        <br/>
        {loadMoreButton()}
       </main>
    </div>
  );
}

export default Shop;
