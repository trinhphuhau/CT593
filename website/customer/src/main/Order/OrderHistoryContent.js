import { useEffect, useState } from "react";
import Axios from "axios";
import { numberFormat } from "../../numberFormat";
import { Link, useLocation } from "react-router-dom";

export default function OrderHistoryContent(props) {
  const { currentStatus, customerInfo, status } = props;
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [orderHistory, setOrderHistory] = useState({
    orderHistory: "",
    details: "",
  });

  const location = useLocation();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();

  const pageCal = () => {
    if (query.get("page") === null || Number(query.get("page")) <= 0) {
      return 1;
    } else {
      return Number(query.get("page"));
    }
  };

  const getOrderHistory = () => {
    const data = {
      status_id: currentStatus,
      user_id: customerInfo.user_id,
      page: pageCal(),
    };
    Axios.post("http://localhost:3001/get-order-history", data).then((res) => {
      setOrderHistory(res.data);
    });
  };

  const getTotalOrderHistory = () => {
    const data = {
      status_id: currentStatus,
      user_id: customerInfo.user_id,
    };
    Axios.post("http://localhost:3001/get-total-order-history", data).then(
      (res) => {
        setTotalPage(Math.ceil(res.data[0].totalCount / 5));
      }
    );
  };

  useEffect(() => {
    getOrderHistory();
  }, [page]);

  useEffect(() => {
    getTotalOrderHistory();
    getOrderHistory();
    setPage(1);
  }, [currentStatus]);

  const changePage = (number) => {
    setPage(number);
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
        <Link to={`?page=${i}`} key={`pagination-button-${i}`}>
          <button
            className={
              Number(query.get("page")) === i ||
              (query.get("page") === null && i === 1) ||
              (query.get("page") <= 0 && i === 1) ||
              (query.get("page") > totalPage && i === 1)
                ? "active"
                : ""
            }
            onClick={() => changePage(Number(page + 1))}
          >
            {i}
          </button>
        </Link>
      );
      l = i;
    }
    return rangeWithDots;
  }

  const container = () => {
    const div = [];
    for (var i = 0; i < orderHistory.orderHistory.length; i++) {
      div.push(
        <Link
          to={{
            pathname: `/order-detail/${orderHistory.orderHistory[i].order_id}`,
            state: { prevPath: location.pathname },
          }}
          className="order-history-items-block"
          key={`orderHistory-${orderHistory.orderHistory[i].order_id}`}
        >
          <div className="order-history-items">
            <div className="order-history-header flex justify-between">
              <div className="header-orderID">
                Order #{orderHistory.orderHistory[i].order_id}
              </div>
              <span>
                {status.map((s) =>
                  s.status_id === orderHistory.orderHistory[i].status_id
                    ? s.status
                    : ""
                )}
              </span>
            </div>
            <div className="order-history-detail">
              {orderHistory.details[i].map((item) => (
                <div
                  className="item-detail flex justify-between"
                  key={item.book_id}
                >
                  <div className="flex" style={{ columnGap: "10px" }}>
                    <div className="item-detail-image">
                      <img src={item.image_url} alt="" />
                    </div>
                    <div className="item-detail-info">
                      <div className="item-detail-info-title">{item.title}</div>
                    </div>
                  </div>
                  <div className="item-detail-info-price">
                    {numberFormat(item.price)}
                  </div>
                </div>
              ))}
            </div>
            <div className="order-history-fee">
              <div className="order-history-detail-total flex justify-between">
                <span>Tổng cộng:</span>
                <span>
                  {numberFormat(
                    orderHistory.orderHistory[i].total_price +
                      orderHistory.orderHistory[i].shipping_fee -
                      orderHistory.orderHistory[i].discount
                  )}
                </span>
              </div>
            </div>
          </div>
        </Link>
      );
    }
    return div;
  };
  return (
    <>
      {orderHistory.orderHistory.length === 0 && (
        <div className="order-history-items">
          <div className="order-history-empty">
            <div>Rất tiếc, bạn chưa có bất kì đơn hàng nào</div>
            <img
              src={require("../../img/pixeltrue-plan-1.png").default}
              alt=""
              className="order-history-empty-img"
            />
          </div>
        </div>
      )}
      {container()}
      {orderHistory.orderHistory.length !== 0 && (
        <div className="pagination">{pagination(1, totalPage)}</div>
      )}
    </>
  );
}
