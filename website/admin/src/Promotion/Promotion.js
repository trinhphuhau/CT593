import Axios from "axios";
import { useEffect, useState } from "react";
import { formatDate } from "../formatDate";
import { numberFormat } from "../numberFormat";
import AddNewPromotion from "./AddNewPromotion";
export default function Promotion() {
  const [promos, setPromos] = useState([]);
  const getPromo = () => {
    Axios.get("http://localhost:3001/admin/promotion/get-promotion").then(
      (res) => {
        setPromos(res.data);
      }
    );
  };
  useEffect(() => {
    getPromo();
  }, []);
  return (
    <div className="bg-light">
      <AddNewPromotion />
      <div className="px-5 py-4 border rounded bg-white">
        <h1 className="display-2 mb-3">Khuyến mãi</h1>
        <div className="form-group clearfix">
          <div
            className="input-group float-start"
            style={{ width: "calc(100% - 189px)" }}
          >
            <div className="input-group-prepend">
              <span className="input-group-text material-icons">search</span>
            </div>
            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="Tìm mã giảm giá"
            />
          </div>
          <button
            className="btn btn-success float-end"
            data-bs-toggle="collapse"
            data-bs-target="#addNewReceipt"
          >
            <span className="material-icons-outlined">add</span>Thêm khuyến mãi
          </button>
        </div>
        <div className="mt-3">
          <table className="table pt-4 border">
            <thead className="table-secondary">
              <tr>
                <th>Mã giảm giá</th>
                <th>Giá trị</th>
                <th>Tối đa</th>
                <th>Số lượng</th>
                <th>Sự kiện chính</th>
                <th>Bắt đầu</th>
                <th>Kết thúc</th>
                <th>Công khai</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {promos.map((promo) => (
                <tr className="border-bottom">
                  <td className="font-weight-bold">{promo.voucher}</td>
                  <td>
                    {promo.voucher_type === "%"
                      ? `${promo.voucher_value}%`
                      : numberFormat(promo.voucher_value)}
                  </td>
                  <td>{numberFormat(promo.voucher_max_price)}</td>
                  <td>{promo.voucher_count}</td>
                  <td>{promo.event}</td>
                  <td>{formatDate(promo.created_date)}</td>
                  <td>{formatDate(promo.expired_date)}</td>
                  <td>{promo.public}</td>
                  <td>
                    <button className="btn btn-primary material-icons-outlined">
                      create
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-danger material-icons-outlined">
                      delete
                    </button>
                  </td>
                </tr>
              ))}
              {promos.length === 0 && <td colSpan="6"></td>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
