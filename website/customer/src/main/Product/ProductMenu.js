import { Route, Link } from "react-router-dom";
import "../Welcome/Welcome.css";
import logo from "../../img/logo.png";

function ProductMenu() {
  return (
    <div className="welcome">
      <Link to="/" title="Home">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <Route exact path="/"></Route>
      <div className="product-info">
        <h3>Thông tin sản phẩm</h3>
        <ul>
            <li>Mã hàng</li>
            <li>Tên sản phẩm</li>
            <li>Tác giả</li>
            <li>Thể loại</li>
            <li>Nhà xuất bản</li>
            <li>Năm xuất bản</li>
        </ul>
      </div>
    </div>
  );
}

export default ProductMenu;
