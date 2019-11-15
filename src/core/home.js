import React, { Component } from "react";
import Layout from './layout';
import SearchItem from './search';

class Home extends Component {
  render() {
    return (
     <div>
       <Layout/>
       <SearchItem/>
     </div>
     );
  }
}

export default Home;
