import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'

class App extends Component {
  render() {
    return (
      <div style={{ maxWidth: '100%',height: '100%'}}>
      <MaterialTable
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Detail', field: 'detail' },
          { title: 'Price', field: 'price', type: '' },
          { title: 'Picture', field: 'pic' }
        ]}
        data={[{ name: '1', detail: 'Baran', price: 1987, pic: 63 }]}
        title="Product"
      />
    </div>
     
    
    );
  }
}
export default App;
