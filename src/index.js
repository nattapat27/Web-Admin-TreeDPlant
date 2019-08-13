import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
//import Header from './header';
//import AddTree from './Tree';
//import Order from './Order';
import Login from './Login';
//import {Router,Route,Link,browserHistory} from 'react-router' ;

ReactDOM.render(<Login/>,document.getElementById('root')

);


serviceWorker.unregister();