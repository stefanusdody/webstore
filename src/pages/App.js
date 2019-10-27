import React, { Component } from "react";
import Layout from '../medium/layout';
import SearchItem from '../medium/search';

class App extends Component {
  render() {
    return (
     <div>
       <Layout/>
       <SearchItem/>
     </div>
     );
  }
}

export default App;
