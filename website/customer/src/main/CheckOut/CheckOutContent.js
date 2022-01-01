import "./CheckOut.css";
import { numberFormat } from "../../numberFormat";
import { useState } from "react";
import Confirm from "./Confirm";

function CheckOutContent(props) {
  const { cartItems, onAdd, onRemove, showRemoveConfirm, onRemoveItem } = props;
  const [book, setBook] = useState({});
  const [removeOne, setRemoveOne] = useState({});

  const onRemoveItem1 = (item) => {
    if (item.quantity === 1) {
      showRemoveConfirm();
      setBook(item);
    } else {
      onRemove(item);
    }
  };

  const showRemoveOneConfirm = (item) => {
    document.getElementById("overlay").classList.toggle("active");
    document.getElementById("confirm_remove_one").classList.toggle("active");
    setRemoveOne(item);
  };

  const onRemoveOne = () => {
    onRemoveItem(removeOne);
    showRemoveOneConfirm();
  };

  return (
    <>
      <div id="checkout-content">
        <div className="checkout-header">
          <h1>Chi tiết giỏ hàng</h1>
        </div>
        {cartItems.length === 0 ? (
          <div className="checkout-empty-cart">
            <img
              src={require("../../img/pixeltrue-space-discovery-1.png").default}
              alt=""
              className="empty-cart-img"
            />
            <div style={{ marginTop: "45px", fontSize: "22px" }}>
              Bạn chưa có sản phẩm nào trong giỏ,
              <br />
              hãy lựa chọn và quay lại sau nhé
              <img
                src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/285/grinning-cat-with-smiling-eyes_1f638.png"
                alt=""
                className="empty-cart-icon"
              />
            </div>
          </div>
        ) : (
          cartItems.map((item) => (
            <div className="checkout-item-info" key={item.book_id}>
              <div className="checkout-item">
                <img src={item.image_url} alt="" />
                <div className="checkout-item-text">
                  <div className="checkout-item-text-title">{item.title}</div>
                  <div style={{ marginTop: "10px" }}>
                    <div className="checkout-item-text-authors">
                      {item.authors}
                    </div>
                    <div className="checkout-item-text-price">
                      Giá bán: {numberFormat(item.price)}
                    </div>
                  </div>
                  <div className="checkout-item-quantity flex">
                    <span onClick={() => onRemoveItem1(item)}>-</span>
                    <div className="quantity-abc">{item.quantity}</div>
                    <span onClick={() => onAdd(item)}>+</span>
                  </div>
                </div>
              </div>
              <div className="checkout-item-info-price">
                <div>{numberFormat(item.price * item.quantity)}</div>
                <div className="checkout-item-delete-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#000000"
                    onClick={() => showRemoveOneConfirm(item)}
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
                  </svg>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Confirm
        id={"confirm_remove"}
        question={"Bạn thực sự muốn xóa sản phẩm này khỏi giỏ hàng?"}
        showConfirm={showRemoveConfirm}
        agree={() => onRemove(book)}
      />
      <Confirm
        id={"confirm_remove_one"}
        question={"Bạn thực sự muốn xóa sản phẩm này khỏi giỏ hàng?"}
        showConfirm={showRemoveOneConfirm}
        agree={onRemoveOne}
      />
    </>
  );
}

export default CheckOutContent;
