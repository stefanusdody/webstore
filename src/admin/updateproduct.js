import React, {useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { isAuthenticated } from '../auth';
import { getProduct, getCategories, updateProduct} from './apiadmin';


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    margin: theme.spacing(1),
  },

}));

const UpdateProduct = ({match}) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    taste:"",
    weight:"",
    ingredients:"",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: ""
  });

  const { user, token } = isAuthenticated();

  const {
        name,
        taste,
        weight,
        ingredients,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
      } = values;

      const init = (productId) => {
        getProduct(productId).then(data => {
          if(data.error) {
            setValues({ ...values, error: data.error})
          } else {
            //populate the state
            setValues({
               ...values,
               name: data.name,
               taste: data.taste,
               weight: data.weight,
               ingredients: data.ingredients,
               description: data.description,
               price: data.price,
               category: data.category._id,
               shipping: data.shipping,
               quantity: data.quantity,
               formData: new FormData()
             });
            //load categories
            initCategories()
          }
        })
      }

//Load categories and set form data
    const initCategories = () => {
      getCategories().then(data => {
        if(data.error) {
          setValues({
                 ...values,
                 error: data.error})
          } else {
           setValues({
                 categories: data,
                 formData: new FormData()})
            }
          })
        }


useEffect(() => {
  init(match.params.productId);
 }, [])

 const handleChange = name => event => {
   const value = name === "photo" ? event.target.files[0] : event.target.value
   formData.set(name, value)
   setValues({...values, [name]: value})
 };

 const clickSubmit = event => {
  event.preventDefault()
  setValues({...values, error: "", loading:true})
  updateProduct(match.params.productId, user._id, token, formData)
  .then(data => {
     if(data.error) {
       setValues({...values, error: data.error})
     } else {
          setValues({
            ...values,
            name: "",
            taste: "",
            weight: "",
            ingredients: "",
            description: "",
            photo: "",
            price: "",
            quantity: "",
            loading: false,
            error: false,
            redirectToProfile: true,
            createdProduct: data.name
          })
        }
      }
   );
 };


  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
     <Grid container spacing={2}>
       <Grid item xs={12} >
       <Typography variant="body2" color="textSecondary" component="p">
         Update Photo Product
       </Typography>
          <TextField
               autoComplete="photo"
               name="photo"
               variant="outlined"
               fullWidth
               id="photo"
               label=""
               autoFocus
               onChange={handleChange("photo")}
               type="file"
               accept="image/*" />
        </Grid>

        <Grid item xs={12} >
          <h4>Update Product Name</h4>
          <TextField
            autoComplete="fname"
            name="name"
            type="text"
            variant="outlined"
            fullWidth
            id="name"
            autoFocus
            value={name}
            onChange={handleChange("name")}
          />
        </Grid>

        <Grid item xs={12} >
          <h4>Update Product Taste</h4>
          <TextField
            autoComplete="ftaste"
            name="taste"
            type="text"
            variant="outlined"
            fullWidth
            id="taste"
            autoFocus
            value={taste}
            onChange={handleChange("taste")}
          />
        </Grid>

        <Grid item xs={12} >
          <h4>Update Product Weight</h4>
          <TextField
            autoComplete="fweight"
            name="weight"
            type="text"
            variant="outlined"
            fullWidth
            id="weight"
            autoFocus
            value={weight}
            onChange={handleChange("weight")}
          />
        </Grid>

        <Grid item xs={12} >
          <h4>Update Product Ingredients</h4>
          <TextField
            autoComplete="fingredients"
            name="ingredients"
            type="text"
            variant="outlined"
            fullWidth
            id="ingredients"
            autoFocus
            value={ingredients}
            onChange={handleChange("ingredients")}
          />
        </Grid>


        <Grid item xs={12} >
          <h4>Update Product Description</h4>
          <TextField
            autoComplete="description"
            name="description"
            type="text"
            variant="outlined"
            fullWidth
            id="description"
            autoFocus
            value={description}
            onChange={handleChange('description')}
          />
        </Grid>

        <Grid item xs={12} >
          <h4>Update Product Price</h4>
          <TextField
            autoComplete="price"
            name="price"
            type="number"
            variant="outlined"
            fullWidth
            id="description"
            autoFocus
            value={price}
            onChange={handleChange('price')}
          />
        </Grid>

        <Grid item xs={12} >
          <h4>Update Product Quantity</h4>
          <TextField
            autoComplete="quantity"
            name="quantity"
            type="number"
            variant="outlined"
            fullWidth
            id="quantity"
            autoFocus
            value={quantity}
            onChange={handleChange('quantity')}
          />
        </Grid>

       <Grid item xs={12} >
       <div className="form-group">
         <label className="text-muted">Update Category</label>
         <select
          onChange={handleChange('category')}
          value={category}
          className="form-control"
          >
           <option>Please Select</option>
            {categories && categories.map((c,i) => (
              <option key={i} value={c._id}>
               {c.name}
              </option>
            ))}
         </select>
       </div>

      </Grid>


      <Grid item xs={12} >
        <div className="form-group">
          <label className="text-muted">Update Shipping</label>
          <select
           onChange={handleChange('shipping')}
           className="form-control"
           >
            <option>Please Select</option>
              <option value="0">No</option>
              <option value="1">Yes</option>
          </select>
        </div>
     </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Update Product
        </Button>
      </Grid>
    </form>
  )

  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div className="alert alert-info" style={{display: createdProduct ? "" : "none"}}>
      <h2>{`${createdProduct}`} is updated</h2>
    </div>
  );

  const showLoading = () => (
    loading && (<div className="alert alert-success">
    <h2>Loading ...</h2>
    </div>)
  );

  const redirectUser = () => {
    if(redirectToProfile) {
      if(!error) {
        return <Redirect to="/" />
      }
    }
  }

  const goBack = () => (
    <Grid container>
      <Grid item>
        <Link href="/admin/dashboard" variant="body2">
              {"Back to Dashboard"}
        </Link>
      </Grid>
    </Grid>
  )


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LibraryAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Product
        </Typography>
       <br/>
      {showLoading()}
      {showError()}
      {showSuccess()}
      {newPostForm()}
      {redirectUser()}
      {goBack()}
      </div>
    </Container>
  );
}

export default UpdateProduct;
