import "../Header/Header.css";
import React, { useEffect } from "react";
import NavUser from "../NavUser/NavUser";
import { Link } from "react-router-dom";
import { useState } from "react";
import Skeletion from "../Skeletion/Skeleton";
import HeaderMobile from "../NavMobile/HeaderMobile";

function ProductHeader(props) {
  const { cartItems, bookDetail } = props;
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  }, []);
  return (
    <div className="header">
      <div className="navigation" id="header">
        <nav>
          <ul className="navigation-link">
            <li className="">
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
              {!loaded && (
                <Skeletion
                  extraStyles={{
                    width: "100px",
                    height: "26px",
                    marginBottom: "5px",
                  }}
                />
              )}
              {loaded && (
                <Link to={"/category?id=" + bookDetail[0].genre_id}>
                  {bookDetail[0].genre}
                </Link>
              )}
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
              {!loaded && (
                <Skeletion
                  extraStyles={{
                    width: "400px",
                    height: "26px",
                    marginBottom: "5px",
                  }}
                />
              )}
              {loaded && <span className="active">{bookDetail[0].title}</span>}
            </li>
          </ul>
        </nav>
        <NavUser cartItems={cartItems} />
      </div>
      <HeaderMobile text="Chi tiết sản phẩm" link="/" />
    </div>
  );
}

export default ProductHeader;
