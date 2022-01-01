import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavMobile.css";
function NavMobile() {
  const location = useLocation();
  const showFormAccount = () => {
    if (!document.querySelector("#userAccount.active")) {
      document.getElementById("userAccount").classList.toggle("active");
      document.getElementById("accountNav").classList.toggle("active");
      document.getElementById("overlay").classList.toggle("active");
      document
        .querySelector(".navigation-mobile li a.active")
        .classList.toggle("active");
    }
  };
  const offShowFormAccount = (id) => {
    if (document.querySelector(".user-account.active")) {
      document.getElementById(id).classList.toggle("active");
      document.getElementById("userAccount").classList.toggle("active");
      document.getElementById("accountNav").classList.toggle("active");
    }
    if (document.querySelector("#overlay.active")) {
      document.getElementById("overlay").classList.toggle("active");
    }
  };
  return (
    <nav className="navigation-mobile">
      <ul>
        <li
          onClick={() => {
            offShowFormAccount("homeNav");
          }}
        >
          <Link
            to="/"
            id="homeNav"
            className={location.pathname === "/" ? "active" : ""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32px"
              viewBox="0 0 24 24"
              width="32px"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </Link>
        </li>
        <li
          onClick={() => {
            offShowFormAccount("cartNav");
          }}
        >
          <Link
            to="/check-out"
            id="cartNav"
            className={location.pathname === "/check-out" ? "active" : ""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32px"
              viewBox="0 0 24 24"
              width="32px"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </Link>
        </li>
        <li onClick={showFormAccount}>
          <a id="accountNav">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32px"
              viewBox="0 0 24 24"
              width="32px"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavMobile;
