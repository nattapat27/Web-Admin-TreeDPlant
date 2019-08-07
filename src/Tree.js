import React, { Component } from 'react';
import './Tree.css'
import Header from './header';
//import Search from './header';
import tree from './tree.png';
//import ShowPlants from './App';
import { Button} from 'react-bootstrap';

class AddTree extends Component {

  render() {
    return (
      <div>
        <Header />
        <Button className="add"></Button>
        <h1 className="head">เพิ่ม-ลด ต้นไม้</h1>
        
        <form>
          <input type="text" name="search" placeholder="SEARCH" />

        </form>
          <ShowTree/>
          <ShowTree/>
    </div>
    );
  }

}
export default AddTree;

class ShowTree extends Component{
  render(){
    return(
      <div className='tablePlant'>
        <img src={tree} className="tree" alt="tree"/>
        <Button className="price">75 บาท</Button>
        <p className="name">ยางอินเดีย</p>
        <p className="detail">รายละเอียดสินค้า</p>
     </div>
     
    )
  }
}