import './index.scss';
import 'typeface-roboto';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // tslint:disable-next-line: jsx-wrap-multiline
  <App />,
  document.getElementById( 'root' ),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();