import "../Header/Header.css";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import NavUser from "../NavUser/NavUser";
import HeaderMobile from "../NavMobile/HeaderMobile";

function OrderHeader(props) {
  const { cartItems, header } = props;
  const history = useHistory();
  const path = useLocation();
  const prevPath = path.pathname.includes("/order-history/")
    ? "/history-to-account"
    : history.location.state !== undefined
    ? history.location.state.prevPath
    : "/order-history/all";
  const text = path.pathname.includes("/order-history/")
    ? "Lịch sử đặt hàng"
    : "Chi tiết đơn hàng";
  return (
    <div className="header">
      <div className="navigation" id="header">
        <nav>
          <ul className="navigation-link">
            <li>
              <Link to="/">Trang chủ</Link>
              {header()}
            </li>
          </ul>
        </nav>
        <NavUser cartItems={cartItems} />
      </div>
      <HeaderMobile text={text} link={prevPath} />
    </div>
  );
}

export default OrderHeader;
