import { Fragment, useEffect, useState } from "react";
import Axios from "axios";
import { numberFormat } from "../numberFormat";
import { formatDate } from "../formatDate";
import Modal from "../Components/Modal";

export default function Order(props) {
  const { search, orderStatus } = props;
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [orders, setOrders] = useState([]);
  const [orderData, setOrderData] = useState({
    order_id: 0,
    status_id: "",
  });
  const [orderDetail, setOrderDetail] = useState([
    {
      tp: "",
      qh: "",
      tt: "",
    },
  ]);

  const getTotalOrder = () => {
    const data = {
      query: search.query,
      status_id: search.status_id,
    };
    Axios.post("http://localhost:3001/admin/order/get-total-order", data).then(
      (response) => {
        setTotalPage(Math.ceil(response.data[0].totalOrder / 4));
      }
    );
  };

  const getOrders = () => {
    const data = {
      query: search.query,
      status_id: search.status_id,
      page: page,
    };
    Axios.post("http://localhost:3001/admin/order/get-orders", data).then(
      (response) => {
        setOrders(response.data);
      }
    );
  };

  const getOrderData = (id, status) => {
    setOrderData({ ...orderData, order_id: id, status_id: status });
  };

  const changeOrderStatus = (e) => {
    e.preventDefault();
    const data = {
      order_id: orderData.order_id,
      status_id: orderData.status_id,
    };
    Axios.post(
      "http://localhost:3001/admin/order/change-order-status",
      data
    ).then((response) => {
      let alert = document.getElementById(`alert_${data.order_id}`);
      if (response.data.message === "success") {
        getOrders();
        alert.innerHTML =
          '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Thành công!</strong> Bạn đã cập nhật tình trạng đơn hàng thành công <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"/></div>';
      } else {
        alert.innerHTML =
          '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Thất bại!</strong> Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"/></div>';
      }
    });
  };

  const getOrderDetail = (order) => {
    const data = {
      order_id: order.order_id,
      matp: Number(order.matp),
      maqh: Number(order.maqh),
      xaid: Number(order.xaid),
    };
    Axios.post("http://localhost:3001/admin/order/get-order-detail", data).then(
      (response) => {
        setOrderDetail(response.data);
      }
    );
  };

  function pagination(c, m) {
    var current = c,
      last = m,
      delta = 2,
      left = current - delta,
      right = current + delta + 1,
      range = [],
      rangeWithDots = [],
      l;

    for (let i = 1; i <= last; i++) {
      if (i === 1 || i === last || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push(<span key={`pagination-dot-${i}`}>...</span>);
        }
      }
      rangeWithDots.push(
        <li
          className={page === i ? "page-item active" : "page-item"}
          key={`pagination-button-${i}`}
        >
          <button className="page-link" onClick={() => changePage(i)}>
            {i}
          </button>
        </li>
      );
      l = i;
    }
    return rangeWithDots;
  }

  const changePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    getTotalOrder();
    getOrders();
  }, [search, page]);

  console.log(orders);

  return (
    <div className="mt-3" id="orders">
      <table className="table pt-4 border" id="orderdetails">
        <thead className="table-secondary">
          <tr>
            <th>ID</th>
            <th>Họ và tên</th>
            <th>Số điện thoại</th>
            <th>Thành tiền</th>
            <th>Phương pháp thanh toán</th>
            <th>Thanh toán</th>
            <th className="text-center">Tình trạng</th>
            <th className="text-center">Thay đổi</th>
          </tr>
        </thead>
        <tbody>
          {orders.length == 0 && (
            <>
              <tr>
                <td colSpan="9" className="text-center">
                  Không tìm thấy đơn hàng nào phù hợp
                </td>
              </tr>
            </>
          )}
          {orders.length > 0 &&
            orders.map((order) => (
              <Fragment key={`order-${order.order_id}`}>
                <tr>
                  <td className="font-weight-bold">{order.order_id}</td>
                  <td>{order.name}</td>
                  <td>{order.phone}</td>
                  <td>
                    <span className="color-test text-primary font-weight-bold">
                      {numberFormat(order.total_price)}
                    </span>
                  </td>
                  <td>{order.payment_method}</td>
                  <td>
                    {order.paid === 0 ? "Chưa thanh toán" : "Đã thanh toán"}
                  </td>
                  <td className="text-center" style={{ width: "100px" }}>
                    {orderStatus.map((i) => (
                      <span
                        key={`orderStatus-${i.status_id}`}
                        className={`badge bg-${
                          order.status_id === "cxn"
                            ? "secondary"
                            : order.status_id === "clh"
                            ? "warning"
                            : order.status_id === "dvc"
                            ? "primary"
                            : order.status_id === "ht"
                            ? "success"
                            : "danger"
                        }`}
                      >
                        {i.status_id === order.status_id ? `${i.status}` : ""}
                      </span>
                    ))}
                  </td>
                  <td className="text-center" style={{ width: "135px" }}>
                    <a
                      href={`#order${order.order_id}`}
                      className="btn text-primary material-icons-outlined"
                      style={{ fontSize: "15px" }}
                      data-bs-toggle="collapse"
                      onClick={() => {
                        getOrderData(order.order_id, order.status_id);
                        getOrderDetail(order);
                      }}
                    >
                      create
                    </a>
                  </td>
                </tr>
                <tr>
                  <td colSpan="9" className="p-0">
                    <div
                      className="bg-white collapse p-4"
                      id={`order${order.order_id}`}
                      data-bs-parent="#orders"
                    >
                      <div className="border rounded p-3 bg-light">
                        <div className="clearfix">
                          <h4 className="display-5 float-start">
                            Thay đổi tình trạng
                          </h4>
                          <button
                            className="btn btn-primary material-icons-outlined float-end"
                            data-bs-toggle="collapse"
                            data-bs-target={`#orderDetail${order.order_id}`}
                            data-bs-parent="#orderdetails"
                          >
                            visibility
                          </button>
                        </div>
                        <div id={`alert_${order.order_id}`}></div>
                        <form onSubmit={changeOrderStatus}>
                          <div className="mb-2">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <label
                                  className="input-group-text font-weight-bold text-center"
                                  style={{ width: "130px", display: "block" }}
                                >
                                  Mã đơn hàng
                                </label>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={order.order_id}
                                readOnly={true}
                              />
                            </div>
                          </div>
                          <div className="input-group mb-2">
                            <label
                              className="input-group-text font-weight-bold text-center"
                              style={{ width: "130px", display: "block" }}
                              htmlFor="selectOrderStatus"
                            >
                              Tình trạng
                            </label>
                            <select
                              name="matt"
                              className="form-select"
                              onChange={(e) =>
                                setOrderData({
                                  ...orderData,
                                  status_id: e.target.value,
                                })
                              }
                              defaultValue={order.status_id}
                            >
                              {orderStatus.map((status) => (
                                <option
                                  value={status.status_id}
                                  key={`order-${order.order_id}-${status.status_id}`}
                                >
                                  {status.status}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="pb-0">
                            <input
                              type="button"
                              className="btn btn-primary w-100"
                              value="Thay đổi"
                              data-bs-toggle="modal"
                              data-bs-target="#changeStatusModal"
                            />
                          </div>
                          <Modal
                            id="changeStatusModal"
                            label="changeStatusModalLabel"
                            title="Xác nhận thay đổi tình trạng"
                            text="Bạn đồng ý muốn thay đổi tình trạng của đơn hàng này chứ?"
                            closeBtn="Hủy bỏ"
                            saveBtn="Đồng ý"
                          />
                        </form>
                      </div>
                      <div>
                        <div
                          className="border rounded bg-light p-4 mt-4 collapse"
                          id={`orderDetail${order.order_id}`}
                        >
                          <div>
                            <h4 className="display-5 clearfix">
                              Thông tin giao hàng{" "}
                              <span className="float-end text-danger">
                                {order.status}
                              </span>
                            </h4>
                            <div
                              className="border rounded px-3 pt-3 bg-white"
                              style={{ lineHeight: "1" }}
                            >
                              <p>
                                <span className="font-weight-bold">
                                  Họ và tên:
                                </span>{" "}
                                {order.name}
                              </p>
                              <p>
                                <span className="font-weight-bold">
                                  Số điện thoại:
                                </span>{" "}
                                {order.phone}
                              </p>
                              <p>
                                <span className="font-weight-bold">
                                  Địa chỉ giao hàng:
                                </span>{" "}
                                {`${order.address}, ${orderDetail[0].tp}, ${
                                  orderDetail[0].qh
                                }, ${orderDetail[[0]].tt}`}
                              </p>
                              {order.note !== "" && (
                                <>
                                  <hr />
                                  <p>
                                    <span className="font-weight-bold">
                                      Note:
                                    </span>{" "}
                                    {order.note}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="pt-3" style={{ lineHeight: "1" }}>
                            <h4 className="display-5">Thành tiền</h4>
                            <div className="border rounded px-3 pt-3 bg-white clearfix">
                              <p className="clearfix">
                                Tổng tiền hàng:{" "}
                                <span className="float-end">
                                  {numberFormat(order.total_price)}
                                </span>
                              </p>
                              <p className="clearfix">
                                Phí giao hàng:{" "}
                                <span className="float-end">
                                  {numberFormat(order.shipping_fee)}
                                </span>
                              </p>
                              <p className="clearfix mb-0">
                                Mã giảm giá:{" "}
                                <span className="float-end">
                                  - {numberFormat(order.discount)}
                                </span>
                              </p>
                              <hr />
                              <h3 className="clearfix my-3">
                                Tổng cộng:{" "}
                                <span className="float-end">
                                  {numberFormat(
                                    order.total_price +
                                      order.shipping_fee -
                                      order.discount
                                  )}
                                </span>
                              </h3>
                            </div>
                          </div>
                          <div className="pt-3">
                            <h4 className="display-5">Chi tiết đơn hàng</h4>
                            <div
                              className="border rounded px-3 pt-3 bg-white"
                              style={{ lineHeight: "1" }}
                            >
                              {orderDetail.map((item) => (
                                <div
                                  className="clearfix pb-3"
                                  key={`orderDetails-${item.title}`}
                                >
                                  <div
                                    className="d-flex float-start"
                                    style={{ gap: "10px" }}
                                  >
                                    <img
                                      src={item.image_url}
                                      className="rounded orderdetail_img"
                                      alt=""
                                    />
                                    <div style={{ lineHeight: "0.8" }}>
                                      <p className="font-weight-bold">
                                        {item.title}
                                      </p>
                                      <p>
                                        <span className="font-weight-bold">
                                          Số lượng:
                                        </span>{" "}
                                        {item.quantity}
                                      </p>
                                      <p className="mb-0">
                                        <span className="font-weight-bold">
                                          Giá bán:
                                        </span>{" "}
                                        {numberFormat(item.price)}
                                      </p>
                                    </div>
                                  </div>
                                  <div
                                    className="float-end pt-2"
                                    style={{ lineHeight: "0.8" }}
                                  >
                                    <span className="color-test text-info font-weight-bold">
                                      {numberFormat(item.price * item.quantity)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* <div className="mt-3">
                            <div
                              className="border rounded px-3 pt-3 bg-white"
                              style={{ lineHeight: "1" }}
                            >
                              <p>
                                <span className="font-weight-bold">
                                  Thời gian đặt:
                                </span>{" "}
                                {formatDate(order.order_time)}
                              </p>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </Fragment>
            ))}
        </tbody>
      </table>

      {orders.length > 0 && (
        <nav aria-label="Page navigation" className="mt-4">
          <ul className="pagination justify-content-center">
            {pagination(page, totalPage)}
          </ul>
        </nav>
      )}
    </div>
  );
}
