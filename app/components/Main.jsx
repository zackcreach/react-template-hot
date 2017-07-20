import React, {Component} from 'react';
import 'styles/styles';
import test from 'images/test';

class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        {/* Use this method for multiple classes with CSS modules (not currently enabled in webpack) */}
        {/* <h1 className={`${S.Main} ${S.Main__bold}`}>Main Component</h1> */}
        <h1 className='Main Main__bold'>Main Component</h1>
        <img className='Main__image' src={test}/>
      </div>
    )
  }
};

export default Main;
