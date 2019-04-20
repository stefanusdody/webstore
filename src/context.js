import React, { Component } from 'react'
import {StoreProducts, DetailProducts} from './data';

const ProductContext = React.createContext();
//Provider
//Consumer


class ProductProvider extends Component {
  state ={
    products: [],
    detailProducts: DetailProducts
  };

  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let tempProducts = [];
    StoreProducts.forEach(item =>{
      const singleItem = {...item};
      tempProducts = [...tempProducts,singleItem];
    })
    this.setState(() => {
      return {products: tempProducts}
    });
  }

  handleDetail = () => {
    console.log('hello from detail');

  }
  
  addToCart = () => {
    console.log('hello from detail add to cart');
  }

  render() {
    return(
     <ProductContext.Provider value={{
       ...this.state,
       handleDetail: this.handleDetail,
       addToCart: this.addToCart
      }}>
       {this.props.children}
     </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};
