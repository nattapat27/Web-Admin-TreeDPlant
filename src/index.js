import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ShowProduct from './ShowProduct';
import * as serviceWorker from './serviceWorker';
    ReactDOM.render(<ShowProduct />, document.getElementById('product'));

serviceWorker.unregister();
