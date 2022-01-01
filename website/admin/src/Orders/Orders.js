import Axios from "axios";
import { useEffect, useState } from "react";
import Order from "./Order";

export default function Orders() {
  const [orderStatus, setOrderStatus] = useState([]);
  const [search, setSearch] = useState({
    query: "",
    status_id: "",
  });

  const getOrderStatus = () => {
    Axios.get("http://localhost:3001/admin/order/get-order-status").then(
      (response) => {
        setOrderStatus(response.data);
      }
    );
  };

  useEffect(() => {
    getOrderStatus();
  }, []);
  return (
    <>
      <div className="bg-light">
        <div className="px-5 py-4 border rounded bg-white">
          <h1 className="display-2 mb-3">Đơn hàng</h1>
          <div className="form-group clearfix">
            <div className="input-group float-start" style={{ width: "100%" }}>
              <div className="input-group-prepend">
                <span className="input-group-text material-icons">search</span>
              </div>
              <input
                type="text"
                className="form-control me-3"
                id="search"
                placeholder="Nhập mã đơn hàng"
                onChange={(e) => {
                  setSearch({ ...search, query: e.target.value });
                }}
              />
              <select
                className="form-select"
                name="status_id"
                defaultValue={""}
                onChange={(e) => {
                  setSearch({ ...search, status_id: e.target.value });
                }}
              >
                <option value="">Tất cả</option>
                {orderStatus.map((status) => (
                  <option
                    value={status.status_id}
                    key={`status-${status.status_id}`}
                  >
                    {status.status}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Order search={search} orderStatus={orderStatus}/>
        </div>
      </div>
    </>
  );
}
