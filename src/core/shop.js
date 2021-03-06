import React, {useState, useEffect} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchItem from './search';
import CardProduct from "./card";
import LocalCafeOutlinedIcon from '@material-ui/icons/LocalCafeOutlined';
import LocalDrinkOutlinedIcon from '@material-ui/icons/LocalDrinkOutlined';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import Typography from '@material-ui/core/Typography';
import { getFilteredProducts, getAllProducts } from './apicore';
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
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  cardNonCoffee: {
    marginBottom: theme.spacing(10),
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

  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: []}
  });

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  //Load categories and set form data
  const init = () => {
    getAllProducts().then(data => {
      if(data.error) {
        setError(data.error)
      } else {
        setProducts(data)
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

  const loadMoreButton = () => {
    return (
      size > 0 && size >= limit && (
        <Button onClick={loadMore} size="small" color="secondary">
          Load More
        </Button>
      )
    )
  }

const coffeeProduct = products.filter(product => (product.category.name === "Coffee"))
const nonCoffeeProduct = products.filter(product => (product.category.name === "Non Coffee"))
const foodsProduct = products.filter(product => (product.category.name === "Foods"))

const coffeeProductMessage = (coffeeProduct) => {
  if(coffeeProduct.length > 0) {
    return (
      <div>
      <Typography  gutterBottom variant="p" component="h5" align="left">
         <LocalCafeOutlinedIcon/> Coffee
      </Typography>
       <Grid container spacing={2} className={classes.card}>
           {coffeeProduct.map((product, i) => (
             <Grid key={i} item xs={12} sm={6} md={3}>
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
      </div>
    )
   }
   if( coffeeProduct.length < 1) {
     return (
       <div>
       <Typography  gutterBottom variant="p" component="h5" align="left">

       </Typography>
       </div>
     )
    }
}

const nonCoffeeProductMessage = (nonCoffeeProduct) => {
  if(nonCoffeeProduct.length > 0) {
    return (
      <div>
      <Typography  gutterBottom variant="p" component="h5" align="left">
         <LocalDrinkOutlinedIcon/> Non Coffee
      </Typography>
       <Grid container spacing={2} className={classes.cardNonCoffee}>
           {nonCoffeeProduct.map((product, i) => (
             <Grid key={i} item xs={12} sm={6} md={3}>
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
      </div>
    )
   }
   if( nonCoffeeProduct.length < 1) {
     return (
       <div>
       <Typography  gutterBottom variant="p" component="h5" align="left">

       </Typography>
       </div>
     )
    }
}

const foodsProductMessage = (foodsProduct) => {
  if(foodsProduct.length > 0) {
    return (
      <div>
      <Typography  gutterBottom variant="p" component="h5" align="left">
         <FastfoodOutlinedIcon/> Foods
      </Typography>
       <Grid container spacing={2} className={classes.cardNonCoffee}>
           {foodsProduct.map((product, i) => (
             <Grid key={i} item xs={12} sm={6} md={3}>
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
      </div>
    )
   }
   if( foodsProduct.length < 1) {
     return (
       <div>
       <Typography  gutterBottom variant="p" component="h5" align="left">

       </Typography>
       </div>
     )
    }
}

return (
   <div className={classes.root}>
      <CssBaseline />
       <Container className={classes.container}>
          <SearchItem/>
          <br/>
          {coffeeProductMessage(coffeeProduct)}
          {nonCoffeeProductMessage(nonCoffeeProduct)}
          {foodsProductMessage(foodsProduct)}
        {loadMoreButton()}
       </Container>
    </div>
  );
}

export default Shop;
