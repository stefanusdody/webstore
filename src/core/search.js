import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { fade, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(8),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
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



  const handleChange = (name) => event => {
   setData({...data, [name]: event.target.value, searched: false});
  };

  const searchMessage = (searched, results) => {
  if(searched && results.length > 0) {
    return `Found ${results.length} products`
   }
   if(searched && results.length < 1) {
     return `Products Not Found`
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

         </Grid>
    </div>
    )
  }

  const searchForm = () => (
    <form className={classes.container} noValidate autoComplete="off">
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <TextField
         fullWidth
         type="text"
         label="Cari Snack Favorite "
         className="form-control"
         onChange={handleChange('search')}
         placeholder="e.g. Telur Gabus Keju"
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
