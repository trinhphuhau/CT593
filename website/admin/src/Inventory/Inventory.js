import Axios from "axios";
import { Fragment, useEffect, useState } from "react";
import AddNewReceipt from "./AddNewReceipt";

export default function Inventory() {
  const [receipt, setReceipt] = useState([]);
  const [receiptDetail, setReceiptDetail] = useState([]);

  const getReceipt = () => {
    Axios.get("http://localhost:3001/admin/inventory/get-receipt").then(
      (res) => {
        setReceipt(res.data);
      }
    );
  };

  const date = (date) => {
    const addDated = new Date(date);
    return addDated.toLocaleDateString("en-US");
  };

  const getReceiptDetail = (receipt_id) => {
    Axios.get("http://localhost:3001/admin/inventory/get-receipt-detail", {
      params: {
        receipt_id: receipt_id,
      },
    }).then((res) => {
      setReceiptDetail(res.data);
    });
  };
  useEffect(() => {
    getReceipt();
  }, []);

  return (
    <div className="bg-light">
      <AddNewReceipt />
      <div className="px-5 py-4 border rounded bg-white">
        <h1 className="display-2 mb-3">Phiếu nhập hàng</h1>
        <div className="form-group clearfix">
          <div
            className="input-group float-start"
            style={{ width: "calc(100% - 143px)" }}
          >
            <div className="input-group-prepend">
              <span className="input-group-text material-icons">search</span>
            </div>
            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="Nhập mã đơn nhập"
            />
          </div>
          <button
            className="btn btn-success float-end"
            data-bs-toggle="collapse"
            data-bs-target="#addNewReceipt"
          >
            <span className="material-icons-outlined">add</span>Nhập hàng
          </button>
        </div>

        <div className="mt-3" id="receipt">
          <table className="table pt-4 border">
            <thead className="table-secondary">
              <tr>
                <th>Mã đơn nhập</th>
                <th>Thời gian nhập hàng</th>
                <th className="text-center">Tổng cộng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {receipt.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">
                    Không có phiếu nhập hàng nào
                  </td>
                </tr>
              )}
              {receipt.map((item) => (
                <Fragment key={item.receipt_id}>
                  <tr>
                    <td className="font-weight-bold">{item.receipt_id}</td>
                    <td>{date(item.date)}</td>
                    <td className="text-center">
                      <span className="color-test text-primary font-weight-bold">
                        {item.total}
                      </span>
                    </td>
                    <td className="text-center">
                      <a
                        href={`#receipt-${item.receipt_id}`}
                        className="btn btn-primary material-icons-outlined"
                        data-bs-toggle="collapse"
                        onClick={() => getReceiptDetail(item.receipt_id)}
                      >
                        visibility
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="p-0">
                      <div
                        id={`receipt-${item.receipt_id}`}
                        className="bg-light p-4 collapse"
                        data-bs-parent="#receipt"
                      >
                        <div>
                          <h4 className="display-5">{item.receipt_id}</h4>
                          <h4>{date(item.date)}</h4>
                          <table className="table pb-0 border">
                            <thead className="table-secondary">
                              <tr>
                                <th>#</th>
                                <th>Tên sách</th>
                                <th className="text-center">Số lượng</th>
                              </tr>
                            </thead>
                            <tbody>
                              {receiptDetail.map((rec) => (
                                <tr className="bg-white p-4">
                                  <td>#</td>
                                  <td>{rec.title}</td>
                                  <td className="text-center">
                                    <span className="badge bg-primary rounded-pill">
                                      {rec.quantity}
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
          <nav aria-label="Page navigation" className="mt-4">
            <ul className="pagination justify-content-center">
              <li className="page-item active">
                <button className="page-link">1</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
