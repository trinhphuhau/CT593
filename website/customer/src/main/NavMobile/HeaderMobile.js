import "../Header/Header.css";
import React from "react";
import { Link } from "react-router-dom";

function HeaderMobile(props) {
  const { text, link } = props;
  return (
    <div id="headerMobile">
      <nav>
        <ul className="navigation-link">
          <li>
            {link !== "/history-to-account" ? (
              <Link to={link}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <rect fill="none" height="24" width="24"></rect>
                  <g>
                    <polygon points="17.77,3.77 16,2 6,12 16,22 17.77,20.23 9.54,12"></polygon>
                  </g>
                </svg>
              </Link>
            ) : (
              <a
                onClick={() => {
                  document
                    .getElementById("userAccount")
                    .classList.toggle("active");
                  document
                    .getElementById("accountNav")
                    .classList.toggle("active");
                  document.getElementById("overlay").classList.toggle("active");
                  if (document.querySelector(".navigation-mobile.hide")) {
                    document
                      .querySelector(".navigation-mobile")
                      .classList.toggle("hide");
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <rect fill="none" height="24" width="24"></rect>
                  <g>
                    <polygon points="17.77,3.77 16,2 6,12 16,22 17.77,20.23 9.54,12"></polygon>
                  </g>
                </svg>
              </a>
            )}
            <span className="active">{text}</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HeaderMobile;
