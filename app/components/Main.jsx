import React, {Component} from 'react';
import S from 'styles/styles';
import test from 'images/test';

class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <h1 className={`${S.Main} ${S.Main__bold}`}>Main Component</h1>
        <img src={test}/>
      </div>
    )
  }
};

export default Main;
