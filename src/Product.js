import React, { Component } from 'react';
import './Product.css'
import Header from './header';
import ModalAdd from './AddProduct';
import Modal from 'react-modal';
import axios from 'axios';
import Popup from "reactjs-popup";
import 'bootstrap/dist/css/bootstrap.css';
import { Dropdown } from 'react-bootstrap';



class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddIsOpen: false,
      modalDetailIsOpen: false,
      typeAsset: 'ทั้งหมด',
      assets: [],
      detail: [],
      id: {
        assetID: 0,
      },
    };

    this.openModalAdd = this.openModalAdd.bind(this);
    this.openModalDetail = this.openModalDetail.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModalAdd() {
    this.setState({ modalAddIsOpen: true });
  }

  openModalDetail(id) {
    this.setState({ modalDetailIsOpen: true });
    this.setState({ detail: this.state.assets.filter(assets => assets.assetId === id) })
    setTimeout(() => { console.log(this.state.detail) }, 1000)
    this.state.id.assetID = id

  }

  afterOpenModal() {
  }

  closeModal() {
    this.setState({ modalAddIsOpen: false });
    this.setState({ modalDetailIsOpen: false });
  }
  componentDidMount() {
    Modal.setAppElement('body');
    axios.get('https://treedp.doge.in.th/asset/getAllAsset')
      .then(response => {
        //console.log(response.data)
        this.setState({ assets: response.data })
      })
  }
  allProduct = e => {
    e.preventDefault()
    console.log()
    axios.get('https://treedp.doge.in.th/asset/getAllAsset')
      .then(response => {
        //console.log(response.data)
        this.setState({ assets: response.data })
      })
  }
  showTree = e => {
    e.preventDefault()
    this.setState({ typeAsset: 'ต้นไม้' })
    console.log()
    axios.get('https://treedp.doge.in.th/asset/getAllAsset/tree')
      .then(response => {
        //console.log(response.data)
        this.setState({ assets: response.data })
      })
  }
  showAsset = e => {
    e.preventDefault()
    this.setState({ typeAsset: 'อุปกรณ์' })
    axios.get('https://treedp.doge.in.th/asset/getTypeAsset')
      .then(response => {
        //console.log(response.data)
        this.setState({ assets: response.data })

      })
  }

  deleteAsset = e => {
    e.preventDefault()
    const apiURL = 'https://treedp.doge.in.th/asset/delete'
    this.setState({ modalDetailIsOpen: false });
    axios.post(apiURL, this.state.id)
      .then(response => {
        alert("Delete", (response.data.assetName))
        window.location.reload();
      }
      )
  }

  searchAsset() {

  }

  

  render() {
    const { assets } = this.state
    let detailAsset
    let productAsset = assets.map(asset =>

      <div key={asset.assetId} name='id' className='tablePlant'
        onClick={() => { this.openModalDetail(asset.assetId) }}>
        <img alt={asset.asssetName}
          className='img-asset'
          key={asset.asssetImage}
          src={asset.asssetImage}>
        </img>
        <p key={asset.assetName}>{asset.assetName}</p>
        <div className='price' key={asset.price}>{asset.price} THB</div>
        <p className='detailProduct'
          onClick={() => { this.openModalDetail(asset.assetId) }}>รายละเอียดสินค้า</p>
      </div>
    )

    this.state.detail.forEach(detail => {
      if (this.state.detail[0].typeId.typeId === 1) {
        detailAsset =
          <div key={detail.asssetId} >
            <h1 className="headAdd">รายละเอียดสินค้า</h1>
            <img alt={detail.asssetImage}
              className='img-detail'
              key={detail.asssetImage}
              src={detail.asssetImage}>
            </img>
            <div className="detail-table">
              <div><p>ชื่อ</p>
                <p className='detail-field' key={detail.asssetName}>{detail.assetName}</p></div>

              <div><p>สูง (ซม.)</p>
                <p className='detail-field' key={detail.height}>{detail.treeId.height}</p> </div>

              <div><p>กว้าง (ซม.)</p>
                <p className='detail-field' key={detail.width}>{detail.treeId.width}</p></div>

              <div><p>ราคา (บาท)</p>
                <p className='detail-field' key={detail.price}>{detail.price} </p></div>

              <p>รายละเอียดสินค้า</p>
              <div><p key={detail.assetDetail} className='detail-textarea'>{detail.assetDetail}  </p></div>

            </div>
          </div>

      } else if (this.state.detail[0].typeId.typeId === 2) {
        detailAsset =
          <div key={detail.asssetId} >
            <h1 className="headAdd">รายละเอียดสินค้า</h1>
            <img alt={detail.asssetImage}
              className='img-detail'
              key={detail.asssetImage}
              src={detail.asssetImage}>
            </img>
            <div className="detail-table">
              <div><p>ชื่อ</p>
                <p className='detail-field' key={detail.asssetName}>{detail.assetName}</p></div>

              <div><p>ราคา (บาท)</p>
                <p className='detail-field' key={detail.price}>{detail.price} </p></div>

              <p>รายละเอียดสินค้า</p>
              <div><p key={detail.assetDetail} className='detail-textarea'>{detail.assetDetail}  </p></div>

            </div>
          </div>
      }
    }

    )

    return (
      <div>
        <Header />

        

          <button className="add" onClick={this.openModalAdd} ></button>

          <h1 className="head">เพิ่ม-ลด สินค้า</h1>

          <form>
            <input type="text" className="search" placeholder="SEARCH" />
          </form>
          <div className="btn-type">
            <button onClick={this.allProduct}>ทั้งหมด</button>
            <button onClick={this.showTree}>ต้นไม้</button>
            <button onClick={this.showAsset}>อุปกรณ์</button>
          </div>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic" >
              {this.state.typeAsset}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.allProduct}>ทั้งหมด</Dropdown.Item>
              <Dropdown.Item onClick={this.showTree}>ต้นไม้</Dropdown.Item>
              <Dropdown.Item onClick={this.showAsset}>อุปกรณ์</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>



          <div className='table-plants'>
            {productAsset}
          </div>

          <Modal
            isOpen={this.state.modalAddIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal} >
            <ModalAdd />
          </Modal>

          <Modal
            isOpen={this.state.modalDetailIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal} >
            {detailAsset}
            <div className="manage-btn">
              <button className="edit-btn"> แก้ไข </button>

              <Popup trigger={<button className="delete-btn"> ลบ </button>} modal>
                <h1 className="headAdd">ต้องการที่จะลบใช่หรือไม่</h1>
                <div className="delete-popup">
                  <button onClick={this.deleteAsset}> ใช่ </button>
                  <button onClick={this.closeModal}> ไม่ใช่ </button>
                </div>
              </Popup>
            </div>

          </Modal>
        </div >




        );
    
      }
    }
    export default Product;
    
    
    
