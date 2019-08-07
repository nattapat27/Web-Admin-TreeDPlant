import React, { Component } from 'react';
import './Order.css'
import Header from './header';
//import Search from './header';
//import ShowPlants from './App';
import { Button} from 'react-bootstrap';

class Order extends Component {

  render() {
    return (
      <div>
        <Header />
        <h1 className="head">จัดการคำสั่งซื้อ</h1>
        
        <form>
          <input type="text" name="search" placeholder="SEARCH" />

        </form>
        <div className="btn-group">
        <Button className="bu">ทั้งหมด</Button>
        <Button className="bu">รอกำเนินการ</Button>
        <Button className="bu">เตรียมจัดส่ง</Button>
        <Button className="bu">เสร็จสมบูรณ์</Button>
        </div>

        <AllOrders/>
    </div>
    );
  }

}
export default Order;

class AllOrders extends Component{
    render(){
        return(
            <div className='tableAllOrder'>
                <div className="noOrder">
                <p className="headText">รหัสคำสั่งซื้อ</p>
                <p className="number">2344543544</p>
                </div>
            
            <p className="name">ยางอินเดีย</p>
            <p className="detail">รายละเอียดสินค้า</p>
         </div>
        )
    }
}