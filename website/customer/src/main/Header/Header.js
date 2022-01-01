import "./Header.css";
import React from "react";
import NavUser from "../NavUser/NavUser";
import NavLink from "../NavLink/NavLink";
import HeaderMobile from "../NavMobile/HeaderMobile";
import { useLocation } from "react-router-dom";

function Header(props) {
  const { customerInfo, cartItems } = props;
  return (
    <div className="header">
      <div className="navigation" id="header">
        <NavLink customerInfo={customerInfo} />
        <NavUser cartItems={cartItems} />
      </div>
      {useLocation().pathname === "/for-you" ? (
        <HeaderMobile text="Dành cho bạn" link="/history-to-account" />
      ) : (
        ""
      )}
    </div>
  );
}

export default Header;
