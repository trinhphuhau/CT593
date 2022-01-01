import { useState } from "react";
import CheckOutContent from "./CheckOutContent";
import CheckOutHeader from "./CheckOutHeader";
import CheckOutInfo from "./CheckOutInfo";
import CheckOutRight from "./CheckOutRight";
import Axios from "axios";
import Confirm from "./Confirm";
import CheckOutMessage from "./CheckOutMessage";
import { useEffect } from "react";

function CheckOut(props) {
  const {
    cartItems,
    onAdd,
    onRemove,
    customerInfo,
    onRemoveCartItems,
    showRemoveConfirm,
    onRemoveItem,
  } = props;
  const [orderInfo, setOrderInfo] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [voucher, setVoucher] = useState({
    created_date: "0000-00-00",
    expired_date: "0000-00-00",
    status: 0,
    voucher: "",
    voucher_count: 0,
    voucher_type: "",
    voucher_value: 0,
  });

  const getOrderInfo = (info) => {
    setOrderInfo(info);
  };

  const getVoucher = (data) => {
    setVoucher(data);
    discountCal(data);
  };

  const discountCal = (voucher) => {
    if (voucher.voucher_type === "%") {
      let total = totalPrice * (voucher.voucher_value / 100);
      total > voucher.voucher_max_price
        ? setDiscount(voucher.voucher_max_price)
        : setDiscount(total);
    } else {
      setDiscount(voucher.voucher_value);
    }
  };

  const order = () => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };
    if ((orderInfo.payment_method = "Khi nhận hàng")) {
      Axios.post("http://localhost:3001/ordering", orderInfo, config).then(
        (res) => {
          if (res.data.status === true) {
            onRemoveCartItems();
            setOrderInfo({
              user_id: 0,
              name: "",
              phone: "",
              address: "",
              note: "",
              books: [],
              totalPrice: 0,
              shippingFee: 0,
              matp: "",
              maqh: "",
              xaid: "",
              voucher: "",
              discount: 0,
            });
            document.getElementById("confirm_order").classList.toggle("active");
            document.getElementById("order-success").classList.toggle("active");
          } else {
            document.getElementById("confirm_order").classList.toggle("active");
            document.getElementById("order-fail").classList.toggle("active");
          }
        }
      );
    } else {
    }
  };

  const showOrderConfirm = () => {
    document.getElementById("overlay").classList.toggle("active");
    document.getElementById("confirm_order").classList.toggle("active");
    document.querySelector(".navigation-mobile").classList.toggle("zIndex1");
  };

  useEffect(() => {
    discountCal(voucher);
  }, [totalPrice]);

  useEffect(() => {
    if (cartItems.length === 0) {
      setTotalPrice(0);
      setShippingFee(0);
    } else {
      let total = 0;
      cartItems.forEach((item) => {
        total = item.price * item.quantity + total;
        setTotalPrice(total);
      });
      setShippingFee(35000);
    }
  }, [cartItems]);

  return (
    <div className="check">
      <CheckOutHeader cartItems={cartItems} />
      <div className="checkout">
        <div className="checkout-items">
          <CheckOutContent
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
            showRemoveConfirm={showRemoveConfirm}
            onRemoveItem={onRemoveItem}
          />
          <CheckOutInfo
            cartItems={cartItems}
            customerInfo={customerInfo}
            getOrderInfo={getOrderInfo}
            discount={discount}
            voucher={voucher.voucher}
            totalPrice={totalPrice}
            showOrderConfirm={showOrderConfirm}
          />
        </div>
        <CheckOutRight
          totalPrice={totalPrice}
          shippingFee={shippingFee}
          getVoucher={getVoucher}
          discount={discount}
          cartItems={cartItems}
          customerInfo={customerInfo}
        />
        <Confirm
          id={"confirm_order"}
          question={"Bạn xác nhận muốn đặt hàng đúng chứ?"}
          showConfirm={showOrderConfirm}
          agree={order}
        />
        {/* <CheckOutMessage
          messageTop={"Bạn đã đặt hàng thành công"}
          messageBottom={"Hãy theo dõi tình trạng đơn hàng tại đây"}
          imgSrc={require("../../img/check-circle.gif").default}
          imgStyles={{ width: "175px" }}
          id={"order-success"}
        />
        <CheckOutMessage
          messageTop={"Ôi không, đã có lỗi xảy ra"}
          messageBottom={"Xin lỗi vì sự cố này, vui lòng thử lại sau"}
          imgSrc={require("../../img/ohnoohnononononono.gif").default}
          imgStyles={{ width: "350px" }}
          id={"order-fail"}
        /> */}
      </div>
    </div>
  );
}

export default CheckOut;
