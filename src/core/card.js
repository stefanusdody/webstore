import React, {useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShowImage from './showimage';

import { updateItem, removeItem} from './carthelpers';

const useStyles = makeStyles(theme => ({
  root: {
   maxWidth: 345,
 },
 media: {
   textAlign: "center",
 }
}));


const CardProduct = ({
      product,
      showViewMainPicture=true,
      showViewMainContent=true,
      showViewAddCart = true,
      showViewDescriptions = true,
      showViewCategories = true,
      cartUpdate= false,
      showBuyButton=true,
      showRemoveProductButton=false
    }) => {

  const classes = useStyles();
  const [count, setCount] = useState(product.count);

  const showMainContent = (showViewMainContent) => {
    return(
      showViewMainContent && (
        <div>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Rp {product.price}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Stock : {product.quantity}
        </Typography>
        </div>
      )
    );
  };


const cartShowCartUpdateOptions = (cartUpdate) => {
    return(
      cartUpdate && (
        <div className="input-group mb-3">
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
              href="/shop"
            >
              Remove
            </Button>
       </div>
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
        <Card elevation={3} className={classes.root} >
          <CardActionArea className={classes.media}>
          <Link href={`/product/${product._id}`}>
             <ShowImage item={product} url="product" />
          </Link>
              <CardContent className={classes.media}>
               {showMainContent(showViewMainContent)}
               {cartShowCartUpdateOptions(cartUpdate)}
              </CardContent>
          </CardActionArea>
      </Card >
    );
}

export default CardProduct;
