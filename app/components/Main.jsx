import React, {Component} from 'react';
import 'styles/styles';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoURL: 'https://player.vimeo.com/external/158148793.hd.mp4?s=8e8741dbee251d5c35a759718d4b0976fbf38b6f&profile_id=119&oauth2_token_id=57447761',
      emailAddress: ''
    }
  }
  componentWillMount() {
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      emailAddress: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.emailAddress);
  }
  render() {
    return(
      <div className='Main'>
        <div className='Main__video-container'>
          <video className='Main__video' muted autoPlay loop>
            <source src={this.state.videoURL} type='video/mp4'></source>
          </video>
        </div>
        <div className='Main__mask'></div>
        <div>
          <div className='Main__content'>
            <h1 className='Main__title'>All Our Former Selves</h1>
            <form className='Main__email-form' onSubmit={this.handleSubmit}>
              <input className='Main__email' ref='active' value={this.state.emailAddress} onChange={this.handleChange} placeholder='Email Address'></input>
              <input className='Main__button' type='submit' value='Submit'/>
            </form>
          </div>
        </div>
      </div>
    )
  }
};

export default Main;
