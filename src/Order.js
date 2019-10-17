import React, { Component } from 'react';
import './Order.css'
import Header from './header';
import Modal from 'react-modal';
import { Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      detail: [],
      modalDetailOrderIsOpen: false,
      typeOrder: 'ทั้งหมด',
      searchOrder: {
        orderID: ''
      },
    };
    this.openModalDetail = this.openModalDetail.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModalDetail(id) {
    axios.get('https://treedp.doge.in.th/show/status/' + id)
      .then(response => {
        console.log(response.data)
        //this.setState({ orders: response.data })
        this.setState({ modalDetailOrderIsOpen: true });
        this.setState({ detail: this.state.orders.filter(order => order.orderId === id) })
        setTimeout(() => { console.log(this.state.detail) }, 1000)
      })


  }

  afterOpenModal() {
  }

  closeModal() {
    this.setState({ modalDetailOrderIsOpen: false });
  }

  componentDidMount() {
    axios.get('https://treedp.doge.in.th//order/getAllOrder')
      .then(response => {
        //console.log(response.data)
        this.setState({ orders: response.data })
      })
  }
  allOrder = e => {
    e.preventDefault()
    this.setState({ typeOrder: 'ทั้งหมด' })
    console.log()
    axios.get('https://treedp.doge.in.th//order/getAllOrder')
      .then(response => {
        console.log(response.data)
        this.setState({ orders: response.data })
      })
  }

  waiting = e => {
    e.preventDefault()
    this.setState({ typeOrder: 'รอดำเนินการ' })
    console.log()
    axios.get('https://treedp.doge.in.th/show/status/1')
      .then(response => {
        console.log(response.data)
        this.setState({ orders: response.data })
      })
  }

  prepare = e => {
    e.preventDefault()
    this.setState({ typeOrder: 'เตรียมจัดส่ง' })
    console.log()
    axios.get('https://treedp.doge.in.th/show/status/2')
      .then(response => {
        console.log(response.data)
        this.setState({ orders: response.data })
      })
  }

  complete = e => {
    e.preventDefault()
    this.setState({ typeOrder: 'เสร็จสมบูรณ์' })
    console.log()
    axios.get('https://treedp.doge.in.th/show/status/3')
      .then(response => {
        console.log(response.data)
        this.setState({ orders: response.data })
      })
  }

  searchOrderId = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const apiURL = 'https://treedp.doge.in.th/search'
      axios.post(apiURL, this.state.searchOrder)
        .then(response => {
          console.log(response.data)
        }
        )
    }
  }
  changeHandler = (e) => {
    const order = { ...this.state.searchOrder, [e.target.name]: e.target.value }
    this.setState({ order })
    console.log(order)
  }
  render() {
    const {order_Id} = this.state.searchOrder
    const { orders } = this.state
    let detailOrder = this.state.detail.map(order =>
      <div className='detail-order'>
        <h1 className='head-detail'>รายละเอียดคำสั่งซื้อ</h1>
        <p key={order.orderId}><b>รหัสคำสั่งซื้อ   #</b> {order.orderId}</p>
        <p key={order.datePurchase}><b>วันที่ : </b>   {order.datePurchase}</p>
        <p key={order.profileId}><b>ชื่อ</b>   {order.profileId.name}</p>
        <p key={order.addressDetail}><b>ที่อยู่</b>   {order.addressId.addressDetail}</p>
        <div>{order.statusId.statusName}</div>
        <p>รวมทั้งหมด {order.totalPrice} บาท</p>
      </div>

    )

    return (
      <div>
        <Modal
          isOpen={this.state.modalDetailOrderIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}>
          {detailOrder}
        </Modal>
        <Header />
        <h1 className="head">จัดการคำสั่งซื้อ</h1>

        <form>
            <input type="text" className="search" placeholder="SEARCH" name="orderID"
            value={order_Id}
            onChange={this.changeHandler}
            onKeyDown={this.searchOrderId}
            />
          </form>


        <div className="btn-process">
          <Button onClick={this.allOrder}>ทั้งหมด</Button>
          <Button onClick={this.waiting}>รอดำเนินการ</Button>
          <Button onClick={this.prepare}>เตรียมจัดส่ง</Button>
          <Button onClick={this.complete}>เสร็จสมบูรณ์</Button>
        </div>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" >
            {this.state.typeOrder}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={this.allOrder}>ทั้งหมด</Dropdown.Item>
            <Dropdown.Item onClick={this.waiting}>รอดำเนินการ</Dropdown.Item>
            <Dropdown.Item onClick={this.prepare}>เตรียมจัดส่ง</Dropdown.Item>
            <Dropdown.Item onClick={this.complete}>เสร็จสมบูรณ์</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <div className='tableAllOrder'>

          {orders.length ?
            orders.map(order =>
              <div className='table-order' onClick={() => { this.openModalDetail(order.orderId) }}>
                <div className='orderNumber'>
                  <p>  รหัสคำสั่งซื้อ</p>
                  <p className='orderId' key={order.orderId}># {order.orderId}</p>
                </div>
                <div className='detailOrder'>
                  <p key={order.profileId}><b>ชื่อ</b>   {order.profileId.name}</p>
                  <p key={order.addressDetail}><b>ที่อยู่</b>   {order.addressId.addressDetail}</p>
                  <p key={order.datePurchase}><b>วันที่ : </b>   {order.datePurchase}</p>
                  <div className='orderStatus'>{order.statusId.statusName}</div>


                </div>
              </div>
            ) : null
          }

        </div>

      </div>

    );
  }

}
export default Order;




