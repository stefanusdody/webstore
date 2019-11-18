import React, {useState, useEffect} from 'react';
import SearchItem from './search';
import CardProduct from './card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {getProducts} from './apicore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    textAlign: "center"
  },
  cardGrid: {
    marginTop: theme.spacing(10),
    height: '30vh',
    display: 'flex',
    flexDirection: 'column',
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

const Home = () => {
  const classes = useStyles();
  const [productsBySell, setProductsBySell] = useState([])
  const [productsByArrival, setProductsByArrival] = useState([])
  const [error, setError] = useState(false)


  const loadProductsBySell = () => {
    getProducts('sold').then(data => {
      if(data.error) {
        setError(data.error)
      } else {
        setProductsBySell(data)
      }
    })
  }

  const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
      if(data.error) {
        setError(data.error)
      } else {
        setProductsByArrival(data)
      }
    })
  }

  useEffect(() => {
    loadProductsByArrival()
    loadProductsBySell()
  }, [])

    return (
     <div>
       <SearchItem/>
       <Container>
      <Typography className={classes.card} gutterBottom variant="h5" component="h1">
         New Arrival
      </Typography>
        <Grid container spacing={2}>
           {productsByArrival.map((product, i) => (
             <Grid  key={i} item xs={12} sm={6} md={3}>
                 <CardProduct
                  product={product}
                  showViewImage= {true}
                  showViewImageCarousel={false}
                  showViewDescriptions={false}
                  />
             </Grid>
           ))}
        </Grid>
      </Container>
      <br/>
      <Container>
      <hr/>
      <Typography className={classes.card} gutterBottom variant="h5" component="h1">
          Best Seller
      </Typography>
       <Grid container spacing={4}>
          {productsBySell.map((product, i) => (
            <Grid  key={i} item xs={12} sm={6} md={3}>
              <CardProduct
               className={classes.cardSize}
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
       </Container>
     </div>
     );

}

export default Home;
