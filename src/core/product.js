import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import 'pure-react-carousel/dist/react-carousel.es.css';
import ShowImage from './showimage';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CardProduct from './card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import StoreIcon from '@material-ui/icons/Store';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import { read, listRelated } from './apicore';
import { addItem } from './carthelpers';


const useStyles = makeStyles(theme => ({
  BottomBar: {
    top: 'auto',
    bottom: 0,
  },
  relatedProduct: {
    marginBottom: theme.spacing(10)
  },
  layout: {
    width: 'auto',
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  listItem: {
    padding: theme.spacing(1, 0),
  }
}))



const Product = (props) => {
 const classes = useStyles();
 const [product, setProduct] = useState({})
 const [relatedProduct, setRelatedProduct] = useState([])
 const [error, setError] = useState(false)

 const addToCart = () => {
   addItem(product)
 }

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


const showStock = (quantity) => {
    return quantity > 0 ?
    <ListItem className={classes.listItem}>
      <ListItemText primary="Stok" />
      <Typography variant="body2">{product.quantity} pcs</Typography>
    </ListItem>
      :
      <ListItem className={classes.listItem}>
        <ListItemText primary="Stok" />
        <Typography variant="body2" color="secondary">Sold Out</Typography>
      </ListItem>
   }

const showCartButton = (quantity) => {
     return quantity > 0 ?
     <Button onClick={addToCart} variant="outlined" color="secondary" fullWidth href="/shopone">
       Pesan
     </Button>
       :
      <Button variant="contained" color="secondary" fullWidth>
         SOLD OUT
      </Button>
   }

return (
  <div>
    <CssBaseline />
    <main className={classes.layout}>
      <Paper className={classes.paper}>
      {product && product.description && (
        <Container align="center">
         <ShowImage item={product} url="product" />
         <br/>
           {showCartButton(product.quantity)}
         <List disablePadding>
              <br/>
                <Typography variant="body2" component="p" align="left">
                   Deskripsi product :
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" align="left">
                   {product.name}
                </Typography>
                <br/>
                <Typography variant="body2" component="p" align="left">
                   Deskripsi product :
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" align="left">
                   {product.description}
                </Typography>

               <ListItem className={classes.listItem}>
                 <ListItemText primary="harga" />
                 <Typography variant="body2">Rp {product.price}</Typography>
               </ListItem>
               {showStock(product.quantity)}
         </List>
        </Container>
       )}
      </Paper>
    </main>
    <Container>
    <Typography component="h1" variant="h4" align="center">
        Related Product
    </Typography>
    <br/>
     <Grid container spacing={2} className={classes.relatedProduct}>
       {relatedProduct.map((p, i) => (
         <Grid key={i} item xs={12} sm={12} md={12}>
           <CardProduct
             product={p}
             showViewProductButton={false}
             showViewAddCart={false}
              />
         </Grid>
       ))}
     </Grid>
     </Container>
  </div>
  );
};

export default Product;
