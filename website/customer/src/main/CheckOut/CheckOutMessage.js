import { Link } from "react-router-dom";

export default function CheckOutMessage(props) {
  const { messageTop, messageBottom, imgSrc, imgStyles, id } = props;
  const closeBtn = () => {
    document.getElementById("overlay").classList.toggle("active");
    document.getElementById(id).classList.toggle("active");
    if (document.querySelector(".navigation-mobile.zIndex1")) {
      document.querySelector(".navigation-mobile").classList.toggle("zIndex1");
    }
  };
  return (
    <div className="checkout-message" id={id}>
      <div className="close-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
          onClick={closeBtn}
        >
          <path d="M0 0h24v24H0V0z" fill="none"></path>
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
        </svg>
      </div>
      <div className="checkout-message-top">{messageTop}</div>
      <img src={imgSrc} alt="" style={imgStyles} />
      <div className="checkout-message-bottom">
        <Link
          to={id === "order-success" ? "/order-history/all" : "/check-out"}
          onClick={() => {
            document.getElementById("overlay").classList.toggle("active");
            document.getElementById("order-success").classList.toggle("active");
            if (document.querySelector(".navigation-mobile.zIndex1")) {
              document
                .querySelector(".navigation-mobile")
                .classList.toggle("zIndex1");
            }
          }}
        >
          {messageBottom}
        </Link>
      </div>
    </div>
  );
}
