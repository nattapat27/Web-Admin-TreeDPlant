import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
//import ReactDOM from 'react-dom'
//import MaterialTable from 'material-table'
import axios from 'axios';
import MaterialTable from 'material-table';
import Header from './header';


class addTree extends Component {
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
    
    return (

      <div>
          <Header/>
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

      


    );
  }
}



export default addTree;
