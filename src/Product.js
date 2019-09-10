import React, { Component } from 'react';
import './Product.css'
import Header from './header';
import { Button } from 'react-bootstrap';
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
    return (
      <div>
        <Header />
        <Button className="add" onClick={this.openModalAdd} ></Button>

        <h1 className="head">เพิ่ม-ลด สินค้า</h1>

        <form>
          <input type="text" className="search" placeholder="SEARCH" />
        </form>
        <div className="btn-group">
          <Button onClick={this.allProduct}>ทั้งหมด</Button>
          <Button onClick={this.showTree}>ต้นไม้</Button>
          <Button onClick={this.showAsset}>อุปกรณ์</Button>
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
          <div>rrrr</div>
        </Modal>

        {assets.length ?
          assets.map(asset =>
            <div key={asset.assetId} className='tablePlant' >
              <img alt='treeD-Plant' className='img-asset' key={asset.asssetImage} src={asset.asssetImage}></img>
              <div className='price' key={asset.price}>{asset.price} THB</div>
              <p key={asset.assetName}>{asset.assetName}</p>
              <p className='detail' onClick={this.openModalDetail}>รายละเอียดสินค้า</p>
            </div>
          ) : null
        }

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
        asset_name: '',
        asset_image: '',
        price: '',
        asset_detail: '',
        width: '',
        height: '',
        model: '',
        shader: '',
        scale: 0.1,
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
    axios.post(apiURL, this.state.tree)
      .then(response => {
        //console.log(response.data)
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
    this.setState({ asset })
    console.log(asset);
  }
  render() {
    const { name, image, price, detail, width, height, model, shader } = this.state.asset;
    return (
      <div className="modal">

        <h1 className="headAdd">เพิ่มสินค้า</h1>

        <label className="uploadImage" >
          <input type="file"
            name="image"
            value={image}
            onChange={this.changeHandler}
            src={this.state.file}
          />
        </label>

        <div className="typeAsset">
          <Button className="bu"
            onClick={() => this.trees()}>ต้นไม้</Button>
          <Button className="bu"
            onClick={() => this.assets()}>อุปกรณ์</Button>
        </div>


        {this.state.trees ?
          <div>
            <form className="formTree">
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
              <p > อัพโหลดโมเดล</p>
              <label >
                <input type="file"
                  name="model"
                  value={model}
                  onChange={this.changeHandler}
                />
              </label></div>
              <div>
              <p > อัพโหลดพื้นผิว</p>
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
                value={detail}
                onChange={this.changeHandler}></textarea>
            </form>
            <br></br>
            <button className="save" onClick={this.addTree}>บันทึก</button>
          </div>
          : null
        }


        {this.state.assets ?
          <div>
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