import { React, Component } from "react";
import "./Info.css";

class Info extends Component {
  render() {
    return (
      <div className="info" id={this.props.id}>
        <h1 className="store-name">Book Lovers</h1>
        <p className="store-slogan">Find yourself in a great book.</p>
        <div className="store-info">
          <h4>Liên hệ với chúng tôi</h4>
          <div className="store-social">
            <span className="facebook"></span>
            <span className="instagram"></span>
            <span className="twitter"></span>
            <span className="youtube"></span>
            <span className="tiktok"></span>
          </div>
          <div className="store-contact">
            <div>
              <span>Địa chỉ:</span> Khu II, đường 3/2, quận Ninh Kiều, thành phố Cần Thơ
            </div>
            <div>
              <span>Số điện thoại:</span> 0123 456 789
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;
