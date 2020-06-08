import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import CardProduct from './card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {  makeStyles } from '@material-ui/core/styles';
import { getCategories, list } from './apicore';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(1),
  },
  message:{
    textAlign: 'center',
  }
}))


const SearchItem = () => {
  const classes = useStyles();

  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false
  });

  const { category, search, results, searched} = data

  const loadCategories = () => {
    getCategories().then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        setData({...data})
      }
    })
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const searchData = () => {
    console.log(search, category);
    if(search) {
      list({search: search || undefined, category: category})
      .then(response => {
        if(response.error) {
          console.log(response.error);
        } else {
          setData({...data, results: response, searched: true });
        }
      })
    }
  };

  const searchSubmit = (e) => {
     e.preventDefault()
     searchData()
  };

  const handleChange = (name) => event => {
   setData({...data, [name]: event.target.value, searched: false});
  };

  const searchMessage = (searched, results) => {
  if(searched && results.length > 0) {
    return `Found ${results.length} products`
   }
   if(searched && results.length < 1) {
     return (
         <Typography className={classes.message} component="h1" variant="h5" color="secondary">
            Product tidak ditemukan
         </Typography>
     )
    }
}

  const searchProducts = (results = []) => {
   return (
    <div>
      <Typography className={classes.message} component="h1" variant="h5">
         {searchMessage(searched, results)}
      </Typography>
         <Grid container spacing={2}>
          {results.map((product, i) => (
            <Grid key={i} item xs={12} sm={12} md={12}>
              <CardProduct product={product} showViewDescriptions={false} showViewCategories={false}/>
            </Grid>
           ))}
         </Grid>
    </div>
    )
  }

  const searchForm = () => (
    <form className={classes.container} noValidate autoComplete="off" onSubmit={searchSubmit}>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <TextField
         id="size-small-outlined"
         size="small"
         className={classes.textField}
         placeholder="Cari Product Favorite"
         fullWidth
         margin="normal"
         InputLabelProps={{
           shrink: true,
         }}
         variant="outlined"
         onChange={handleChange('search')}
        />
      </Grid>
    </Grid>
    <div
       className="btn input-group-append"
       style={{border: "none"}}>
    </div>
    </form>
  );

  return (
    <div>
       <div>
        {searchForm()}
       </div>
       <div className={classes.searchProducts}>
        {searchProducts(results)}
       </div>
    </div>
  )
}

export default SearchItem;
