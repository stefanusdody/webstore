import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import CardProduct from './card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import {fade, makeStyles } from '@material-ui/core/styles';
import {getCategories, list } from './apicore';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  message:{
    textAlign: 'center',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 1,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '50%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
}))

const theme = createMuiTheme({
  palette: {
    primary: { main: grey[800] }, // Purple and green play nicely together.
  },
  typography: { useNextVariants: true },
});


const SearchItem = () => {
  const classes = useStyles();

  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false
  });

  const {categories, category, search, results, searched} = data

  const loadCategories = () => {
    getCategories().then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        setData({...data, categories: data})
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
      <br/>
         <Grid container spacing={4}>
          {results.map((product, i) => (
            <Grid key={i} item xs={12} sm={4} md={3}>
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
      <MuiThemeProvider theme={theme}>
        <TextField
         id="filled-full-width"
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
      </MuiThemeProvider>
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
       <div className="container mb-3">
        {searchForm()}
       </div>
       <br/>
       <div className="container-fluid mb-3">
        {searchProducts(results)}
       </div>
       <br/>
    </div>
  )
}

export default SearchItem;
