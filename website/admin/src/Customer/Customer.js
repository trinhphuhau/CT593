import Axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Modal from "../Components/Modal";
import { numberFormat } from "../numberFormat";

export default function Customer(props) {
  const { search } = props;
  const [ordersByCustomer, setOrdersByCustomer] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const getTotalCustomers = () => {
    Axios.post("http://localhost:3001/admin/customer/get-total-customer", {
      query: search,
    }).then((res) => {
      setTotalPage(Math.ceil(res.data[0].total / 5));
    });
  };

  const getCustomers = () => {
    const data = {
      query: search,
      page: page,
    };
    Axios.post("http://localhost:3001/admin/customer/get-customers", data).then(
      (res) => {
        setCustomers(res.data);
      }
    );
  };

  const getCustomerInfo = (data) => {
    setCustomerInfo({ ...customerInfo, username: data });
  };

  const onChangePassword = (event) => {
    event.preventDefault();
    const data = {
      username: customerInfo.username,
      password: customerInfo.password,
    };
    Axios.post(
      "http://localhost:3001/admin/customer/change-customer-password",
      data
    ).then((response) => {
      let alert = document.getElementById(`alert_${data.username}`);
      if (response.data.message === "success") {
        alert.innerHTML =
          '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Thành công!</strong> Bạn đã thay đổi mật khẩu thành công <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"/></div>';
      } else {
        alert.innerHTML =
          '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Thất bại!</strong> Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"/></div>';
      }
    });
  };

  const getOrdersByCustomer = (user_id) => {
    Axios.post("http://localhost:3001/admin/customer/get-orders-by-customer", {
      user_id: user_id,
    }).then((response) => {
      setOrdersByCustomer(response.data);
    });
  };

  const deleteCustomer = (user_id) => {
    Axios.post("http://localhost:3001/admin/customer/delete-customer", {
      user_id: user_id,
    }).then((response) => {
      console.log(response.data.message);
      if (response.data.message === "success") {
        getCustomers();
        getTotalCustomers();
      }
    });
  };

  const changePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    getCustomers();
    getTotalCustomers();
  }, [search, page]);

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

  return (
    <div className="mt-3" id="customers">
      <table className="table pt-4 border" id="orderdetails">
        <thead className="table-secondary">
          <tr>
            <th>#</th>
            <th>Họ và tên</th>
            <th>Số điện thoại</th>
            <th>Tên tài khoản</th>
            <th className="text-center" style={{ width: "120px" }}>
              Đổi mật khẩu
            </th>
            <th className="text-center" style={{ width: "120px" }}>
              Xóa
            </th>
            <th className="text-center" style={{ width: "120px" }}></th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                Không tìm thấy kết quả phù hợp
              </td>
            </tr>
          )}
          {customers.length > 0 &&
            customers.map((customer, i) => (
              <Fragment key={`customer-${customer.user_id}`}>
                <tr className="border-bottom">
                  <td className="font-weight-bold">{(i = i * page + 1)}</td>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td className="font-weight-bold">{customer.username}</td>
                  <td className="text-center" style={{ width: "120px" }}>
                    <a
                      href={`#changePw-${customer.user_id}`}
                      className="btn btn-success material-icons-outlined"
                      data-bs-toggle="collapse"
                      onClick={() => {
                        getCustomerInfo(customer.username);
                      }}
                    >
                      create
                    </a>
                  </td>
                  <td className="text-center" style={{ width: "120px" }}>
                    <button
                      className="btn btn-danger material-icons-outlined"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteCustomerModal"
                    >
                      delete
                    </button>
                    <Modal
                      id="deleteCustomerModal"
                      label="deleteCustomerModalLabel"
                      title="Xác nhận xóa khách hàng"
                      text="Bạn đồng ý muốn xóa khách hàng này chứ?"
                      closeBtn="Hủy bỏ"
                      saveBtn="Đồng ý"
                      save={() => {
                        deleteCustomer(customer.user_id);
                      }}
                    />
                  </td>
                  <td className="text-center" style={{ width: "120px" }}>
                    <a
                      href={`#customerInfo-${customer.user_id}`}
                      className="btn btn-primary material-icons-outlined"
                      data-bs-toggle="collapse"
                      onClick={() => getOrdersByCustomer(customer.user_id)}
                    >
                      visibility
                    </a>
                  </td>
                </tr>
                <tr>
                  <td colSpan="7" className="p-0">
                    <div
                      className="bg-light p-4 collapse"
                      id={`changePw-${customer.user_id}`}
                      data-bs-parent="#customers"
                    >
                      <div className="border rounded p-4 bg-white">
                        <div className="clearfix">
                          <h4 className="display-5 float-start">
                            Thay đổi mật khẩu
                          </h4>
                        </div>
                        <div id={`alert_${customer.username}`}></div>
                        <form onSubmit={onChangePassword}>
                          <div className="mb-2">
                            <div className="input-group">
                              <label
                                className="input-group-text font-weight-bold"
                                style={{ width: "162px" }}
                              >
                                Tên tài khoản
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                readOnly={true}
                                defaultValue={customer.username}
                              />
                            </div>
                          </div>
                          <div className="input-group mb-2">
                            <label
                              className="input-group-text font-weight-bold"
                              style={{ width: "162px" }}
                            >
                              Mật khẩu mới
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              onChange={(e) => {
                                setCustomerInfo({
                                  ...customerInfo,
                                  password: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div className="input-group mb-2">
                            <label
                              className="input-group-text font-weight-bold"
                              style={{ width: "162px" }}
                            >
                              Xác nhận
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              onChange={(e) => {
                                setCustomerInfo({
                                  ...customerInfo,
                                  passwordConfirm: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div className="pb-0">
                            <input
                              type="button"
                              className="btn btn-primary w-100"
                              value="Đổi mật khẩu"
                              data-bs-toggle="modal"
                              data-bs-target="#changeCustomerPasswordModal"
                            />
                          </div>
                          <Modal
                            id="changeCustomerPasswordModal"
                            label="changeCustomerPasswordModalLabel"
                            title="Xác nhận thay đổi mật khẩu"
                            text="Bạn đồng ý muốn thay đổi mật khẩu khách hàng này chứ?"
                            closeBtn="Hủy bỏ"
                            saveBtn="Đồng ý"
                          />
                        </form>
                      </div>
                    </div>
                    <div
                      className="p-4 bg-light collapse"
                      id={`customerInfo-${customer.user_id}`}
                      data-bs-parent="#customers"
                    >
                      <div className="rounded">
                        <div>
                          <h4 className="display-5">Thông tin khách hàng</h4>
                          <div
                            className="border rounded px-3 pt-3 bg-white"
                            style={{ lineHeight: "1" }}
                          >
                            <p>
                              <span className="font-weight-bold">
                                Họ và tên:
                              </span>{" "}
                              {customer.name}
                            </p>
                            <p>
                              <span className="font-weight-bold">
                                Số điện thoại:
                              </span>{" "}
                              {customer.phone}
                            </p>
                            <p>
                              <span className="font-weight-bold">
                                Tên tài khoản:
                              </span>{" "}
                              {customer.username}
                            </p>
                            <p>
                              <span className="font-weight-bold">Địa chỉ:</span>{" "}
                              {customer.address}
                              {customer.tt_name !== null &&
                              customer.tt_name !== ""
                                ? `, ${customer.tt_name}`
                                : ""}
                              {customer.qh_name !== null &&
                              customer.qh_name !== ""
                                ? `, ${customer.qh_name}`
                                : ""}
                              {customer.tp_name !== null &&
                              customer.tp_name !== ""
                                ? `, ${customer.tp_name}`
                                : ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="display-5 mt-4">
                          Một số đơn hàng gần đây
                        </h4>
                        <table className="table pt-4 border">
                          <thead className="table-secondary">
                            <tr>
                              <th>ID</th>
                              <th>Họ và tên</th>
                              <th>Số điện thoại</th>
                              <th>Tổng cộng</th>
                              <th>Thời gian đặt</th>
                              <th className="text-center">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ordersByCustomer.length === 0 && (
                              <tr className="bg-white p-4">
                                <td colSpan="6" className="text-center">
                                  Người dùng này chưa có đơn hàng nào
                                </td>
                              </tr>
                            )}
                            {ordersByCustomer.length > 0 &&
                              ordersByCustomer.map((order) => (
                                <tr className="bg-white p-4">
                                  <td className="font-weight-bold">
                                    {order.order_id}
                                  </td>
                                  <td>{order.name}</td>
                                  <td>{order.phone}</td>
                                  <td>
                                    <span className="text-primary font-weight-bold">
                                      {numberFormat(order.total_price)}
                                    </span>
                                  </td>
                                  <td>23:33 20/08/2021</td>
                                  <td
                                    className="text-center"
                                    style={{ width: "100px" }}
                                  >
                                    <span
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
                                      {order.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              </Fragment>
            ))}
        </tbody>
      </table>
      {customers.length > 0 && (
        <nav aria-label="Page navigation" className="mt-4">
          <ul className="pagination justify-content-center">
            {pagination(page, totalPage)}
          </ul>
        </nav>
      )}
    </div>
  );
}
