import Info from "../Info/Info";
import { numberFormat } from "../../numberFormat";
import { useState } from "react";
import Axios from "axios";

function CheckOutRight(props) {
  const {
    customerInfo,
    cartItems,
    totalPrice,
    shippingFee,
    getVoucher,
    discount,
  } = props;

  const [discountCode, setDiscountCode] = useState("");

  const onHandleVoucher = (e) => {
    setDiscountCode(e.target.value);
  };

  const onSubmitVoucher = () => {
    Axios.get("http://localhost:3001/check-voucher", {
      params: {
        voucher: discountCode,
      },
    }).then((res) => {
      if (res.data.message === "") {
        getVoucher(res.data.voucher[0]);
      } else {
        getVoucher(res.data.voucher);
      }
    });
  };

  const show = () => {
    document.getElementById("checkout-content").classList.toggle("hide");
    document.getElementById("checkout-info").classList.toggle("show");
    const text = document.getElementById("toggleCheckOutBtn");
    if (text.innerHTML === "Tiếp theo") {
      text.innerHTML = "Quay lại";
    } else {
      text.innerHTML = "Tiếp theo";
    }
  };

  return (
    <div className="checkout-right">
      <div className="checkout-price">
        <h1>Thành tiền</h1>
        <div className="checkout-price-detail">
          <div>
            <span>Tổng tiền hàng:</span>
            <span className="checkout-price-number">
              {numberFormat(totalPrice)}
            </span>
          </div>
          <div>
            <span>Phí vận chuyển:</span>
            <span className="checkout-price-number">
              {numberFormat(shippingFee)}
            </span>
          </div>
          <div>
            <span>Mã giảm giá:</span>
            <span className="checkout-price-number">
              {discount === 0
                ? numberFormat(discount)
                : numberFormat(-discount)}
            </span>
          </div>
          <div className="checkout-price-total">
            <span>Tổng thanh toán:</span>
            <span className="checkout-price-number">
              {totalPrice + shippingFee - discount <= 0
                ? numberFormat(0)
                : numberFormat(totalPrice + shippingFee - discount)}
            </span>
          </div>
        </div>
        <div className="checkout-voucher">
          <input
            type="text"
            placeholder="Mã giảm giá"
            id="voucher"
            onChange={onHandleVoucher}
          />
          <button className="checkout-voucher-submit" onClick={onSubmitVoucher}>
            Nhập mã
          </button>
        </div>
        {cartItems.length > 0 && (
          <div className="checkout-submit">
            {customerInfo.user_id !== 0 ? (
              <button onClick={show} id="toggleCheckOutBtn">
                Tiếp theo
              </button>
            ) : (
              <button
                id="toggleCheckOutBtn"
                onClick={() => {
                  document
                    .getElementById("userAccount")
                    .classList.toggle("active");
                  document
                    .getElementById("accountNav")
                    .classList.toggle("active");
                  document.getElementById("overlay").classList.toggle("active");
                  document.getElementById("cartNav").classList.toggle("active");
                }}
              >
                Tiếp theo
              </button>
            )}
          </div>
        )}
      </div>
      <Info />
    </div>
  );
}

export default CheckOutRight;
