import Axios from "axios";
import { useEffect, useState } from "react";
import { numberFormat } from "../numberFormat";
export default function CardToday() {
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const getTotalOrder = () => {
    Axios.get("http://localhost:3001/admin/dashboard/get-total-order").then(
      (response) => {
        setTotalOrder(response.data[0].totalOrder);
      }
    );
  };

  const getTotalCustomer = () => {
    Axios.get("http://localhost:3001/admin/dashboard/get-total-customer").then(
      (response) => {
        setTotalCustomer(response.data[0].totalCustomer);
      }
    );
  };

  const getTotalPrice = () => {
    Axios.get("http://localhost:3001/admin/dashboard/get-total-price").then(
      (response) => {
        setTotalPrice(response.data[0].totalPrice);
      }
    );
  };

  useEffect(() => {
    getTotalOrder();
    getTotalCustomer();
    getTotalPrice();
  }, []);

  return (
    <section className="mb-4">
      <div className="card-group" id="card_today">
        <div className="col card me-3 border rounded">
          <div className="card-body p-4">
            <h4 className="card-title">Khách hàng mới</h4>
            <div className="clearfix">
              <h5 className="display-5 card-text float-start">
                {totalCustomer}
              </h5>
              <span className="material-icons rounded-circle bg-danger p-3 float-end">
                portrait
              </span>
            </div>
          </div>
        </div>
        <div className="col card me-3 border rounded">
          <div className="card-body p-4">
            <h4 className="card-title">Đơn hàng mới</h4>
            <div className="clearfix">
              <h5 className="display-5 card-text float-start">{totalOrder}</h5>
              <span className="material-icons-outlined rounded-circle bg-primary p-3 float-end">
                description
              </span>
            </div>
          </div>
        </div>
        <div className="col card border rounded">
          <div className="card-body p-4">
            <h4 className="card-title">Doanh thu dự tính</h4>
            <div className="clearfix">
              <h5 className="display-5 card-text float-start">
                {numberFormat(totalPrice)}
              </h5>
              <span className="material-icons-outlined rounded-circle bg-warning p-3 float-end">
                paid
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
