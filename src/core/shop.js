import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { fade, makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Container from '@material-ui/core/Container';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import SearchItem from './search';
import CheckBoxes from "./checkbox";
import CardProduct from "./card";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import { signout } from '../auth';
import { getCategories, getFilteredProducts } from './apicore';
import {prices} from './fixedprices';
import {itemTotal} from './carthelpers';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(3),
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
  container: {
    textAlign: "center",
    marginTop: theme.spacing(5),
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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 10,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  img: {
    width: "60%"
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
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

const Shop = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

    if(filterBy === "price") {
      let priceValue = handlePrice(filters)
      newFilters.filters[filterBy] = priceValue;
    }
    loadFilteredResults(myFilters.filters)
    setMyFilters(newFilters);
  };

  const handlePrice = value => {
    const data = prices
    let array = []

    for(let key in data) {
      if(data[key]._id === parseInt(value)) {
        array = data[key].array
      }
    }
    return array;
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
    </List>

    <List>
      {['My Cart'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <ShoppingCartIcon /> : <ShoppingCartIcon />}</ListItemIcon>
          <Link color="inherit"variant="body2" className={classes.link} href="/cart" >
            <Badge badgeContent={itemTotal()} color="primary">
              <ListItemText primary={text} />
            </Badge>
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
      <MuiThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        color="primary"
      >

        <Toolbar>
          <IconButton
           aria-label="show more"
           aria-haspopup="true"
           onClick={handleClickOpen}
           color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>


        <Dialog
         open={open}
         TransitionComponent={Transition}
         keepMounted
         onClose={handleClose}
         aria-labelledby="alert-dialog-slide-title"
         aria-describedby="alert-dialog-slide-description"
       >

         {navLinks()}
         <Divider />
         {filtersLinks()}
         <DialogActions>
           <Button onClick={handleClose} color="primary">
             Close
           </Button>
         </DialogActions>
       </Dialog>
      </AppBar>
    </MuiThemeProvider>

    <Container>
       <div className={classes.container}>
         <SearchItem/>
       </div>
        <Grid container spacing={2} className={classes.card}>
          {filteredResults.map((product, i) => (
            <Grid key={i} item xs={6} sm={3} md={3}>
              <CardProduct
               product={product}
               showViewImage= {true}
               showViewImageCarousel={false}
               showViewDescriptions={false}
               showViewCategories={false}
               showAddedProduct={false}
               showDetailProduct={false}
               />
            </Grid>
          ))}
        </Grid>
        {loadMoreButton()}
       </Container>
    </div>
  );
}

export default Shop;
