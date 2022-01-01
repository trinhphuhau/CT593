import { useState } from "react";
import Customer from "./Customer";

export default function Customers() {
  const [search, setSearch] = useState("");
  return (
    <div className="bg-light">
      <div className="px-5 py-4 border rounded bg-white">
        <h1 className="display-2 mb-3">Khách hàng</h1>
        <div className="form-group clearfix">
          <div className="input-group float-start" style={{ width: "100%" }}>
            <div className="input-group-prepend">
              <span className="input-group-text material-icons">search</span>
            </div>
            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="Nhập tên khách hàng"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <Customer search={search} />
      </div>
    </div>
  );
}
