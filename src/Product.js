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
      searchName: null,
      typeAsset: 'ทั้งหมด',
      editAssetDetail: false,
      disabled: true,
      image: null,
      assets: [],
      detail: [],
      id: {
        assetID: 0,
      },
      assetEdit: {
        price: '',
        name: '',
        image: '',
        detail: '',
      },
      treeEdit: {
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
    //setTimeout(() => { console.log(this.state.detail) }, 1000)
    this.setState({ assetID: id });
    //this.state.id.assetID = id

  }

  afterOpenModal() {
  }


  closeModal() {
    this.setState({
      modalAddIsOpen: false,
      modalDetailIsOpen: false
    });
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

  searchAsset = (e) => {
    if (e.key === 'Enter' && this.state.searchName.assetName !== '') {
      e.preventDefault()
      this.setState({ assets: this.state.assets.filter(assets => assets.assetName === this.state.searchName.assetName) })
      console.log(this.state.assets)
    } else if (e.key === "Delete" || e.key === "Backspace") {
      //console.log(this.state.searchName.assetName)
      if (this.state.searchName.assetName === '') {
        axios.get('https://treedp.doge.in.th/asset/getAllAsset')
          .then(response => {
            // console.log(response.data)
            this.setState({ assets: response.data })
          })
      }


    }

  }
  changeHandler = (e) => {
    const name = { ...this.state.searchName, [e.target.name]: e.target.value }
    this.setState({ name })
    this.setState({ searchName: name })
  }

  editAsset() {
    if (this.state.editAssetDetail === false) {
      this.setState({ editAssetDetail: true})
      this.setState({ disabled: !this.state.disabled })
    } else if (this.state.editAssetDetail === true) {
      this.setState({ editAssetDetail: false})
      this.setState({ disabled: !this.state.disabled })
    }
  }

  submitEditTree= e => {
    e.preventDefault()
    const apiURL = 'https://treedp.doge.in.th/asset/edit/tree'
    axios.post(apiURL, this.state.treeEdit)
      .then(response => {
        alert("Edit already", (response.data.assetName))
        window.location.reload();
        this.setState({ editAssetDetail: false})
        console.log(this.state.editAssetDetail)
      }
      )
  }


  render() {
    const { name, price, detail } = this.state.assetEdit;
      const { tree_name, tree_image, tree_price, tree_detail,
        width, height, model, shader } = this.state.treeEdit;
    let detailAsset
    const { assets } = this.state
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
        this.state.image = detail.asssetImage
        detailAsset =
          <div key={detail.asssetId} >
            <h1 className="headAdd">รายละเอียดสินค้า</h1>
            <img alt={detail.asssetImage}
              className='img-detail'
              key={detail.asssetImage}
              src={this.state.image}>
            </img>
            <div className="detail-table">

              <div><p>ชื่อ</p>
                <input className='detail-field'
                  key={detail.asssetName}
                  disabled={(this.state.disabled) ? "disabled" : ""}
                  defaultValue={detail.assetName}
                />
              </div>

              <div><p>สูง (ซม.)</p>
                <input className='detail-field'
                  key={detail.height}
                  disabled={(this.state.disabled) ? "disabled" : ""}
                  defaultValue={detail.treeId.height}
                />
              </div>

              <div><p>กว้าง (ซม.)</p>
                <input className='detail-field'
                  key={detail.width}
                  disabled={(this.state.disabled) ? "disabled" : ""}
                  defaultValue={detail.treeId.width} />
              </div>

              <div><p>ราคา (บาท)</p>
                <input className='detail-field'
                  key={detail.price}
                  disabled={(this.state.disabled) ? "disabled" : ""}
                  defaultValue={detail.price} />
              </div>

              <p>รายละเอียดสินค้า</p>
              <div>
                <textarea key={detail.assetDetail}
                  className='detail-textarea'
                  disabled={(this.state.disabled) ? "disabled" : ""}
                  defaultValue={detail.assetDetail} />
              </div>

            </div>

          </div>

      } else if (this.state.detail[0].typeId.typeId === 2) {
        detailAsset =
          <div key={detail.asssetId} >
            <h1 className="headAdd">รายละเอียดสินค้า</h1>
            <img alt={detail.asssetImage}
              className='img-detail'
              key={detail.asssetImage}
              src={this.state.image}>
            </img>
            <div className="detail-table">
              <div><p>ชื่อ</p>
                <input className='detail-field'
                  key={detail.asssetName}
                  disabled={(this.state.disabled) ? "disabled" : ""}
                  defaultValue={detail.assetName}
                />
              </div>

              <div><p>ราคา (บาท)</p>
                <input className='detail-field'
                  key={detail.price}
                  disabled={(this.state.disabled) ? "disabled" : ""}
                  defaultValue={detail.price} />
              </div>

              <p>รายละเอียดสินค้า</p>
              <div>
                <textarea key={detail.assetDetail}
                  className='detail-textarea'
                  disabled={(this.state.disabled) ? "disabled" : ""}
                  defaultValue={detail.assetDetail} />
              </div>

            </div>

          </div>
      }
    }
    
    )

    let manageButton 
    if(this.state.editAssetDetail===false){
      manageButton=
    <div className="manage-btn">
    <Popup trigger={<button className="delete-btn"> ลบ </button>} modal>
      <h1 className="headAdd">ต้องการที่จะลบใช่หรือไม่</h1>
      <div className="delete-popup">
        <button onClick={this.deleteAsset}> ใช่ </button>
        <button onClick={this.closeModal}> ไม่ใช่ </button>
      </div>
    </Popup>
    <button className="edit-btn" onClick={this.editAsset.bind(this)}>แก้ไข</button>
  </div>
    }else if(this.state.editAssetDetail===true){
      manageButton =
      <div className="manage-btn">
      <button className="edit-btn" onClick={this.submitEdit}>บันทึก</button>
      <button className="edit-btn" onClick={this.editAsset.bind(this)}>ยกเลิก</button>
      </div>
    }
    return (
      <div>
        <Header />



        <button className="add" onClick={this.openModalAdd} ></button>

        <h1 className="head">เพิ่ม-ลด สินค้า</h1>

        <form>
          <input type="search" className="search" placeholder="SEARCH" name="assetName"
            value={this.searchName}
            onChange={this.changeHandler}
            onKeyDown={this.searchAsset}
          />

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
          {manageButton}
        </Modal>
      </div>



    );

  }
}
export default Product;



