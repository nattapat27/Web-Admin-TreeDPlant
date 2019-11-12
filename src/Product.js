import React, { Component } from 'react';
import './Product.css'
import Header from './header';
import ModalAdd from './AddProduct';
import Modal from 'react-modal';
import axios from 'axios';
import Popup from "reactjs-popup";
import 'bootstrap/dist/css/bootstrap.css';
import { Dropdown } from 'react-bootstrap';
import { storage } from './firebase';
import 'firebase/storage';


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
      url: null,
      editImage: false,
      id: {
        assetID: 0,
      },
      assetEdit: {
        assetID: '',
        price: '',
        name: '',
        image: '',
        detail: '',
        status: true
      },
      treeEdit: {
        assetID: '',
        name: '',
        image: '',
        price: '',
        detail: '',
        width: '',
        height: '',
        model: '',
        shader: '',
        scale: 0.1,
        status: true
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
    this.setState({ modalDetailIsOpen: true, editAssetDetail: false, disabled: true });
    this.setState({ detail: this.state.assets.filter(assets => assets.assetId === id) })
    //setTimeout(() => { console.log(this.state.detail[0]) }, 1000)
    this.state.id.assetID = id
  }

  afterOpenModal() {
  }


  closeModal() {
    this.setState({
      modalAddIsOpen: false,
      modalDetailIsOpen: false,

    });
  }
  componentDidMount() {
    //console.log(this.props.login)
    Modal.setAppElement('body');
    axios.get('https://treedp.doge.in.th/asset/getAllAsset')
      .then(response => {
        this.setState({ assets: response.data.filter(assets => assets.status === true) })
      })
  }


  allProduct = e => {
    e.preventDefault()
    axios.get('https://treedp.doge.in.th/asset/getAllAsset')
      .then(response => {
        this.setState({ assets: response.data.filter(assets => assets.status === true) })
      })
  }
  showTree = e => {
    e.preventDefault()
    this.setState({ typeAsset: 'ต้นไม้' })
    axios.get('https://treedp.doge.in.th/asset/getAllAsset/tree')
      .then(response => {
        this.setState({ assets: response.data.filter(assets => assets.status === true) })
      })
  }
  showAsset = e => {
    e.preventDefault()
    this.setState({ typeAsset: 'อุปกรณ์' })
    axios.get('https://treedp.doge.in.th/asset/getTypeAsset')
      .then(response => {
        this.setState({ assets: response.data.filter(assets => assets.status === true) })

      })
  }

  deleteAsset = e => {
    e.preventDefault()
    const apiURL = 'https://treedp.doge.in.th/asset/delete'
    this.setState({ modalDetailIsOpen: false });
    axios.post(apiURL, this.state.id)
      .then(response => {
        alert("Delete   " + (response.data.assetName) + "already")
        window.location.reload();
      }
      )
  }

  searchAsset = (e) => {
    if (e.key === 'Enter' && this.state.searchName.assetName !== '') {
      e.preventDefault()
      this.setState({ assets: this.state.assets.filter(assets => assets.assetName === this.state.searchName.assetName) })
    } else if (e.key === "Delete" || e.key === "Backspace") {
      if (this.state.searchName.assetName === '') {
        axios.get('https://treedp.doge.in.th/asset/getAllAsset')
          .then(response => {
            this.setState({ assets: response.data })
          })
      }
    }
  }
  changeHandler = (e) => {
    const name = { ...this.state.searchName, [e.target.name]: e.target.value }
    this.setState({ searchName: name })
  }

  changeHandlerEdit = (e) => {
    if (this.state.detail[0].treeId === null) {
      const edit = { ...this.state.assetEdit, [e.target.name]: e.target.value }
      this.setState({ assetEdit: edit })
      //console.log(this.state.assetEdit)
    } else if (this.state.detail[0].treeId != null) {
      const edit = { ...this.state.treeEdit, [e.target.name]: e.target.value }
      this.setState({ treeEdit: edit })
      console.log(this.state.treeEdit)
    }
  }

  changeHandlerImage = (e) => {
    const img = e.target.files[0]
    this.state.image = img
    this.setState({ editImage: true })
    //console.log(this.state.image)
  }

  editAsset() {
    this.setState({ editAssetDetail: true, disabled: false })
    //asset
    if (this.state.detail[0].treeId === null) {
      this.state.assetEdit.assetID = this.state.detail[0].assetId
      this.state.assetEdit.name = this.state.detail[0].assetName
      this.state.assetEdit.image = this.state.detail[0].asssetImage
      this.state.assetEdit.price = this.state.detail[0].price
      this.state.assetEdit.detail = this.state.detail[0].assetDetail
    } else if (this.state.detail[0].treeId != null) {
      this.state.treeEdit.assetID = this.state.detail[0].assetId
      this.state.treeEdit.name = this.state.detail[0].assetName
      this.state.treeEdit.image = this.state.detail[0].asssetImage
      this.state.treeEdit.price = this.state.detail[0].price
      this.state.treeEdit.detail = this.state.detail[0].assetDetail
      this.state.treeEdit.width = this.state.detail[0].treeId.width
      this.state.treeEdit.height = this.state.detail[0].treeId.height
      this.state.treeEdit.model = this.state.detail[0].treeId.model
      this.state.treeEdit.shader = this.state.detail[0].treeId.shader
    }
  }

  submitEdit = e => {
    e.preventDefault()
    this.setState({disabled: true })
    if (this.state.editImage === true) {
      const img = this.state.image
      //console.log(this.state.treeEdit)
      const upload = storage.ref("/images").child(img.name+img.lastModifiedDate).put(img)
      upload.then(snapshot => {
        return snapshot.ref.getDownloadURL()
          .then(
            downloadURL => {
              var url = downloadURL
              this.setState({ url, url: url })
            }
          )
      }, (error) => {
      });
    }

    setTimeout(() => {
      if (this.state.url != null) {
        this.state.assetEdit.image = this.state.url
        this.state.treeEdit.image = this.state.url
      }
      if (this.state.detail[0].treeId === null) {
        //console.log(this.state.assetEdit);
        const apiURL = 'https://treedp.doge.in.th/asset/edit'
        axios.post(apiURL, this.state.assetEdit)
          .then(response => {
            this.setState({editAssetDetail: false})
            alert("Edit   " + (this.state.assetEdit.name + "  already"))
            window.location.reload();
          }
          ).catch(error => {
            alert("Fill up")
          })
      } else if (this.state.detail[0].treeId != null) {
        //console.log(this.state.treeEdit);
        const apiURL = 'https://treedp.doge.in.th/asset/edit/tree'
        axios.post(apiURL, this.state.treeEdit)
          .then(response => {
            this.setState({editAssetDetail: false})
            alert("Edit  " + (this.state.treeEdit.name + "  already"))
            window.location.reload();
          }
          ).catch(error => {
            alert("Fill up")
          })
      }
    }, 2000);
  }


  render() {
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

            <label className="uploadImageEdit">
              <img alt={detail.asssetImage}
                name='image'
                className='img-detail'
                key={detail.asssetImage}
                src={this.state.image}
              />
              <input className="img-upload"
                type="file"
                name="image"
                disabled={(this.state.disabled) ? "disabled" : ""}
                onChange={this.changeHandlerImage}
              />
            </label>


            <div className="detail-table">

              <div><p>ชื่อ</p>
                <input className='detail-field'
                  name='name'
                  key={detail.asssetName}
                  disabled={(this.state.disabled) ? "disabled" : ""}
                  defaultValue={detail.assetName}
                  onChange={this.changeHandlerEdit}
                />
              </div>

              <div><p>สูง (ซม.)</p>
                <input className='detail-field'
                  name='height'
                  key={detail.height}
                  disabled={(this.state.disabled) ? "disabled" : ""}
                  defaultValue={detail.treeId.height}
                  onChange={this.changeHandlerEdit}
                />
              </div>

              <div><p>กว้าง (ซม.)</p>
                <input className='detail-field'
                  name='width'
                  key={detail.width}
                  disabled={(this.state.disabled) ? "disabled" : ""}
                  defaultValue={detail.treeId.width}
                  onChange={this.changeHandlerEdit} />
              </div>

              <div><p>ราคา (บาท)</p>
                <input className='detail-field'
                  name='price'
                  key={detail.price}
                  disabled={(this.state.disabled) ? "disabled" : ""}
                  defaultValue={detail.price}
                  onChange={this.changeHandlerEdit} />
              </div>

              <p>รายละเอียดสินค้า</p>
              <div>
                <textarea key={detail.assetDetail}
                  name='detail'
                  className='detail-textarea'
                  disabled={(this.state.disabled) ? "disabled" : ""}
                  defaultValue={detail.assetDetail}
                  onChange={this.changeHandlerEdit} />
              </div>

            </div>

          </div>

      } else if (this.state.detail[0].typeId.typeId === 2) {
        this.state.image = detail.asssetImage
        detailAsset =
          <div key={detail.asssetId} >
            <h1 className="headAdd">รายละเอียดสินค้า</h1>
            <label className="uploadImageEdit">
              <img alt={detail.asssetImage}
                name='image'
                className='img-detail'
                key={detail.asssetImage}
                src={this.state.image}
              />
              <input className="img-upload"
                type="file"
                name="image"
                disabled={(this.state.disabled) ? "disabled" : ""}
                onChange={this.changeHandlerImage}
              />
            </label>

            <div className="detail-table">
              <div><p>ชื่อ</p>
                <input className='detail-field'

                  name='name'
                  key={detail.asssetName}
                  disabled={(this.state.disabled) ? "disabled" : ""}
                  defaultValue={detail.assetName}
                  onChange={this.changeHandlerEdit}
                />
              </div>

              <div><p>ราคา (บาท)</p>
                <input className='detail-field'
                  name='price'
                  key={detail.price}
                  disabled={(this.state.disabled) ? "disabled" : ""}
                  defaultValue={detail.price}
                  onChange={this.changeHandlerEdit}
                />
              </div>

              <p>รายละเอียดสินค้า</p>
              <div>
                <textarea key={detail.assetDetail}
                  name='detail'
                  className='detail-textarea'
                  disabled={(this.state.disabled) ? "disabled" : ""}
                  defaultValue={detail.assetDetail}
                  onChange={this.changeHandlerEdit}
                />
              </div>

            </div>

          </div>
      }
    }

    )

    let manageButton
    if (this.state.editAssetDetail === false) {
      manageButton =
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
    } else if (this.state.editAssetDetail === true) {
      manageButton =
        <div className="manage-btn">
          <button className="edit-btn" onClick={this.submitEdit}>บันทึก</button>
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



