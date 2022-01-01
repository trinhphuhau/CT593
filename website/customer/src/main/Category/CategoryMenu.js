import { Route, Link } from "react-router-dom";
import "../Welcome/Welcome.css";
import logo from "../../img/logo.png";

function CategoryMenu() {
  return (
    <div className="welcome">
      <Link to="/" title="Trang chủ">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <Route exact path="/"></Route>
      <div className="category-menu">
        <h3>Danh mục sản phẩm</h3>
        <ul>
          <li>Kỹ năng học tập</li>
          <li>Kỹ năng tư duy</li>
          <li>Hướng nghiệp</li>
          <li>Kỹ năng sống</li>
          <li>Phát triển bản thân</li>
        </ul>
      </div>
    </div>
  );
}

export default CategoryMenu;
