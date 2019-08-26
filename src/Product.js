import React, { Component } from 'react';
import './Product.css'
import Header from './header';
//import Search from './header';
import tree from './tree.png';
//import ShowPlants from './App';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';


class Product extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <Header />
        <Button className="add" onClick={this.openModal} ></Button>

        <h1 className="head">เพิ่ม-ลด สินค้า</h1>

        <form>
          <input type="text" className="search" placeholder="SEARCH" />
        </form>
        <div className="btn-group">
          <Button className="bu">ทั้งหมด</Button>
          <Button className="bu">ต้นไม้</Button>
          <Button className="bu">อุปกรณ์</Button>

          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}>

            <button onClick={this.closeModal} className="close"></button>
            <div>
              <h1 className="headAdd">เพิ่มสินค้า</h1>
              <label className="uploadImage">

                <input type="file" />
              </label>



              <form className="formAdd">
                <div><p>ชื่อ</p><input type="text" /></div>
                <div><p>ขนาด</p><input type="text" /></div>
                <div><p>ประเภท</p>
                  <select className="type">
                    <option value="tree">Tree</option>
                    <option value="asset">Asset</option>
                  </select>
                </div>
                <div><p>ราคา</p><input type="text" /></div>

              </form>

              <form className="detail">
                <p>รายละเอียดสินค้า</p>
                <textarea ></textarea>
              </form>

              <button className="save">บันทึก</button>

            </div>

          </Modal>

        </div>
        <ShowTree />

      </div>
    );

  }
}

export default Product;

class ShowTree extends Component {
  render() {
    return (
      <div className='tablePlant'>
        <img src={tree} className="tree" alt="tree" />
        <Button className="price">75 บาท</Button>
        <p className="name">ยางอินเดีย</p>
        <p className="detail">รายละเอียดสินค้า</p>
      </div>

    )
  }
}

