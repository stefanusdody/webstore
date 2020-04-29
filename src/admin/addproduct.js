import React, {useState, useEffect} from 'react';
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
import {isAuthenticated } from '../auth';
import {createProduct, getCategories} from './apiadmin';


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

const AddProduct = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    taste:"",
    weight:"",
    ingredients:"",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    description: "",
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
        price,
        categories,
        category,
        description,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
      } = values;

      //Load categories and set form data
        const init = () => {
          getCategories().then(data => {
            if(data.error) {
              setValues({
                 ...values,
                 error: data.error})
            } else {
              setValues({
                 ...values,
                 categories: data,
                 formData: new FormData()})
            }
          })
        }


useEffect(() => {
  init();
 }, [])

 const handleChange = name => event => {
   const value = name === "photo" ? event.target.files[0] : event.target.value
   formData.set(name, value)
   setValues({...values, [name]: value})
 };

 const clickSubmit = event => {
  event.preventDefault()
  setValues({...values, error: "", loading:true})
  createProduct(user._id, token, formData)
  .then(data => {
     if(data.error) {
       setValues({...values, error: data.error})
     } else {
          setValues({
            ...values,
            name: "",
            taste:"",
            weight:"",
            ingredients:"",
            photo: "",
            description: "",
            price: "",
            quantity: "",
            loading: false,
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
         Upload Photo Product
       </Typography>
              <TextField
               autoComplete="photo"
               name="photo"
               variant="outlined"
               required
               fullWidth
               id="photo"
               label=""
               autoFocus
               onChange={handleChange("photo")}
               type="file"
               accept="image/*" />
        </Grid>

        <Grid item xs={12} >
          <TextField
            autoComplete="fname"
            name="name"
            type="text"
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Product Name"
            autoFocus
            value={name}
            onChange={handleChange("name")}
          />
        </Grid>

        <Grid item xs={12} >
          <TextField
            autoComplete="taste"
            name="taste"
            type="text"
            variant="outlined"
            required
            fullWidth
            id="taste"
            label="Product Taste"
            autoFocus
            value={taste}
            onChange={handleChange('taste')}
          />
        </Grid>

        <Grid item xs={12} >
          <TextField
            autoComplete="weight"
            name="weight"
            type="number"
            variant="outlined"
            required
            fullWidth
            id="weight"
            label="Product Weight"
            autoFocus
            value={weight}
            onChange={handleChange('weight')}
          />
        </Grid>

        <Grid item xs={12} >
          <TextField
            autoComplete="ingredients"
            name="ingredients"
            type="text"
            variant="outlined"
            required
            fullWidth
            id="ingredients"
            label="Product Ingredients"
            autoFocus
            value={ingredients}
            onChange={handleChange('ingredients')}
          />
        </Grid>


        <Grid item xs={12} >
          <TextField
            autoComplete="description"
            name="description"
            type="text"
            variant="outlined"
            required
            fullWidth
            id="description"
            label="Product Description"
            autoFocus
            value={description}
            onChange={handleChange('description')}
          />
        </Grid>

        <Grid item xs={12} >
          <TextField
            autoComplete="price"
            name="price"
            type="number"
            variant="outlined"
            required
            fullWidth
            id="description"
            label="Product Price"
            autoFocus
            value={price}
            onChange={handleChange('price')}
          />
        </Grid>

        <Grid item xs={12} >
          <TextField
            autoComplete="quantity"
            name="quantity"
            type="number"
            variant="outlined"
            required
            fullWidth
            id="quantity"
            label="Product Quantity"
            autoFocus
            value={quantity}
            onChange={handleChange('quantity')}
          />
        </Grid>

       <Grid item xs={12} >
       <div className="form-group">
         <label className="text-muted">Category</label>
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
          <label className="text-muted">Shipping</label>
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
          Create New Product
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
      <h2>{`${createdProduct}`} is created</h2>
    </div>
  );

  const showLoading = () => (
    loading && (<div className="alert alert-success">
    <h2>Loading ...</h2>
    </div>)
  );

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
          Add New Product
        </Typography>
       <br/>
      {showLoading()}
      {showError()}
      {showSuccess()}
      {newPostForm()}
      {goBack()}
      </div>
    </Container>
  );
}

export default AddProduct;
