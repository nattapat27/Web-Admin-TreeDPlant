import React, { Component } from 'react';
import './Order.css'
import Header from './header';
//import Search from './header';
//import ShowPlants from './App';
import { Button } from 'react-bootstrap';
import axios from 'axios';
//import Popup from "reactjs-popup";


class Order extends Component {

  allOrder = e => {
    e.preventDefault()
    console.log()
    axios.get('https://treedp.doge.in.th//order/getAllOrder')
      .then(response => {
        console.log(response.data)
      })
  }

  waiting = e => {
    e.preventDefault()
    console.log()
    axios.get('https://treedp.doge.in.th/show/status/1')
      .then(response => {
        console.log(response.data)
      })
  }

  prepare = e => {
    e.preventDefault()
    console.log()
    axios.get('https://treedp.doge.in.th/show/status/2')
      .then(response => {
        console.log(response.data)
      })
  }

  complete = e => {
    e.preventDefault()
    console.log()
    axios.get('https://treedp.doge.in.th/show/status/3')
      .then(response => {
        console.log(response.data)
      })
  }


  render() {
    return (
      <div>
        <Header />
        <h1 className="head">จัดการคำสั่งซื้อ</h1>

        <form>
          <input type="text" className="search" placeholder="SEARCH" />

        </form>
        <div className="btn-group">
          <Button className="bu" onClick={this.allOrder}>ทั้งหมด</Button>
          <Button className="bu" onClick={this.waiting}>รอดำเนินการ</Button>
          <Button className="bu" onClick={this.prepare}>เตรียมจัดส่ง</Button>
          <Button className="bu" onClick={this.complete}>เสร็จสมบูรณ์</Button>
        </div>

        <AllOrders />
      </div>
    );
  }

}
export default Order;

class AllOrders extends Component {
  componentDidMount() {
    console.log()
    axios.get('https://treedp.doge.in.th//order/getAllOrder')
      .then(response => {
        console.log(response.data)
      })
  }
  render() {
    return (
      <div className='tableAllOrder'>
        <div className="noOrder">
          <p className="headText">รหัสคำสั่งซื้อ</p>
          <p className="number">2344543544</p>
        </div>

        <p className="name">ยางอินเดีย</p>
        <p className="detail">รายละเอียดสินค้า</p>
      </div>
    )
  }
}



