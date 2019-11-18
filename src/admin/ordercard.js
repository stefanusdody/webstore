import React, {useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import EventAvailableSharpIcon from '@material-ui/icons/EventAvailableSharp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LabelImportantSharpIcon from '@material-ui/icons/LabelImportantSharp';
import { makeStyles } from '@material-ui/core/styles';
import {listOrders, getStatusValues, updateOrderStatus, getOrders} from './apiadmin';
import { isAuthenticated } from '../auth'
import moment from 'moment';


const useStyles = makeStyles(theme => ({
  cardGrid: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(-10),
  },
  text: {
    textAlign: "Left",
  },
  textProduct: {
    textAlign: "center",
  },
  margin: {
    margin: theme.spacing(3),
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
}));

const CardOrder = ({
      order
    }) => {

  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const [error, setError] = useState(false);
  const [redirect , setRedirect] = useState(false);
  const [count, setCount] = useState(order.count);
  const [state, setState] = useState({
    open: true
  })

  const {user, token} = isAuthenticated()

  const loadOrders = () => {
    listOrders(user._id, token).then(data => {
      if(data.error) {
        console.log(data.error);
      } else {
        setOrders(data)
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then(data => {
      if(data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    })
  }

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, [])

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then(data => {
      if(data.error) {
        console.log("Status update failed");
      } else {
        loadOrders();
      }
    })
  };


  const showStatus = (order) => (
    <div className="form-group">
       <ListItemText>
          Update Status : {order.status}
       </ListItemText>
       <select className="form-control" onChange={(e) => handleStatusChange(e, order._id)}>
         <option>Update Status</option>
         {statusValues.map((status, index) => (
           <option key={index} value={status}>
            {status}
           </option>
         ))}
       </select>
    </div>
  )


return (
    <Grid>
      <Card className={classes.cardGrid}>
        <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h6" component="p">
          Order Id: {order._id}
        </Typography>

        <ListItem button>
            <ListItemIcon>
               <EventAvailableSharpIcon/>
            </ListItemIcon>
            <ListItemText> {showStatus(order)}  </ListItemText>
        </ListItem>

        <ListItem button>
           <ListItemIcon>
              <LabelImportantSharpIcon/>
           </ListItemIcon>
           <ListItemText> Order by: {order.user.name}</ListItemText>
        </ListItem>

          <ListItem button>
             <ListItemIcon>
                <LabelImportantSharpIcon/>
             </ListItemIcon>
             <ListItemText> Status: {order.status}</ListItemText>
          </ListItem>

          <ListItem button>
             <ListItemIcon>
                <LabelImportantSharpIcon/>
             </ListItemIcon>
             <ListItemText> Transaction Id: {order.transaction_id} </ListItemText>
          </ListItem>

          <ListItem button>
             <ListItemIcon>
                <LabelImportantSharpIcon/>
             </ListItemIcon>
             <ListItemText> Amount: Rp {order.amount} </ListItemText>
          </ListItem>

          <ListItem button>
             <ListItemIcon>
                <LabelImportantSharpIcon/>
             </ListItemIcon>
             <ListItemText> Ordered On : {moment(order.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")} </ListItemText>
          </ListItem>

          <Typography  gutterBottom variant="h6" component="p">
             Order Detail
          </Typography>

           {order.products.map((p, pindex) => (
             <div key={pindex}>


              <ListItem button>
                 <ListItemIcon>
                    <LabelImportantSharpIcon/>
                 </ListItemIcon>
                 <ListItemText> Product Name: {p.name} </ListItemText>
              </ListItem>

              <ListItem button>
                 <ListItemIcon>
                    <LabelImportantSharpIcon/>
                 </ListItemIcon>
                 <ListItemText> Product Price: Rp {p.price} </ListItemText>
              </ListItem>

              <ListItem button>
                 <ListItemIcon>
                    <LabelImportantSharpIcon/>
                 </ListItemIcon>
                 <ListItemText> Product Total: {p.count}</ListItemText>
              </ListItem>

             </div>
           ))}

        </CardContent>
        <CardActions>

        </CardActions>
      </Card>
    </Grid>
    );
}

export default CardOrder;
