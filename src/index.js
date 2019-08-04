import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Header from './header';
import addTree from './addtrees';

ReactDOM.render(<Header/>, document.getElementById('root'));


serviceWorker.unregister();