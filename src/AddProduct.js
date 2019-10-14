import React, { Component } from 'react';
import './Product.css'
import axios from 'axios';
import upload from './upload.png';
import 'bootstrap/dist/css/bootstrap.css';


class ModalAdd extends Component {
    constructor() {
      super()
      this.state = {
        trees: true,
        assets: false,
        file: upload,
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
        <div>
  
          <h1 className="headAdd">เพิ่มสินค้า</h1>
          <div className="typeAsset">
            <button
              onClick={() => this.trees()}>ต้นไม้</button>
            <button
              onClick={() => this.assets()}>อุปกรณ์</button>
          </div>
  
  
          {this.state.trees ?
            <div>
              <label className="uploadImage">
                <img src={this.state.file} title="Upload Image" />
                <input className="img-upload" type="file"
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
              <label className="uploadImage">
                <img src={this.state.file} />
  
                <input className="img-upload" type="file"
                  name="image"
                  value={tree_image}
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
  export default ModalAdd;