import { React,Component } from "react";
import {BrowserRouter,Route} from 'react-router-dom' ;
import AddTree from './Tree';
import Order from './Order';
import Login from './Login';

class Route extends Component{
    render(){
        return(
    <BrowserRouter>
    <Route path="/" component={Login}/>
    <Route path="/addTree" component={AddTree}/>
    <Route path="/order" component={Order}/>
    </BrowserRouter>
        )
    }
}