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
      searchOrder: null,
      status:'',
      statusOrder:{
        status:'',
        orderID:''
      }
    };
    this.openModalDetail = this.openModalDetail.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModalDetail(id) {
    axios.get('https://treedp.doge.in.th/show/status/' + id)
      .then(response => {
        //console.log(response.data)
        //this.setState({ orders: response.data })
        this.setState({ modalDetailOrderIsOpen: true });
        this.setState({ detail: this.state.orders.filter(orders => orders.orderId === id) })
        this.setState({status:this.state.detail.map(orders =>orders.statusId.statusName) })
        console.log(this.state.status)
      })


  }

  afterOpenModal() {
  }

  closeModal() {
    this.setState({ modalDetailOrderIsOpen: false });
    window.location.reload();
  }

  componentDidMount() {
    Modal.setAppElement('body');
    axios.get('https://treedp.doge.in.th/order/getAllOrder')
      .then(response => {
        console.log(response.data)
        this.setState({ orders: response.data })
      })
  }
  allOrder = e => {
    e.preventDefault()
    this.setState({ typeOrder: 'ทั้งหมด' })
    axios.get('https://treedp.doge.in.th/order/getAllOrder')
      .then(response => {
        //console.log(response.data)
        this.setState({ orders: response.data })
      })
  }

  waiting = e => {
    e.preventDefault()
    this.setState({ typeOrder: 'รอดำเนินการ' })
    axios.get('https://treedp.doge.in.th/show/status/1')
      .then(response => {
        //console.log(response.data)
        this.setState({ orders: response.data })
      })
  }

  prepare = e => {
    e.preventDefault()
    this.setState({ typeOrder: 'เตรียมจัดส่ง' })
    axios.get('https://treedp.doge.in.th/show/status/2')
      .then(response => {
        //console.log(response.data)
        this.setState({ orders: response.data })
      })
  }

  complete = e => {
    e.preventDefault()
    this.setState({ typeOrder: 'เสร็จสมบูรณ์' })
    console.log()
    axios.get('https://treedp.doge.in.th/show/status/3')
      .then(response => {
        //console.log(response.data)
        this.setState({ orders: response.data })
      })
  }

  searchOrderId = e => {
    if (e.key === 'Enter' && this.state.searchOrder.orderID !== '') {
      e.preventDefault()
      console.log(this.state.searchOrder.orderID)
      this.setState({ orders: this.state.orders.filter(orders => orders.orderId ===this.state.searchOrder.orderID) })

    } else if (e.key === "Delete" || e.key === "Backspace") {
      if (this.state.searchOrder.orderID === '') {
        axios.get('https://treedp.doge.in.th//order/getAllOrder')
          .then(response => {
            // console.log(response.data)
            this.setState({ orders: response.data })
          })
      }


    }
  }
  changeHandler = (e) => {
    const order = { ...this.state.searchOrder, [e.target.name]: e.target.value }
    this.setState({ order })
    this.setState({ searchOrder: order })
    //console.log(order)
  }

  

  editStatusWaiting (id){
    //console.log(id)
    const apiURL = 'https://treedp.doge.in.th/order/editStatus'
    this.state.statusOrder.orderID=id
    this.state.statusOrder.status=1
    //console.log(this.state.statusOrder)
    axios.post(apiURL, this.state.statusOrder)
    .then(response=>
     this.setState({status:'Waiting'})
      )
  }

  editStatusPrepare (id){
    //console.log(id)
    const apiURL = 'https://treedp.doge.in.th/order/editStatus'
    this.state.statusOrder.orderID=id
    this.state.statusOrder.status=2
    //console.log(this.state.statusOrder)
    axios.post(apiURL, this.state.statusOrder)
    .then(response=>
      this.setState({status:'Prepare'})
      )
  }

  editStatusComplete (id){
    //console.log(id)
    const apiURL = 'https://treedp.doge.in.th/order/editStatus'
    //this.setState({orderID:id})
    this.state.statusOrder.orderID=id
    //this.setState({status:3})
    this.state.statusOrder.status=3
    //console.log(this.state.statusOrder)
    axios.post(apiURL, this.state.statusOrder)
    .then(response=>
      this.setState({status:'Complete'})
      )
  }

  

  render() {
    const { orders } = this.state
    let detailOrder = this.state.detail.map(orders =>
      <div className='detail-order' key={orders.orderId}>
        <h1 className='head-detail'>รายละเอียดคำสั่งซื้อ</h1>
        <p key={orders.orderId}><b>รหัสคำสั่งซื้อ   #</b> {orders.orderId}</p>
        <p key={orders.datePurchase}><b>วันที่ : </b>   {orders.datePurchase}</p>
        <p key={orders.profileId}><b>ชื่อ</b>   {orders.profileId.name}</p>
        <p key={orders.addressDetail}><b>ที่อยู่</b>   {orders.addressId.addressDetail}</p>
        <p>รวมทั้งหมด   {orders.totalPrice}   บาท</p>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdownMenu" >
          {this.state.status}
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-status">
            <Dropdown.Item value="waiting" onClick={() => { this.editStatusWaiting(orders.orderId) }} >Waiting</Dropdown.Item>
            <Dropdown.Item value="prepare" onClick={() => { this.editStatusPrepare(orders.orderId) }}>Prepare</Dropdown.Item>
            <Dropdown.Item value="complete" onClick={() => { this.editStatusComplete(orders.orderId) }}>Complete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        
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
          <input type="search" className="search" placeholder="SEARCH" name="orderID"
            value={this.searchOrder}
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
            orders.map(orders =>
              <div className='table-order' key={orders.orderId} onClick={() => { this.openModalDetail(orders.orderId) }}>
                <div className='orderNumber'>
                  <p>  รหัสคำสั่งซื้อ</p>
                  <p className='orderId' key={orders.orderId}># {orders.orderId}</p>
                </div>
                <div className='detailOrder'>
                  <p key={orders.profileId}><b>ชื่อ</b>   {orders.profileId.name}</p>
                  <p key={orders.addressDetail}><b>ที่อยู่</b>   {orders.addressId.addressDetail}</p>
                  <p key={orders.datePurchase}><b>วันที่ : </b>   {orders.datePurchase}</p>
                  <div className='orderStatus'>{orders.statusId.statusName}</div>


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




