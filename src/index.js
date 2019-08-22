import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Product from './Product';
import Order from './Order';
import Login from './Login';
import {BrowserRouter,Route} from 'react-router-dom' ;



ReactDOM.render(
    <BrowserRouter>
    <Route exact path="/" component={Login}/>
    <Route path="/product" component={Product}/>
    <Route path="/order" component={Order}/>
    </BrowserRouter>
    
    ,document.getElementById('root'));


serviceWorker.unregister();