import Axios from "axios";
import { useEffect, useState } from "react";
import { formatDate } from "../formatDate";
import { numberFormat } from "../numberFormat";
export default function Recent() {
  const [bestSellingBooks, setBestSellingBooks] = useState([]);
  const [bestSellingLimit, setBestSellingLimit] = useState(5);
  const [recentOrderLimit, setRecentOrderLimit] = useState(5);
  const getBestSellingBooks = () => {
    Axios.get(
      "http://localhost:3001/admin/dashboard/best-selling?limit=" +
        bestSellingLimit
    ).then((response) => {
      setBestSellingBooks(response.data);
    });
  };
  const [recentOrder, setRecentOrder] = useState([]);
  const getRecentOrder = () => {
    Axios.get(
      "http://localhost:3001/admin/dashboard/recent-order?limit=" +
        recentOrderLimit
    ).then((response) => {
      setRecentOrder(response.data);
    });
  };

  useEffect(() => {
    getBestSellingBooks();
  }, [bestSellingLimit]);

  useEffect(() => {
    getRecentOrder();
  }, [recentOrderLimit]);
  return (
    <section>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 pe-2">
          <div className="d-flex justify-content-between">
            <h4>Sản phẩm bán chạy nhất</h4>
            <select
              style={{ height: "25px", borderRadius: "5px", marginTop: "5px" }}
              onChange={(e) => {
                setBestSellingLimit(e.target.value);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
          <table className="table pt-4 bg-white table-borderless table-hover">
            <thead className="table-secondary">
              <tr>
                <th>Tên sách</th>
                <th>Thể loại</th>
                <th className="text-center" style={{ width: "90px" }}>
                  Số lượng
                </th>
              </tr>
            </thead>
            <tbody>
              {bestSellingBooks.map((book) => (
                <tr key={`best-selling-${book.book_id}`}>
                  <td>{book.title}</td>
                  <td>{book.genre}</td>
                  <td className="text-center">
                    <span className="badge bg-primary rounded-pill">
                      {book.total}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 ps-2">
          <div className="d-flex justify-content-between">
            <h4>Đơn hàng gần nhất</h4>
            <select
              style={{ height: "25px", borderRadius: "5px", marginTop: "5px" }}
              onChange={(e) => {
                setRecentOrderLimit(e.target.value);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
          <table className="table pt-4 bg-white table-borderless table-hover">
            <thead className="table-secondary">
              <tr>
                <th>ID</th>
                <th style={{ width: "120px" }}>Tổng số hàng</th>
                <th className="text-center">Thành tiền</th>
                <th className="text-center">Thời gian đặt</th>
              </tr>
            </thead>
            <tbody>
              {recentOrder.map((order) => (
                <tr key={`recent-order-${order.order_id}`}>
                  <td className="font-weight-bold">{order.order_id}</td>
                  <td className="text-center">
                    <span className="badge bg-primary rounded-pill">
                      {order.total_quantity}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="color-test text-primary font-weight-bold">
                      {numberFormat(
                        order.total_price + order.shipping_fee - order.discount
                      )}
                    </span>
                  </td>
                  <td className="text-center">
                    {formatDate(order.order_time)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
