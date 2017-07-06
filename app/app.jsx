import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import Main from 'Main';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Main/>
    </AppContainer>,
    document.getElementById('app')
  );
};

render();

if(module.hot) {
  module.hot.accept();
}
