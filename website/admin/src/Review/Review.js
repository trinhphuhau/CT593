import "./Review.css";
import userImg from "../images/blank-profile-picture.jpg";
import Axios from "axios";
import { useEffect, useState } from "react";
import { formatDate } from "../formatDate";
import Modal from "../Components/Modal";

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getTotalPage = () => {
    Axios.get("http://localhost:3001/admin/review/get-total-user-review", {
      page: page,
    }).then((res) => {
      setTotalPage(Math.ceil(res.data[0].total / 5));
    });
  };

  const getReviews = () => {
    Axios.post("http://localhost:3001/admin/review/get-user-review", {
      page: page,
    }).then((res) => {
      setReviews(res.data);
    });
  };

  const deleleReview = (review_id) => {
    Axios.post("http://localhost:3001/admin/review/delete-user-review", {
      review_id: review_id,
    }).then((res) => {
      getReviews();
    });
  };

  useEffect(() => {
    getTotalPage();
    getReviews();
  }, []);

  const changePage = (page) => {
    setPage(page);
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

  useEffect(() => {
    getReviews();
  }, [page]);

  return (
    <div className="bg-light">
      <div className="px-5 py-4 border rounded bg-white">
        <h1 className="display-2 mb-3">Đánh giá</h1>
        <div>
          <div className="rated">
            {reviews.map((review) => (
              <div
                className="rated-item mt-5"
                key={`${review.review_id}-${review.user_id}`}
              >
                <div className="rated-user">
                  <div className="user-avatar">
                    <img src={userImg} alt="" />
                  </div>
                  <div>
                    <div className="user-name">{review.name}</div>
                    <div className="rated-time">
                      {formatDate(review.modified_date)}
                    </div>
                  </div>
                </div>
                <div className="rated-detail">
                  <div className="rated-detail-title">
                    <a href="#" target="_blank">
                      <h5>{review.title}</h5>
                    </a>
                    <button
                      className="material-icons-outlined btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteReviewModal"
                    >
                      delete
                    </button>
                  </div>
                  <div className="rated-star">
                    <i className="rating__icon--star fa fa-star"></i>
                    <i className="rating__icon--star fa fa-star"></i>
                    <i className="rating__icon--star fa fa-star"></i>
                    <i className="rating__icon--star fa fa-star"></i>
                  </div>
                  <div className="rated-review">{review.review}</div>
                </div>
                <Modal
                  id="deleteReviewModal"
                  label="deleteReviewModalLabel"
                  title="Xác nhận xóa đánh giá"
                  text="Bạn đồng ý muốn xóa đánh giá này chứ?"
                  closeBtn="Hủy bỏ"
                  saveBtn="Đồng ý"
                  save={() => deleleReview(review.review_id)}
                />
              </div>
            ))}
          </div>
        </div>
        <nav aria-label="Page navigation" className="mt-4">
          <ul className="pagination justify-content-center">
            {pagination(page, totalPage)}
          </ul>
        </nav>
      </div>
    </div>
  );
}
