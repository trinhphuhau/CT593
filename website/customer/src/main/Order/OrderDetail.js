import Info from "../Info/Info";
import OrderHeader from "./OrderHeader";
import { useParams, NavLink, useHistory, Link } from "react-router-dom";
import Axios from "axios";
import "./OrderHistory";
import { useEffect, useState } from "react";
import { numberFormat } from "../../numberFormat";
import Skeletion from "../Skeletion/Skeleton";
import Confirm from "../CheckOut/Confirm";
import { formatDate } from "../../formatDate";

export default function OrderDetail(props) {
  const { cartItems } = props;
  const order_id = useParams();
  const [loaded, setLoaded] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderDetail, setOrderDetail] = useState({
    order: [
      {
        order_id: 0,
        status: "",
        total_price: 0,
        shipping_fee: 0,
        order_time: null,
      },
      {
        order_id: 0,
        status: "",
        total_price: 0,
        shipping_fee: 0,
        order_time: null,
      },
      {
        order_id: 0,
        status: "",
        total_price: 0,
        shipping_fee: 0,
        order_time: null,
      },
      {
        order_id: 0,
        status: "",
        total_price: 0,
        shipping_fee: 0,
        order_time: null,
      },
      {
        order_id: 0,
        status: "",
        total_price: 0,
        shipping_fee: 0,
        order_time: null,
      },
    ],
    details: [],
  });

  const history = useHistory();
  const prevPath =
    history.location.state !== undefined
      ? history.location.state.prevPath
      : "/order-history/all";

  const getTotalPrice = (orderDetail) => {
    let total = 0;
    orderDetail.details.map((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  };

  const getOrderDetail = () => {
    const data = {
      order_id: order_id.order_id,
    };
    Axios.post("http://localhost:3001/get-order-detail", data).then((res) => {
      setOrderDetail(res.data);
      getTotalPrice(res.data);
    });
  };

  useEffect(() => {
    getOrderDetail();
    onLoading();
    if (!document.querySelector(".navigation-mobile.hide")) {
      document.querySelector(".navigation-mobile").classList.toggle("hide");
    }
  }, []);

  const onLoading = () => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  };

  const header = () => {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="rgba(199, 199, 199, 0.7)"
        >
          <path d="M0 0h24v24H0V0z" fill="none"></path>
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"></path>
        </svg>
        <Link to="/order-history/all">Lịch sử đặt hàng</Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="rgba(199, 199, 199, 0.7)"
        >
          <path d="M0 0h24v24H0V0z" fill="none"></path>
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"></path>
        </svg>
        <span className="active">Chi tiết đơn hàng</span>
      </>
    );
  };

  const showCancelConfirm = () => {
    document.getElementById("overlay").classList.toggle("active");
    document.getElementById("confirm_cancel").classList.toggle("active");
  };

  const onCancelOrder = () => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };
    Axios.post(
      "http://localhost:3001/cancel-order",
      { order_id: order_id.order_id },
      config
    ).then((res) => {
      if (res.data.message === "success") {
        showCancelConfirm();
        getOrderDetail();
      }
    });
  };

  return (
    <div className="history">
      <OrderHeader cartItems={cartItems} header={header} />
      <div className="order-history">
        <div className="order-history-left" id="info-desktop">
          <div className="order-history-status">
            <ul>
              <NavLink to="/order-history/all">
                <li>Tất cả</li>
              </NavLink>
              <NavLink to="/order-history/to-confirm">
                <li>Chưa xác nhận</li>
              </NavLink>
              <NavLink to="/order-history/to-ship">
                <li>Đang gửi hàng</li>
              </NavLink>
              <NavLink to="/order-history/to-receive">
                <li>Đang vận chuyển</li>
              </NavLink>
              <NavLink to="/order-history/completed">
                <li>Đã hoàn tất</li>
              </NavLink>
              <NavLink to="/order-history/cancelled">
                <li>Đã hủy</li>
              </NavLink>
              <NavLink to="/order-history/ask_return">
                <li>Yêu cầu trả hàng</li>
              </NavLink>
            </ul>
          </div>
          <Info />
        </div>
        <div className="order-history-content">
          <div className="order-history-items">
            <div className="order-history-header flex justify-between">
              {!loaded ? (
                <>
                  <Skeletion extraStyles={{ height: "29px", width: "250px" }} />
                  <Skeletion extraStyles={{ height: "29px", width: "150px" }} />
                </>
              ) : (
                <>
                  <div className="order-history-header-prev flex">
                    <Link to={prevPath} id="orderHistoryLink">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 24 24"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <rect fill="none" height="24" width="24" />
                        <g>
                          <polygon points="17.77,3.77 16,2 6,12 16,22 17.77,20.23 9.54,12" />
                        </g>
                      </svg>
                    </Link>
                    <div className="header-orderID">
                      Order #{orderDetail.order[0].order_id}
                    </div>
                  </div>
                  <span>{orderDetail.order[0].status}</span>
                </>
              )}
            </div>
            <div className="order-history-info">
              {!loaded ? (
                <>
                  <Skeletion extraStyles={{ height: "35px" }} />
                  <Skeletion
                    extraStyles={{ height: "75px", marginTop: "10px" }}
                  />
                </>
              ) : (
                <>
                  <h2>Thông tin giao hàng</h2>
                  <div className="order-history-info-text">
                    <div>
                      <span>Họ và tên:</span> {orderDetail.order[0].name}
                    </div>
                    <div>
                      <span>Số điện thoại:</span> {orderDetail.order[0].phone}
                    </div>
                    <div>
                      <span>Địa chỉ:</span> {orderDetail.order[0].address},{" "}
                      {orderDetail.order[0].tt_name},{" "}
                      {orderDetail.order[0].qh_name},{" "}
                      {orderDetail.order[0].tp_name}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="order-history-detail">
              {!loaded ? (
                <>
                  <Skeletion extraStyles={{ height: "227px" }} />
                </>
              ) : (
                orderDetail.details.map((item) => (
                  <div
                    className="item-detail flex justify-between"
                    key={item.book_id}
                  >
                    <div className="flex" style={{ columnGap: "10px" }}>
                      <div className="item-detail-image">
                        <img src={item.image_url} alt="" />
                      </div>
                      <div className="item-detail-info">
                        <div className="item-detail-info-title">
                          {item.title}
                        </div>
                      </div>
                    </div>
                    <div className="item-detail-info-price">
                      {numberFormat(item.price)}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="order-history-info">
              <div className="order-history-info-time">
                {!loaded ? (
                  <Skeletion extraStyles={{ height: "29px" }} />
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span>Thời gian đặt hàng:</span>
                      <span>{formatDate(orderDetail.order[1].order_time)}</span>
                    </div>
                    {orderDetail.order[0].order_time !== null && (
                      <div className="flex justify-between">
                        <span>Đã xác nhận:</span>
                        <span>
                          {formatDate(orderDetail.order[0].order_time)}
                        </span>
                      </div>
                    )}
                    {orderDetail.order[3].order_time !== null && (
                      <div className="flex justify-between">
                        <span>Đang vận chuyển:</span>
                        <span>
                          {formatDate(orderDetail.order[3].order_time)}
                        </span>
                      </div>
                    )}
                    {orderDetail.order[4].order_time !== null && (
                      <div className="flex justify-between">
                        <span>Hoàn tất:</span>
                        <span>
                          {formatDate(orderDetail.order[4].order_time)}
                        </span>
                      </div>
                    )}
                    {orderDetail.order[2].order_time !== null && (
                      <div className="flex justify-between">
                        <span>Đã hủy:</span>
                        <span>
                          {formatDate(orderDetail.order[2].order_time)}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="order-history-info-text">
                {!loaded ? (
                  <Skeletion extraStyles={{ height: "65px" }} />
                ) : (
                  <>
                    <div className="flex justify-between">
                      <div>Tiền hàng:</div>
                      {numberFormat(totalPrice)}
                    </div>
                    <div className="flex justify-between">
                      <div>Phí giao hàng:</div>
                      {numberFormat(orderDetail.order[0].shipping_fee)}
                    </div>
                    <div className="flex justify-between">
                      <div>Mã giảm giá:</div>
                      {orderDetail.order[0].discount === 0
                        ? numberFormat(orderDetail.order[0].discount)
                        : numberFormat(-orderDetail.order[0].discount)}
                    </div>
                  </>
                )}
              </div>
              <div className="order-history-detail-total flex justify-between">
                {!loaded ? (
                  <>
                    <Skeletion
                      extraStyles={{ height: "30px", width: "137px" }}
                    />
                    <Skeletion
                      extraStyles={{ height: "30px", width: "200px" }}
                    />
                  </>
                ) : (
                  <>
                    <span>Tổng cộng:</span>
                    {numberFormat(
                      orderDetail.order[0].total_price +
                        orderDetail.order[0].shipping_fee -
                        orderDetail.order[0].discount
                    )}
                  </>
                )}
              </div>
              {orderDetail.order[0].order_time === null &&
                orderDetail.order[2].order_time === null &&
                orderDetail.order[3].order_time === null &&
                orderDetail.order[4].order_time === null && (
                  <div className="order-history-cancel">
                    <button
                      onClick={showCancelConfirm}
                      style={{
                        marginTop: "15px",
                        backgroundColor: "var(--danger)",
                        color: "white",
                        width: "100%",
                        height: "35px",
                        outline: "none",
                        border: "0",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Hủy đơn hàng
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
      <Confirm
        id={"confirm_cancel"}
        question={"Bạn xác nhận muốn hủy đơn hàng đúng chứ?"}
        showConfirm={showCancelConfirm}
        agree={onCancelOrder}
      />
      <Info id="info-mobile" />
    </div>
  );
}
