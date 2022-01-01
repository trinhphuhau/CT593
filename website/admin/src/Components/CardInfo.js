import Axios from "axios";
import { useEffect, useState } from "react";
export default function CardInfo() {
  const [totalProduct, setTotalProduct] = useState(0);
  const getTotalProduct = () => {
    Axios.get("http://localhost:3001/admin/dashboard/get-total-product").then(
      (response) => {
        setTotalProduct(response.data[0].totalProduct);
      }
    );
  };

  const [totalNotConfirmBook, setTotalNotConfirmBook] = useState(0);
  const getTotalNotConfirmBook = () => {
    Axios.get(
      "http://localhost:3001/admin/dashboard/get-total-notConfirmBook"
    ).then((response) => {
      setTotalNotConfirmBook(response.data[0].totalNotConfirmBook);
    });
  };

  const [totalOrder, setTotalOrder] = useState(0);
  const getTotalOrder = () => {
    Axios.get("http://localhost:3001/admin/dashboard/get-total-order").then(
      (response) => {
        setTotalOrder(response.data[0].totalOrder);
      }
    );
  };

  const [totalSuccessOrder, setTotalSuccessOrder] = useState(0);
  const getTotalSuccessOrder = () => {
    Axios.get(
      "http://localhost:3001/admin/dashboard/get-total-success-order"
    ).then((response) => {
      setTotalSuccessOrder(response.data[0].totalSuccessOrder);
    });
  };

  const [totalCancelOrder, setTotalCancelOrder] = useState(0);
  const getTotalCancelOrder = () => {
    Axios.get(
      "http://localhost:3001/admin/dashboard/get-total-cancel-order"
    ).then((response) => {
      setTotalCancelOrder(response.data[0].totalCancelOrder);
    });
  };

  const [totalBook, setTotalBook] = useState(0);
  const getTotalBook = () => {
    Axios.get("http://localhost:3001/admin/dashboard/get-total-book").then(
      (response) => {
        setTotalBook(response.data[0].totalBook);
      }
    );
  };

  const [totalSoldBook, setTotalSoldBook] = useState(0);
  const getTotalSoldBook = () => {
    Axios.get("http://localhost:3001/admin/dashboard/get-total-sold-book").then(
      (response) => {
        setTotalSoldBook(response.data[0].totalSoldBook);
      }
    );
  };

  const [totalOutOfStock, setTotalOutOfStock] = useState(0);
  const getTotalOutOfStock = () => {
    Axios.get(
      "http://localhost:3001/admin/dashboard/get-total-out-of-book"
    ).then((response) => {
      setTotalOutOfStock(response.data[0].totalOutOfStock);
    });
  };

  useEffect(() => {
    getTotalProduct();
    getTotalNotConfirmBook();

    getTotalOrder();
    getTotalSuccessOrder();
    getTotalCancelOrder();

    getTotalBook();
    getTotalSoldBook();
    getTotalOutOfStock();
  }, []);
  return (
    <section>
      <div>
        <div className="card-group mb-4">
          <div className="card">
            <div className="card-header">
              <i className="material-icons"> format_list_bulleted </i>
              <span> Thông tin sản phẩm</span>
            </div>
            <div className="card-body">
              <ul className="card-text">
                <li className="d-flex justify-content-between align-items-center">
                  Tổng sản phẩm:
                  <span className="badge bg-info rounded-pill">
                    {totalProduct}
                  </span>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  Sản phẩm chưa duyệt:
                  <span className="badge bg-danger rounded-pill">
                    {totalNotConfirmBook}
                  </span>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  Sản phẩm đã hết hàng:
                  <span className="badge bg-danger rounded-pill">
                    {totalOutOfStock}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <i className="material-icons"> format_list_bulleted </i>
              <span> Thông tin kho hàng</span>
            </div>
            <div className="card-body">
              <ul className="card-text">
                <li className="d-flex justify-content-between align-items-center">
                  Tổng số hàng:
                  <span className="badge bg-info rounded-pill">
                    {totalBook}
                  </span>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  Số hàng đã bán:
                  <span className="badge bg-info rounded-pill">
                    {totalSoldBook}
                  </span>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  Số hàng tồn trong kho:
                  <span className="badge bg-info rounded-pill">
                    {totalBook - totalSoldBook}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <i className="material-icons"> format_list_bulleted </i>
              <span> Thông tin đơn hàng</span>
            </div>
            <div className="card-body">
              <ul className="card-text">
                <li className="d-flex justify-content-between align-items-center">
                  Tổng số đơn hàng:
                  <span className="badge bg-info rounded-pill">
                    {totalOrder}
                  </span>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  Số đơn đang thực hiện:
                  <span className="badge bg-info rounded-pill">
                    {totalOrder - totalSuccessOrder - totalCancelOrder}
                  </span>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  Số đơn thành công:
                  <span className="badge bg-info rounded-pill">
                    {totalSuccessOrder}
                  </span>
                </li>
                <li className="d-flex justify-content-between align-items-center">
                  Số đơn bị hủy:
                  <span className="badge bg-info rounded-pill">
                    {totalCancelOrder}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
