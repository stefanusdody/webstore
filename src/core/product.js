import React, {useState, useEffect} from 'react';
import CardProduct from './card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import { read, listRelated} from './apicore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    alignItems: 'center',
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
  },
  cardTyphographic: {
    alignItems: 'center',
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
  },
  cardRelation: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  }
}))

const Product = (props) => {
 const classes = useStyles();

 const [product, setProduct] = useState({})
 const [relatedProduct, setRelatedProduct] = useState([])
 const [error, setError] = useState(false)

 const loadSingleProduct = productId => {
   read(productId).then(data => {
     if(data.error) {
       setError(data.error);
     } else {
       setProduct(data);
       //fetch related products
       listRelated(data._id).then(data => {
         if(data.error) {
           setError(data.error)
         } else {
           setRelatedProduct(data);
         }
       })
     }
   })
 }

 useEffect(() => {
   const productId = props.match.params.productId
   loadSingleProduct(productId)
 }, [props])

 const goBack = () => (
   <Grid container>
     <MenuItem >
       <IconButton  href="/shop" variant="body2" fontSize="large">
          <ArrowBackIcon/>
       </IconButton>
       <ListItemText>Kembali</ListItemText>
     </MenuItem>
   </Grid>
 );

  return(
    <Container>
      <Grid container spacing={2} className={classes.card}>
      {goBack()}
      {product && product.description && (
        <Grid  item xs={12} sm={12} md={12}>
          <CardProduct
           product={product}
           showViewProductButton={false}
           showViewAddCart={true}
           />
        </Grid>
       )}
      </Grid>

    <Typography className={classes.cardTyphographic} gutterBottom variant="h5" component="h1">
        Related Product
    </Typography>
     <Grid container spacing={4} className={classes.cardRelation} >
       {relatedProduct.map((p, i) => (
         <Grid key={i} item xs={12} sm={6} md={6}>
           <CardProduct
             product={product}
             showViewProductButton={false}
             showViewAddCart={true}
              />
         </Grid>
       ))}
     </Grid>
    </Container>
  );
};

export default Product;
