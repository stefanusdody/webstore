import React, {Component} from 'react';

import { Button,
         Card,
         CardImg,
         CardBody,
         CardTitle,
         Col,
         Table
         } from 'reactstrap';


import PropTypes from 'prop-types';

import "../App.css";

const box = {
  marginTop: "-10px",
  marginBottom: "25px",
  position: "relative",
  fontFamily: "Merriweather",
  fontFamily: "serif",
  fontFamily: "Open Sans Condensed",
  fontFamily: "sans-serif",
  textAlign: "center"
}

class Product extends Component {
  render () {
    const {id, name, img, taste, weight, weight1, price, price1 } = this.props.product;
    return (

     <Col key={id} xs={12} sm={12} md={12}lg={4}>
      <Card style={box}>
        <CardImg top width="5%" src={img} alt="Card image cap" />
        <CardBody>
          <CardTitle>{name}</CardTitle>
          <br/>
          <Table>
            <tbody>
              <tr>
                <th scope="row">Rasa</th>
                <td>{taste}</td>
              </tr>
              <tr>
                <th scope="row">Harga (Retail)</th>
                <td>Rp {price} </td>
              </tr>
              <tr>
                <th scope="row">Berat (Retail)</th>
                <td> {weight} gram</td>
              </tr>
              <tr>
                <th scope="row">Harga (Grosir)</th>
                <td>Rp {price1}</td>
              </tr>
              <tr>
                <th scope="row">Berat (Grosir)</th>
                <td> {weight1} Kg</td>
              </tr>
            </tbody>
         </Table>
         <Button
           href="http://bit.ly/adirasa_snack"
           outline color="info"
           size="block"> BELI
         </Button>
       </CardBody>
      </Card>
     </Col>
   );
  };
}

Product.propTypes = {
  product:PropTypes.shape({
   id:PropTypes.number,
   img:PropTypes.string,
   name:PropTypes.string,
   price:PropTypes.string,
   weight:PropTypes.number
 }).isRequired
}

export default Product;
