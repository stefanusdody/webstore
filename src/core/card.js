import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import pink from '@material-ui/core/colors/pink';
import { createMuiTheme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Redirect} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ShowImage from './showimage';
import moment from 'moment';
import {addItem, updateItem, removeItem} from './carthelpers';
import {isAuthenticated} from '../auth'


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    textAlign: "center",
  },
  card: {
    maxWidth: "100%",
  },
  image: {
    marginTop: theme.spacing(3)
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  desc: {
    textAlign: "center"
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: { main: pink[500] }, // Purple and green play nicely together.
  },
  typography: { useNextVariants: true },
});

const CardProduct = ({
      product,
      showViewAddCart = true,
      showViewDescriptions = true,
      showViewCategories = true,
      cartUpdate= false,
      showBuyButton=true,
      showRemoveProductButton=false
    }) => {

  const classes = useStyles();
  const [redirect , setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const preventDefault = (event) => event.preventDefault();
  const [state, setState] = useState({
    open: true
  })
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true)
    })
  }

  const shouldRedirect = redirect => {
    if(redirect) {
      return <Redirect to="/checkout"/>
    }
  }

  const showAddToChartButton = (showViewAddCart) => {
    return(
      showViewAddCart && (
        <Button fullWidth onClick={addToCart} size="small" color="secondary" href="/checkout">
          Buy Now
        </Button>
      )
    );
  };


const showRemoveButton = (showRemoveProductButton) => {
    return(
      showRemoveProductButton && (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={() => removeItem(product._id)}
          size="small"
          color="secondary"
          href="/checkout"
        >
          Remove
        </Button>
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
        <Paper elevation={3} className={classes.root} >
          <CardActionArea>
            <Link href={`/product/${product._id}`}>
             <ShowImage item={product} url="product" />
            </Link>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Rp {product.price}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Stock : {product.quantity}
                </Typography>
               {cartShowCartUpdateOptions(cartUpdate)}
                <br/>
               {showRemoveButton(showRemoveProductButton)}
              </CardContent>
          </CardActionArea>
          <CardActions disableSpacing>
             {showAddToChartButton(showViewAddCart)}
          </CardActions>
      </Paper >
    );
}

export default CardProduct;
