import React, { Component } from 'react';
import './Order.css'
import Header from './header';
import Modal from 'react-modal';
import { Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      detail: [],
      asset: [],
      modalDetailOrderIsOpen: false,
      typeOrder: 'ทั้งหมด',
      searchOrder: null,
      status: '',
      statusOrder: {
        status: '',
        orderID: ''
      }
    };
    this.openModalDetail = this.openModalDetail.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModalDetail(id) {
    axios.get('https://treedp.doge.in.th/order/getAllOrder')
      .then(response => {
        this.setState({ modalDetailOrderIsOpen: true });
        this.setState({ detail: response.data.filter(cart => cart.orderId === id) });
        this.setState({ asset: this.state.detail[0].cartCollection })
        this.setState({ status: this.state.detail.map(orders => orders.statusId.statusName) });
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
        this.setState({ orders: response.data })
      })
  }
  allOrder = e => {
    e.preventDefault()
    this.setState({ typeOrder: 'ทั้งหมด' })
    axios.get('https://treedp.doge.in.th/order/getAllOrder')
      .then(response => {
        console.log(response.data)
        this.setState({ orders: response.data })
      })
  }

  waiting = e => {
    e.preventDefault()
    this.setState({ typeOrder: 'รอดำเนินการ' })
    axios.get('https://treedp.doge.in.th/order/getAllOrder')
      .then(response => {
        //console.log(response.data.filter(status=>status.statusId.statusName==='Waiting'))
        this.setState({ orders: response.data.filter(status=>status.statusId.statusName==='รอดำเนินการ') })
      })
  }

  prepare = e => {
    e.preventDefault()
    this.setState({ typeOrder: 'เตรียมจัดส่ง' })
    axios.get('https://treedp.doge.in.th/order/getAllOrder')
      .then(response => {
        //console.log(response.data)
        this.setState({ orders: response.data.filter(status=>status.statusId.statusName==='เตรียมจัดส่ง') })
      })
  }

  complete = e => {
    e.preventDefault()
    this.setState({ typeOrder: 'เสร็จสมบูรณ์' })
    axios.get('https://treedp.doge.in.th/order/getAllOrder')
      .then(response => {
        this.setState({ orders: response.data.filter(status=>status.statusId.statusName==='เสร็จสมบูรณ์') })
      })
  }

  searchOrderId = e => {
    if (e.key === 'Enter' && this.state.searchOrder.orderID !== '') {
      e.preventDefault()
      console.log(this.state.searchOrder.orderID)
      this.setState({ orders: this.state.orders.filter(orders => orders.orderId === this.state.searchOrder.orderID) })

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



  editStatusWaiting(id) {
    //console.log(id)
    const apiURL = 'https://treedp.doge.in.th/order/editStatus'
    this.state.statusOrder.orderID = id
    this.state.statusOrder.status = 1
    //console.log(this.state.statusOrder)
    axios.post(apiURL, this.state.statusOrder)
      .then(response =>
        this.setState({ status: 'Waiting' })
      )
  }

  editStatusPrepare(id) {
    //console.log(id)
    const apiURL = 'https://treedp.doge.in.th/order/editStatus'
    this.state.statusOrder.orderID = id
    this.state.statusOrder.status = 2
    //console.log(this.state.statusOrder)
    axios.post(apiURL, this.state.statusOrder)
      .then(response =>
        this.setState({ status: 'Prepare' })
      )
  }

  editStatusComplete(id) {
    //console.log(id)
    const apiURL = 'https://treedp.doge.in.th/order/editStatus'
    //this.setState({orderID:id})
    this.state.statusOrder.orderID = id
    //this.setState({status:3})
    this.state.statusOrder.status = 3
    //console.log(this.state.statusOrder)
    axios.post(apiURL, this.state.statusOrder)
      .then(response =>
        this.setState({ status: 'Complete' })
      )
  }

  exportExcel() {
    console.log(this.state.orders)
  }


  render() {
    const { orders } = this.state
    let asset = this.state.asset.map(assets =>
      <div className='asset-detail'>
        <img src={assets.assetId.asssetImage}
          alt={assets.assetId.assetImage}
          className='img-order'
        ></img>
        <div className="detailOfAsset">
          <p><b>{assets.assetId.assetName}</b></p>
          <p>ราคา {assets.assetId.price} THB</p>
          <p>จำนวน {assets.amount} ชิ้น</p>
        </div>
        <div className='priceDetail'><b>{assets.assetId.price * assets.amount} THB</b></div>
      </div>
    );

    let detailOrder = this.state.detail.map(cart =>
      <div className='detail-order' key={cart.orderId}>
        <h1 className='head-detail'>รายละเอียดคำสั่งซื้อ</h1>
        <p className='orderId'>DATE :  {cart.datePurchase}  </p>
        <p><b>รหัสคำสั่งซื้อ     #</b> {cart.orderId} </p>
        <p ><b>ชื่อ</b> {cart.profileId.name}  </p>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdownMenu" >
            {this.state.status}
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-status">
            <Dropdown.Item value="waiting" onClick={() => { this.editStatusWaiting(cart.orderId) }} >Waiting</Dropdown.Item>
            <Dropdown.Item value="prepare" onClick={() => { this.editStatusPrepare(cart.orderId) }}>Prepare</Dropdown.Item>
            <Dropdown.Item value="complete" onClick={() => { this.editStatusComplete(cart.orderId) }}>Complete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <p ><b>ที่อยู่ในการจัดส่ง</b> {cart.addressId.addressDetail} &nbsp; อำเภอ {cart.addressId.district} &nbsp; จังหวัด {cart.addressId.province} &nbsp; รหัสไปรษณีย์ {cart.addressId.zipcode} </p>
        <br></br>
        <p><b>รายการสินค้า</b></p>
        {asset}

        <div>
          <p>รวมทั้งหมด</p>
          <div className='priceDetail'> {cart.totalPrice} THB</div>
        </div>

      </div>


    )

    return (
      <div>

        <button className="excel" onClick={this.exportExcel} ></button>
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
                  <p key={orders.profileId}><b>ชื่อ</b>  {orders.profileId.name}</p>
                  <p key={orders.addressDetail}><b>ที่อยู่ </b> {orders.addressId.addressDetail}  </p>
                  <p> {orders.addressId.district} , {orders.addressId.province} {orders.addressId.zipcode} </p>
                  <p key={orders.datePurchase}><b>วันที่ : </b>  {orders.datePurchase} </p>
                  <div className='orderStatus'>     {orders.statusId.statusName}      </div>


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




