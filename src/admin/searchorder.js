import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { fade, makeStyles } from '@material-ui/core/styles';
import {getOrders, list } from './apiadmin';



const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
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


const SearchOrder = () => {
  const classes = useStyles();

  const [data, setData] = useState({
    orders: [],
    order_id: '',
    search: '',
    results: [],
    searched: false
  });

  const {orders, order_id, search, results, searched} = data

  const loadOrders = () => {
    getOrders().then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        setData({...data, orders: data})
      }
    })
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const searchData = () => {
    // console.log(search, order);
    if(search) {
      list({search: search || undefined, order_id:order_id})
      .then(response => {
        if(response.error) {
          console.log(response.error)
        } else {
          setData({...data, results: response, searched: true})
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

  const searchForm = () => (
    <form className={classes.container} noValidate autoComplete="off" onSubmit={searchSubmit}>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <TextField
         fullWidth
         type="search"
         label="Search Order"
         className="form-control"
         onChange={handleChange('search')}
         placeholder="search by order Id"
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

       </div>
       <br/>
    </div>
  )
}

export default SearchOrder;
