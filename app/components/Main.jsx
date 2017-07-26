import React, {Component} from 'react';
import 'styles/styles';

class Main extends Component {
  constructor(props) {
    super(props);
  }
  emailSubmit(e) {
    e.preventDefault();
  }
  render() {
    return(
      <div className='Main'>
        <div className='Main__video'>
          <video preload='auto' loop='' src='https://player.vimeo.com/external/9514605.hd.mp4?s=fb9d73a58ff23539e5a836f22d8361e1ed936ccf'></video>
        </div>
        <div className='Main__mask'></div>
        <div>
          <div className='Main__content'>
            <h1 className='Main__title'>All Our Former Selves</h1>
            <form className='Main__email-form'>
              <input className='Main__email' placeholder='Email Address'></input>
              <button className='Main__button' onSubmit={this.emailSubmit}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
};

export default Main;
