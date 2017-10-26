import React, {Component} from 'react';
import 'styles/styles';

export default class NotFound extends Component {
  constructor() {
    super();
  }
  render() {
    return(
      <div>
        <h1 className='NotFound NotFound__bold'>Page Not Found</h1>
      </div>
    )
  }
};
