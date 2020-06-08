import React, {useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ShowImage from './showimage';

import { updateItem, removeItem} from './carthelpers';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    paddingTop: theme.spacing(2)
  },
  cover: {
    width: 151,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));


const CardProduct = ({
      product,
      showViewHomeContent=true,
      showViewMainContent=true,
      cartUpdate= false,
    }) => {

  const classes = useStyles();
  const [count, setCount] = useState(product.count);


  const showHomeContent = (showViewHomeContent) => {
    return(
      <Link href={`/product/${product._id}`}>
       <Card className={classes.root} >
          <CardMedia className={classes.cover}>
            <ShowImage item={product} url="product" />
          </CardMedia>
          <div className={classes.details}>
            <CardContent className={classes.content}>
             {showMainContent(showViewMainContent)}
            </CardContent>
          </div>
        </Card >
      </Link>
    )
  }

  const showCartContent = (showViewCartContent) => {
    return(
      <Link href={`/product/${product._id}`}>
       <Card className={classes.root} >
          <CardMedia className={classes.cover}>
            <ShowImage item={product} url="product" />
          </CardMedia>
          <div className={classes.details}>
            <CardContent className={classes.content}>
             {showMainContent(showViewMainContent)}
            </CardContent>
          </div>
        </Card >
      </Link>
    )
  }

  const showStock = (quantity) => {
      return quantity > 0 ?
      <Typography variant="subtitle1" color="textSecondary" align="left">
        Stock: {product.quantity} pcs
      </Typography>
        :
        <Typography variant="subtitle1" color="secondary" align="left">
        Stock:  Sold Out
        </Typography>
     }


  const showMainContent = (showViewMainContent) => {
    return(
      showViewMainContent && (
        <div>
        <Typography component="h5" variant="h5" align="left">
          {product.name}
        </Typography>
          {showStock(product.quantity)}
        <Typography variant="subtitle1" color="textSecondary" align="left">
          Rp {product.price}
        </Typography>
        </div>
      )
    );
  };


const cartShowCartUpdateOptions = (cartUpdate) => {
    return(
      cartUpdate && (
        <Card className={classes.root} >
          <CardContent className={classes.content}>
               <TextField
                id="outlined-number"
                label="Unit Buy"
                fullWidth
                value={count}
                onChange={handleChange(product._id)}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                variant="outlined"
              />
              <br/>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                onClick={() => removeItem(product._id)}
                size="small"
                color="secondary"
                href="/shopone"
              >
                Remove
              </Button>
          </CardContent>

        </Card>
      )
    )
  }

  const handleChange = productId => event => {
    setCount(event.target.value)
    if(event.target.value >= 1) {
      updateItem(productId, event.target.value)
    }
  }

return (
  <div>
    {showHomeContent(showViewHomeContent)}
    {cartShowCartUpdateOptions(cartUpdate)}
   </div>
    );
}

export default CardProduct;
