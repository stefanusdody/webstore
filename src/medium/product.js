import React, {Component} from 'react';

import { Card,
         CardImg,
         CardBody,
         Col,
         Table
         } from 'reactstrap';


import PropTypes from 'prop-types';

import "../App.css";

const box = {
  marginTop: "50px",
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
    const {id, name, img, taste, weight } = this.props.product;
    return (

     <Col key={id} xs={12} sm={12} md={12}lg={4}>
      <Card style={box}>
        <CardImg top width="5%" src={img} alt="Card image cap" />
        <CardBody>
          <h4>{name}</h4>
          <br/>
          <Table>
            <tbody>
              <tr>
                <th scope="row">Harga</th>
                <td>Rp 5.000,-</td>
              </tr>
              <tr>
                <th scope="row">Rasa</th>
                <td>{taste}</td>
              </tr>
              <tr>
                <th scope="row">Berat</th>
                <td>{weight} gram</td>
              </tr>
            </tbody>
         </Table>
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
