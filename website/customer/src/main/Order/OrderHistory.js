import Info from "../Info/Info";
import OrderHeader from "./OrderHeader";
import OrderHistoryContent from "./OrderHistoryContent";
import { NavLink, useParams, useLocation } from "react-router-dom";
import Axios from "axios";
import "./OrderHistory.css";
import { useEffect, useState } from "react";

export default function OrderHistory(props) {
  const { cartItems, customerInfo } = props;

  const status_id = useParams();
  const location = useLocation();

  const [status, setStatus] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(
    status_id.status === "to-confirm"
      ? "cxn"
      : status_id.status === "to-ship"
      ? "clh"
      : status_id.status === "to-receive"
      ? "dvc"
      : status_id.status === "completed"
      ? "ht"
      : status_id.status === "cancelled"
      ? "dh"
      : status_id.status === "ask_return"
      ? "aro"
      : "all"
  );

  const getStatus = () => {
    Axios.get("http://localhost:3001/get-order-status").then((res) => {
      setStatus(res.data);
    });
  };

  useEffect(() => {
    getStatus();
    if (!document.querySelector(".navigation-mobile.hide")) {
      document.querySelector(".navigation-mobile").classList.toggle("hide");
    }
  }, []);

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
        <span className="active">Lịch sử đặt hàng</span>
      </>
    );
  };

  return (
    <div className="history">
      <OrderHeader cartItems={cartItems} header={header} />
      <div className="order-history">
        <div className="order-history-left">
          <div className="order-history-status">
            <ul>
              <NavLink
                to={{
                  pathname: `/order-history/all`,
                  state: { prevPath: location.pathname },
                }}
                onClick={() => setCurrentStatus("all")}
              >
                <li>Tất cả</li>
              </NavLink>
              <NavLink
                to={{
                  pathname: `/order-history/to-confirm`,
                  state: { prevPath: location.pathname },
                }}
                onClick={() => setCurrentStatus("cxn")}
              >
                <li>Chưa xác nhận</li>
              </NavLink>
              <NavLink
                to={{
                  pathname: `/order-history/to-ship`,
                  state: { prevPath: location.pathname },
                }}
                onClick={() => setCurrentStatus("clh")}
              >
                <li>Đang gửi hàng</li>
              </NavLink>
              <NavLink
                to={{
                  pathname: `/order-history/to-receive`,
                  state: { prevPath: location.pathname },
                }}
                onClick={() => setCurrentStatus("dvc")}
              >
                <li>Đang vận chuyển</li>
              </NavLink>
              <NavLink
                to={{
                  pathname: `/order-history/completed`,
                  state: { prevPath: location.pathname },
                }}
                onClick={() => setCurrentStatus("ht")}
              >
                <li>Đã hoàn tất</li>
              </NavLink>
              <NavLink
                to={{
                  pathname: `/order-history/cancelled`,
                  state: { prevPath: location.pathname },
                }}
                onClick={() => setCurrentStatus("dh")}
              >
                <li>Đã hủy</li>
              </NavLink>
              <NavLink
                to={{
                  pathname: `/order-history/ask_return`,
                  state: { prevPath: location.pathname },
                }}
                onClick={() => setCurrentStatus("aro")}
              >
                <li>Yêu cầu trả hàng</li>
              </NavLink>
            </ul>
          </div>
          <Info id="info-desktop" />
        </div>
        <div className="order-history-content">
          <OrderHistoryContent
            currentStatus={currentStatus}
            customerInfo={customerInfo}
            status={status}
          />
        </div>
      </div>
      <Info id="info-mobile" />
    </div>
  );
}
