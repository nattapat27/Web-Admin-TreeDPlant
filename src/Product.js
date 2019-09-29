import React, { Component } from 'react';
import './Product.css'
import Header from './header';
import Modal from 'react-modal';
import axios from 'axios';


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddIsOpen: false,
      modalDetailIsOpen: false,
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
    console.log()
    axios.get('https://treedp.doge.in.th/asset/getAllAsset/tree')
      .then(response => {
        //console.log(response.data)
        this.setState({ assets: response.data })
      })
  }
  showAsset = e => {
    e.preventDefault()
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
        <div className='price' key={asset.price}>{asset.price} THB</div>
        <p key={asset.assetName}>{asset.assetName}</p>
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
        <div className="btn-group">
          <button onClick={this.allProduct}>ทั้งหมด</button>
          <button onClick={this.showTree}>ต้นไม้</button>
          <button onClick={this.showAsset}>อุปกรณ์</button>
        </div>
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
          <div className="btn-div"><button className="delete-btn" onClick={this.deleteAsset}>ลบ</button></div>
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
        alert(response.data.assetName)
        window.location.reload();
      }
      )
  }
  addAsset = e => {
    e.preventDefault()
    const apiURL = 'https://treedp.doge.in.th/asset/save'
    axios.post(apiURL, this.state.asset)
      .then(response => {
        alert(response.data.assetName)
        window.location.reload();
      }
      )
  }
  changeHandler = (e) => {
    const asset = { ...this.state.asset, [e.target.name]: e.target.value }
    const tree = { ...this.state.tree, [e.target.name]: e.target.value }
    this.setState({ asset })
    this.setState({ tree })
  }
  render() {
    const { name, image, price, detail } = this.state.asset;
    const { tree_name, tree_image, tree_price, tree_detail,
      width, height, model, shader } = this.state.tree;

    return (
      <div className="modal">

        <h1 className="headAdd">เพิ่มสินค้า</h1>
        <div className="typeAsset">
          <button
            onClick={() => this.trees()}>ต้นไม้</button>
          <button
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
            <form className="formAdd">
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

            <form className="detail-asset">
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


