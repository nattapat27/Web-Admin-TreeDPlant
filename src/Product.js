import React, { Component } from 'react';
import './Product.css'
import Header from './header';
//import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';


class Product extends Component {
  constructor() {
    super();
    this.state = {
      modalAddIsOpen: false,
      modalDetailIsOpen: false,
      assets: []
    };

    this.openModalAdd = this.openModalAdd.bind(this);
    this.openModalDetail = this.openModalDetail.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModalAdd() {
    this.setState({ modalAddIsOpen: true });
  }
  openModalDetail() {
    this.setState({ modalDetailIsOpen: true });

  }

  afterOpenModal() {
  }

  closeModal() {
    this.setState({ modalAddIsOpen: false });
    this.setState({ modalDetailIsOpen: false });
  }
  componentDidMount() {
    Modal.setAppElement('body');
    console.log()
    axios.get('https://treedp.doge.in.th/asset/getAllAsset')
      .then(response => {
        console.log(response.data)
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
    console.log()
    axios.get('https://treedp.doge.in.th/asset/getAllAsset/tree')
      .then(response => {
        //console.log(response.data)
        this.setState({ assets: response.data })
      })
  }
  showAsset = e => {
    e.preventDefault()
    console.log()
    axios.get('https://treedp.doge.in.th/asset/getTypeAsset')
      .then(response => {
        //console.log(response.data)
        this.setState({ assets: response.data })

      })
  }
  render() {
    const { assets } = this.state
    let productAsset = assets.map(asset =>
      <div key={asset.assetId} name='id' className='tablePlant' >
        <img alt={asset.asssetName}
          className='img-asset'
          key={asset.asssetImage}
          src={asset.asssetImage}>
        </img>
        <div className='price' key={asset.price}>{asset.price} THB</div>
        <p key={asset.assetName}>{asset.assetName}</p>
        <p className='detailProduct' onClick={() => { this.openModalDetail(asset.assetId) }}>รายละเอียดสินค้า</p>
      </div>
    )

    return (
      <div>
        <Header />
        <button className="add" onClick={this.openModalAdd} ></button>

        <h1 className="head">เพิ่ม-ลด สินค้า</h1>

        <form>
          <input type="text" className="search" placeholder="SEARCH" />
        </form>
        <div className="btn-group">
          <button onClick={this.allProduct}>ทั้งหมด</button>
          <button onClick={this.showTree}>ต้นไม้</button>
          <button onClick={this.showAsset}>อุปกรณ์</button>
        </div>
        {productAsset}
        
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
          <ModalDetail/>
        </Modal>
      </div>


    );

  }
}
export default Product;

class ModalAdd extends Component {
  constructor() {
    super()
    this.state = {
      trees: true,
      assets: false,
      asset: {
        price: '',
        name: '',
        image: '',
        detail: '',
      },
      tree: {
        name: '',
        image: '',
        price: '',
        detail: '',
        width: '',
        height: '',
        model: '',
        shader: '',
        scale: '0.1',
      }
    }


  }
  assets() {
    this.setState({
      trees: false,
      assets: true
    })
  }
  trees() {
    this.setState({
      trees: true,
      assets: false
    })
  }
  addTree = e => {
    e.preventDefault()
    const apiURL = 'https://treedp.doge.in.th/asset/save/tree'
    axios.post(apiURL, this.state.asset)
      .then(response => {
        alert(response.data.assetName)
      }
      )
  }
  addAsset = e => {
    e.preventDefault()
    const apiURL = 'https://treedp.doge.in.th/asset/save'
    axios.post(apiURL, this.state.asset)
      .then(response => {

        alert(response.data.assetName)
      }
      )
  }
  changeHandler = (e) => {
    const asset = { ...this.state.asset, [e.target.name]: e.target.value }
    const tree = { ...this.state.tree, [e.target.name]: e.target.value }
    this.setState({ asset })
    this.setState({ tree })
    console.log(asset);
  }
  render() {
    const { name, image, price, detail } = this.state.asset;
    const { tree_name, tree_image, tree_price, tree_detail,
      width, height, model, shader } = this.state.tree;

    return (
      <div className="modal">

        <h1 className="headAdd">เพิ่มสินค้า</h1>



        <div className="typeAsset">
          <button className="bu"
            onClick={() => this.trees()}>ต้นไม้</button>
          <button className="bu"
            onClick={() => this.assets()}>อุปกรณ์</button>
        </div>


        {this.state.trees ?
          <div>
            <label className="uploadImage" >
              <input type="file"
                name="image"
                value={tree_image}
                onChange={this.changeHandler}
              />
            </label>
            <form className="formTree">
              <div><p>ชื่อ</p>
                <input type="text"
                  name="name"
                  value={tree_name}
                  onChange={this.changeHandler} /></div>

              <div><p>ราคา (บาท)</p>
                <input type="number"
                  name="price"
                  value={tree_price}
                  onChange={this.changeHandler} /></div>
              <div><p>กว้าง (ซ.ม.)</p>
                <input type="number"
                  name="width"
                  value={width}
                  onChange={this.changeHandler} /></div>
              <div><p>สูง (ซ.ม.)</p>
                <input type="number"
                  name="height"
                  value={height}
                  onChange={this.changeHandler} /></div>
              <div>
                <p >อัพโหลดโมเดล</p>
                <label >
                  <input type="file"
                    name="model"
                    value={model}
                    onChange={this.changeHandler}
                  />
                </label></div>
              <div>
                <p >อัพโหลดพื้นผิว</p>
                <label >
                  <input type="file"
                    name="shader"
                    value={shader}
                    onChange={this.changeHandler}
                  />
                </label>
              </div>
            </form>

            <form className="detail">
              <p>รายละเอียดสินค้า</p>
              <textarea
                name="detail"
                value={tree_detail}
                onChange={this.changeHandler}></textarea>
            </form>
            <br></br>
            <button className="save" onClick={this.addTree}>บันทึก</button>
          </div>
          : null
        }


        {this.state.assets ?
          <div>
            <label className="uploadImage" >
              <input type="file"
                name="image"
                value={image}
                onChange={this.changeHandler}
              />
            </label>
            <form className="formAdd">
              <div><p>ชื่อ</p>
                <input type="text"
                  name="name"
                  value={name}
                  onChange={this.changeHandler} /></div>

              <div><p>ราคา (บาท)</p>
                <input type="number"
                  name="price"
                  value={price}
                  onChange={this.changeHandler} /></div>

            </form>

            <form className="detail">
              <p>รายละเอียดสินค้า</p>
              <textarea
                name="detail"
                value={detail}
                onChange={this.changeHandler}></textarea>
            </form>
            <br></br>
            <button className="save" onClick={this.addAsset}>บันทึก</button>
          </div>
          : null
        }
      </div>
    )
  }
}

class ModalDetail extends Component{

  render(){
    return(
      <div className="modal-detail">
    <h1 className="headDetail">รายละเอียดสินค้า</h1>
    <p>ชื่อ</p>
    <div className="detail-form"></div>
    </div>
    )
  }
}
