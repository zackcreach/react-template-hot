import React, {Component} from 'react';
import 'styles/styles';
import test from 'images/test';

export default class Main extends Component {
  constructor() {
    super();
  }
  render() {
    return(
      <div>
        <h1 className='Main Main--bold'>Main Component</h1>
        <img className='Main__image' src={test}/>
      </div>
    )
  }
};
