import "./CheckOutInfo.css";
import { useEffect, useState } from "react";
import Confirm from "./Confirm";
import Axios from "axios";

function CheckOutInfo(props) {
  const {
    cartItems,
    getOrderInfo,
    discount,
    voucher,
    customerInfo,
    totalPrice,
    showOrderConfirm,
  } = props;
  const [cityList, setCityList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [townList, setTownList] = useState([]);

  const [orderInfo, setOrderInfo] = useState({
    user_id: customerInfo.user_id,
    name: customerInfo.name,
    phone: customerInfo.phone,
    address: customerInfo.address,
    note: "",
    books: cartItems,
    totalPrice: totalPrice,
    shippingFee: 35000,
    matp: customerInfo.matp,
    maqh: customerInfo.maqh,
    xaid: customerInfo.xaid,
    voucher: "",
    discount: 0,
    payment_method: "Khi nhận hàng",
  });

  const onHandleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setOrderInfo({ ...orderInfo, [name]: value });
  };

  const clearErrorMessage = () => {
    const errorMessage = document.getElementsByClassName("order-error-message");
    for (var i = 0; i < errorMessage.length; i++) {
      errorMessage[i].innerHTML = "";
    }
  };

  const clearRedError = () => {
    const input = document.querySelectorAll(".customer-info input");
    const select = document.querySelectorAll(".customer-info select");
    for (var i = 0; i < input.length; i++) {
      input[i].classList.remove("error");
      select[i].classList.remove("error");
    }
  };

  const onOrder = () => {
    clearErrorMessage();
    clearRedError();
    const orderMessage = document.getElementsByClassName("order-error-message");
    const orderInput = document.querySelectorAll(".customer-info input");
    const orderSelect = document.querySelectorAll(".customer-info select");
    let ok1 = true;
    let ok2 = true;
    let ok3 = true;
    let ok4 = true;
    let ok5 = true;
    let ok6 = true;
    if (orderInfo.name === "") {
      orderMessage[0].innerHTML = "Họ và tên không được để trống";
      orderInput[0].classList.add("error");
      ok1 = false;
    }
    if (orderInfo.phone === "") {
      orderMessage[1].innerHTML = "Số điện thoại không được để trống";
      orderInput[1].classList.add("error");
      ok2 = false;
    }
    if (orderInfo.address === "") {
      orderMessage[2].innerHTML = "Vui lòng điền địa chỉ cụ thể";
      orderInput[2].classList.add("error");
      ok3 = false;
    }
    if (orderInfo.matp === "") {
      orderMessage[3].innerHTML = "Vui lòng chọn tỉnh/thành phố";
      orderSelect[0].classList.add("error");
      ok4 = false;
    }
    if (orderInfo.maqh === "") {
      orderMessage[4].innerHTML = "Vui lòng chọn quận/huyện";
      orderSelect[1].classList.add("error");
      ok5 = false;
    }
    if (orderInfo.xaid === "") {
      orderMessage[5].innerHTML = "Vui lòng chọn xã/phường/thị trấn";
      orderSelect[2].classList.add("error");
      ok6 = false;
    }
    if (ok1 && ok2 && ok3 && ok4 && ok5 && ok6) {
      showOrderConfirm();
    }
  };

  const getCityList = () => {
    Axios.get("http://localhost:3001/get-city").then((response) => {
      setCityList(response.data);
    });
  };

  const getDistrictList = (matp) => {
    Axios.post("http://localhost:3001/get-district", { matp: matp }).then(
      (response) => {
        setDistrictList(response.data);
      }
    );
  };

  const getTownList = (maqh) => {
    Axios.post("http://localhost:3001/get-town", { maqh: maqh }).then(
      (response) => {
        setTownList(response.data);
      }
    );
  };

  const onChangeCity = (event) => {
    setOrderInfo({ ...orderInfo, matp: event.target.value });
    getDistrictList(event.target.value);
  };

  const onChangeDistrict = (event) => {
    setOrderInfo({ ...orderInfo, maqh: event.target.value });
    getTownList(event.target.value);
  };

  const onChangeTown = (event) => {
    setOrderInfo({ ...orderInfo, xaid: event.target.value });
  };

  useEffect(() => {
    setOrderInfo({
      ...orderInfo,
      voucher: voucher,
      discount: discount,
    });
  }, [discount]);

  useEffect(() => {
    setOrderInfo({ ...orderInfo, books: cartItems });
  }, [cartItems]);

  useEffect(() => {
    setOrderInfo({ ...orderInfo, totalPrice: totalPrice });
  }, [totalPrice]);

  useEffect(() => {
    getOrderInfo(orderInfo);
  }, [orderInfo]);

  useEffect(() => {
    getCityList();
    if (customerInfo.matp !== "") getDistrictList(customerInfo.matp);
    if (customerInfo.maqh !== "") getTownList(customerInfo.maqh);
    setOrderInfo({
      ...orderInfo,
      user_id: customerInfo.user_id,
      name: customerInfo.name,
      phone: customerInfo.phone,
      address: customerInfo.address,
      matp: customerInfo.matp,
      maqh: customerInfo.maqh,
      xaid: customerInfo.xaid,
    });
  }, [customerInfo]);

  const [onlPayment, setOnlPayment] = useState(false);
  const togglePayment = () => {
    const payment = document.getElementsByClassName("payment-method");
    payment[0].classList.toggle("active");
    payment[1].classList.toggle("active");
    setOnlPayment(!onlPayment);
    orderInfo.payment_method === "Khi nhận hàng"
      ? setOrderInfo({ ...orderInfo, payment_method: "Trực tuyến" })
      : setOrderInfo({ ...orderInfo, payment_method: "Khi nhận hàng" });
  };

  return (
    <div id="checkout-info">
      <div className="checkout-header">
        <h1>Thông tin giao hàng</h1>
      </div>
      <div className="customer-info">
        <div className="customer-info-formgroup">
          <div>
            <label htmlFor="name">Họ và tên</label>
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              onChange={onHandleChange}
              defaultValue={orderInfo.name}
            />
          </div>
          <div>
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              onChange={onHandleChange}
              defaultValue={orderInfo.phone}
            />
          </div>
        </div>
        <div className="customer-info-formgroup">
          <div className="order-error-message"></div>
          <div className="order-error-message"></div>
        </div>
        <div className="customer-info-formgroup">
          <div>
            <label htmlFor="address">Địa chỉ cụ thể</label>
            <input
              type="text"
              name="address"
              placeholder="Số nhà, tên đường,..."
              onChange={onHandleChange}
              defaultValue={orderInfo.address}
            />
          </div>
          <div>
            <label htmlFor="city">Tỉnh/Thành phố</label>
            <select name="city" onChange={onChangeCity} value={orderInfo.matp}>
              <option value="">Tỉnh/Thành phố</option>
              {cityList.map((item) => (
                <option value={item.matp} key={item.matp}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="customer-info-formgroup">
          <div className="order-error-message"></div>
          <div className="order-error-message"></div>
        </div>
        <div className="customer-info-formgroup">
          <div>
            <label htmlFor="district">Quận/Huyện</label>
            <select
              name="district"
              onChange={onChangeDistrict}
              value={orderInfo.maqh}
            >
              <option value="">Quận/Huyện</option>
              {districtList.map((item) => (
                <option value={item.maqh} key={item.maqh}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="town">Xã/Phường/Thị trấn</label>
            <select name="town" onChange={onChangeTown} value={orderInfo.xaid}>
              <option value="">Xã/Phường/Thị trấn</option>
              {townList.map((item) => (
                <option value={item.xaid} key={item.xaid}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="customer-info-formgroup">
          <div className="order-error-message"></div>
          <div className="order-error-message"></div>
        </div>
        <div>
          <label htmlFor="note">Ghi chú (nếu có)</label>
          <textarea name="note" onChange={onHandleChange}></textarea>
        </div>
        <div className="checkout-method">
          <h2>Phương thức thanh toán</h2>
          <div className="flex justify-between">
            <div className="payment-method active" onClick={togglePayment}>
              <div className="title">
                <img
                  src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/285/dollar-banknote_1f4b5.png"
                  alt=""
                  width="30px"
                />
                <span>Thanh toán khi nhận hàng</span>
              </div>
              <div className="text">Thanh toán khi nhận hàng</div>
            </div>
            <div className="payment-method" onClick={togglePayment}>
              <div className="title">
                <img
                  src={require("../../img/VNPAY.png").default}
                  alt=""
                  width="90px"
                />
                <span>Qua ví VNPAY</span>
              </div>
              <div className="text">Thanh toán trực tuyến</div>
            </div>
          </div>
        </div>
        <div className="checkout-submit">
          {!onlPayment && <button onClick={onOrder}>Tiến hành đặt hàng</button>}
          {onlPayment && (
            <>
              <form
                action="http://localhost:3001/create_payment_url"
                method="POST"
                id="onlinePaymentForm"
              >
                <input type="hidden" name="orderType" value="topup" />
                <input
                  type="hidden"
                  name="amount"
                  value={
                    orderInfo.totalPrice +
                      orderInfo.shippingFee -
                      orderInfo.discount <=
                    0
                      ? 0
                      : orderInfo.totalPrice +
                        orderInfo.shippingFee -
                        orderInfo.discount
                  }
                />
                <input
                  type="hidden"
                  name="orderDescription"
                  value="Thanh toán hóa đơn sách"
                />
                <input type="hidden" name="bankCode" value="" />
                <input type="hidden" name="language" value="vn" />
                <input
                  type="hidden"
                  name="data"
                  value={JSON.stringify(orderInfo)}
                />
                <input
                  type="hidden"
                  name="randomKey"
                  value={localStorage.getItem("randomKey")}
                />
              </form>
              <button
                onClick={() => {
                  document.getElementById("overlay").classList.toggle("active");
                  document
                    .getElementById("onlinePaymentFormConfirm")
                    .classList.toggle("active");
                  document
                    .querySelector(".navigation-mobile")
                    .classList.toggle("zIndex1");
                }}
              >
                Tiến hành đặt hàng
              </button>
            </>
          )}
        </div>
        <div className="confirm" id="onlinePaymentFormConfirm">
          <div className="confirm-question">
            Bạn xác nhận muốn đặt hàng đúng chứ?
          </div>
          <div className="confirm-button">
            <button
              className="btn-1"
              onClick={() => {
                document.getElementById("overlay").classList.toggle("active");
                document
                  .getElementById("onlinePaymentFormConfirm")
                  .classList.toggle("active");
                document
                  .querySelector(".navigation-mobile")
                  .classList.toggle("zIndex1");
              }}
            >
              Quay lại
            </button>
            <button
              className="btn-2"
              type="submit"
              form="onlinePaymentForm"
              onClick={() => {
                document
                  .getElementById("#overlay")
                  .classList.toggle("zIndex101");
              }}
            >
              Đồng ý
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutInfo;
