import "../Header/Header.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import NavUser from "../NavUser/NavUser";

function SearchHeader(props) {
  const { cartItems } = props;
  return (
    <div className="header">
      <div className="navigation">
        <nav>
          <ul className="navigation-link">
            <li className={useLocation().pathname === "/" ? "active" : ""}>
              <Link to={"/"}>Trang chủ</Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="rgba(199, 199, 199, 0.7)"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
              </svg>{" "}
              <span className="active">Tìm kiếm</span>
            </li>
          </ul>
        </nav>
        <NavUser cartItems={cartItems} />
      </div>
    </div>
  );
}

export default SearchHeader;