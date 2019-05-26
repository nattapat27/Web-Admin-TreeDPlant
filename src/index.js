import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './Components/App';
import App from './App';
import * as serviceWorker from './serviceWorker';
    ReactDOM.render(<ShowProduct />, document.getElementById('product'));

ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
