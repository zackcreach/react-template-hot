import React, {Component} from 'react';
import 'styles/styles';

class NotFound extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <h1 className='NotFound NotFound__bold'>Page Not Found</h1>
      </div>
    )
  }
};

export default NotFound;
