import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import {API} from "../config";

const items = [
  {
    src: `${API}/promolayout/photo/5ebcc98f7550120a5788de1e`,
    altText: 'Slide 1',
    caption: '',
    header: '',
    key: '1'
  },
  {
    src: `${API}/promolayout/photo/5ebce0483f23730dc5848c92`,
    altText: 'Slide 2',
    caption: '',
    header: '',
    key: '2'
  },
  {
    src: `${API}/promolayout/photo/5ebce9e43f23730dc5848c93`,
    altText: 'Slide 3',
    caption: '',
    header: '',
    key: '3'
  },
  {
    src: `${API}/promolayout/photo/5ebceadb3f23730dc5848c94`,
    altText: 'Slide 4',
    caption: '',
    header: '',
    key: '4'
  },
  {
    src: `${API}/promolayout/photo/5ebcec063f23730dc5848c95`,
    altText: 'Slide 5',
    caption: '',
    header: '',
    key: '5'
  }
];


const Layout =  (props) => {
  return(
    <div>
      <UncontrolledCarousel items={items} />
    </div>
  )
}

export default Layout;
