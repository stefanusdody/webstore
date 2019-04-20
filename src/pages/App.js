import React, { Component } from "react";

import ContentProduct from '../medium/contentproduct';
import SubscribeBox from '../medium/subscribebox';
import CarouselProduct from '../medium/carouselproduct';

class App extends Component {
  render() {
    return (
     <div>
       <CarouselProduct/>
       <SubscribeBox/>
       <ContentProduct/>
     </div>
     );
  }
}

export default App;
