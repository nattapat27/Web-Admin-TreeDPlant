import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
//import ReactDOM from 'react-dom'
//import MaterialTable from 'material-table'
import axios from 'axios';
import MaterialTable from 'material-table';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plant: [],
      data: []
    }
  }

  async componentDidMount() {
    await axios.get('https://treedp.doge.in.th/getAllTree')
      .then(response => {
        this.setState({
          plant: response.data
        })
      })
  }

  render() {
    // for(let i=0; i < this.state.plant.length; i++){

    //   data.push({
    //     'treeId': treeId[i],
    //     'model': model[i],
    //     'width': width[i],
    //     'height':height[i]
    //   })
    // }
    return (
      <div>
        {this.state.plant && (
          <MaterialTable
          title="Products"
            columns={[
              { title: 'ID', field: 'treeId' },
              { title: 'model', field: 'model' },
              { title: 'width', field: 'width' },
              { title: 'height', field: 'height' }
            ]}
            data={this.state.plant}
            
          >
          </MaterialTable>
        )}
      </div>

      //     data={[{ name: '1', detail: 'Baran', price: 1987, pic: 63 }]}
      //     title="Product"
      //   />
      // </div>


    );
  }
}
export default App;
