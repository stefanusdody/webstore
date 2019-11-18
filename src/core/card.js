import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import {Redirect} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ShowImage from './showimage';
import moment from 'moment';
import {addItem, updateItem, removeItem} from './carthelpers';
import {isAuthenticated} from '../auth'


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: "100%",
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
  avatar: {
    backgroundColor: red[500],
  },
  desc: {
    textAlign: "center"
  }
}));

const CardProduct = ({
      product,
      showViewAddCart = true,
      showViewProductButton = true,
      showViewDescriptions = true,
      showViewCategories = true,
      cartUpdate= false,
      showRemoveProductButton=false
    }) => {

  const classes = useStyles();
  const [redirect , setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
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
      return <Redirect to="/cart"/>
    }
  }

  const showAddToChartButton = (showViewAddCart) => {
    return(
      showViewAddCart && (
        <Button fullWidth onClick={addToCart} size="small" color="secondary" href="/cart">
          Buy Now
        </Button>
      )
    );
  };


const showStock = (quantity) => {
    return quantity > 0 ?
      <Typography variant="body2" color="textSecondary" component="p">
          Stock : {product.quantity}
      </Typography>
      :
      <Typography variant="body2" color="textSecondary" component="p">
         Sold Out
      </Typography>

  }

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
          href="/cart"
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
              label="Booking For Persons "
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
    setCount(event.target.value < 1 ? 1 : event.target.value)
    if(event.target.value >= 1) {
      updateItem(productId, event.target.value)
    }
  }

  const showNext = () => {
    return isAuthenticated() ? (
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>
    ):(
      <Button
        type="submit"
        fullWidth
        size="small"
        href="/signin"
        color="secondary">
        Sign In to See
      </Button>
    )
  }

return (
    <Grid>
    <Card className={classes.card}>
    <CardHeader
      avatar={
        <Avatar aria-label="recipe" className={classes.avatar}>
          <FavoriteBorderIcon/>
        </Avatar>
      }
      title={product.name}
    />
    <ShowImage item={product} url="product"/>
     <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.desc}>
          {product.description.substring(0,1000)}
        </Typography>
        {cartShowCartUpdateOptions(cartUpdate)}
        <br/>
        {showRemoveButton(showRemoveProductButton)}
      </CardContent>
      <CardActions disableSpacing>
          {showAddToChartButton(showViewAddCart)}
          {showNext()}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>

          <Typography variant="body2" color="textSecondary" component="p" >Snack Product:</Typography>
          <Typography paragraph>
            {product.name}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p" >Rasa:</Typography>
          <Typography paragraph>
            {product.taste}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p" >Berat Bersih:</Typography>
          <Typography paragraph>
            {product.weight} Gram
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p" >Price:</Typography>
          <Typography paragraph>
            Rp {product.price}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p" >Komposisi:</Typography>
          <Typography paragraph>
            {product.ingredients}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p" >
             Description:
          </Typography>
          <Typography paragraph>
             {product.description.substring(0,1000)}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p" >
             Stock Available:
          </Typography>
          <Typography paragraph>
             {product.quantity} Packs
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            Added on {moment(product.createdAt).fromNow()}
          </Typography>
        </CardContent>
      </Collapse>
      </Card>
    </Grid>
    );
}

export default CardProduct;
