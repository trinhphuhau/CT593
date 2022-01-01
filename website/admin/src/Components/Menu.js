import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <div className="col-2 border-end pe-0 menu">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink className="nav-link" to="/" exact>
            <span className="material-icons-outlined">space_dashboard</span>{" "}
            Trang chủ
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/products">
            <span className="material-icons-outlined"> storefront </span>{" "}
            Sản phẩm
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/inventory">
            <span className="material-icons-outlined"> inventory_2 </span>{" "}
            Kho hàng
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/orders">
            <span className="material-icons-outlined"> feed </span> Đơn hàng
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/review">
            <span className="material-icons-outlined"> message </span> Đánh giá
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/staffs">
            <span className="material-icons-outlined">account_circle</span>{" "}
            Nhân viên
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/customers">
            <span className="material-icons-outlined"> people </span> Khách hàng
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/promotion">
            <span className="material-icons-outlined"> discount </span> Khuyến mãi
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/messages">
            <span className="material-icons-outlined"> campaign </span> Thông báo
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
