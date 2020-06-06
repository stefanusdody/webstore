import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SearchItem from './search';
import CheckBoxes from "./checkbox";
import CardProduct from "./card";
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { getCategories, getFilteredProducts } from './apicore';
import {prices} from './fixedprices';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(3),
  },
  rootButton: {
    '& > *': {
      margin: theme.spacing(1),
    },
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  BottomBar: {
    top: 'auto',
    bottom: 0,
  },
  container: {
    textAlign: "center",
    marginTop: theme.spacing(4)
  },
  card: {
    textAlign: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(8),
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(12),
    right: theme.spacing(2),
  },
}));


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
       <Container className={classes.container}>

           <Fab size="medium" color="secondary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
              <SearchOutlinedIcon />
           </Fab>

           <Dialog
             open={open}
             onClose={handleClose}
             aria-labelledby="alert-dialog-title"
             aria-describedby="alert-dialog-description"
            >

            {filtersLinks()}
            <DialogActions>
              <Button onClick={handleClose}  autoFocus>
               Close
             </Button>
            </DialogActions>
          </Dialog>


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
                     showDetailProduct={false}/>
                 </Grid>
                ))}
          </Grid>
        {loadMoreButton()}
       </Container>
    </div>
  );
}

export default Shop;
