import "./Rating.css";
import Axios from "axios";
import { useState } from "react";

function Rating(props) {
  const {
    bookDetail,
    bookRating,
    allRatingFunction,
    starAvg,
    userRating,
    customerInfo,
  } = props;

  const [rating, setRating] = useState(0);
  const [checked, setChecked] = useState(true);
  const [review, setReview] = useState("");

  const ratings_count = bookDetail[0].work_ratings_count;

  const onRating = (event) => {
    setRating(event.target.value);
    setChecked(!checked);
  };

  const onReview = (event) => {
    setReview(event.target.value);
  };

  const onRate = (e) => {
    e.preventDefault();
    if (customerInfo.user_id !== 0) {
      if (rating !== 0) {
        const data = {
          book_id: bookDetail[0],
          user_id: customerInfo.user_id,
          rating: rating,
          review: review,
        };
        const config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        };
        Axios.post("http://localhost:3001/rate", data, config).then((res) => {
          allRatingFunction();
        });
      } else {
        console.log("Vui lòng chọn đánh giá");
      }
    } else console.log("Vui lòng đăng nhập để đánh giá");
  };

  const userStarRatedView = (rating, key) => {
    const div = [];
    for (var i = 0; i < rating; i++)
      div.push(
        <i className="rating__icon--star fa fa-star" key={`${key}-${i}`}></i>
      );
    return div;
  };

  const starView = () => {
    const container = [];
    const ratings = [
      bookDetail[0].ratings_1,
      bookDetail[0].ratings_2,
      bookDetail[0].ratings_3,
      bookDetail[0].ratings_4,
      bookDetail[0].ratings_5,
    ];
    for (var i = 5; i > 0; i--) {
      const div = [];
      let countStar = ratings[i - 1];
      let percentStar = Math.round((countStar / ratings_count) * 100);
      for (var j = 0; j < i; j++) {
        div.push(
          <i
            className="rating__icon--star fa fa-star"
            key={`${bookDetail[0].book_id}-${j}`}
          ></i>
        );
      }
      for (var z = 5; z > j; z--) {
        div.push(
          <i
            className="fa fa-star not-rated"
            key={`${bookDetail[0].book_id}-${z}`}
          ></i>
        );
      }
      container.push(
        <div
          className="rated-chart-line flex"
          key={`${bookDetail[0].book_id}-${bookDetail[0].book_id}-${i}`}
        >
          <div className="rated-chart-star">{div}</div>
          <div className="rated-line flex align-center">
            <div className="rated-bar">
              <div
                className="rated-bar-process"
                style={{ width: `${percentStar}%` }}
              ></div>
            </div>
            <span>{countStar}</span>
          </div>
        </div>
      );
    }
    return container;
  };

  const formatDate = (dateString) => {
    const timestamp = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(timestamp);
  };

  return (
    <div className="block" id="ratings">
      <div className="block-header">
        <div className="block-title">
          <img
            src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/285/memo_1f4dd.png"
            alt=""
          />
          <h2>Đánh giá từ khách hàng</h2>
        </div>
        {JSON.parse(localStorage.getItem("loginStatus")) === false && (
          <a href="/#">Đăng nhập để đánh giá</a>
        )}
      </div>
      <div className="rating">
        <div className="rating-total">
          <div className="rating-total-count">
            <div className="rating-total-avg">
              {bookDetail[0].average_rating.toFixed(1)}
            </div>
            <div>
              <div className="rating-total-avg-icon">{starAvg()}</div>
              <div className="rating-total-avg-text">
                {ratings_count} đánh giá
              </div>
            </div>
          </div>
          <div className="rated-chart">{starView()}</div>
        </div>

        {userRating[0].user_id !== 0 && (
          <div className="rating-review">
            <div className="rating-review-title">Đánh giá của bạn</div>
            <div className="rating-group">
              <label className="rating__label">
                {userStarRatedView(userRating[0].rating, "hibestie")}
              </label>
            </div>
            <div className="rating-review-text">
              {userRating[0].review !== "" && (
                <textarea
                  type="text"
                  name="review"
                  placeholder={userRating[0].review}
                  onChange={onReview}
                  disabled
                ></textarea>
              )}
            </div>
          </div>
        )}

        {userRating[0].user_id === 0 && (
          <form className="rating-review" onSubmit={onRate}>
            <div id="full-stars-example-two">
              <div className="rating-group">
                <input
                  disabled
                  className="rating__input rating__input--none"
                  name="rating3"
                  id="rating3-none"
                  value="0"
                  type="radio"
                  defaultChecked={checked}
                />
                <label
                  aria-label="1 star"
                  className="rating__label"
                  htmlFor="rating3-1"
                >
                  <i className="rating__icon rating__icon--star fa fa-star"></i>
                </label>
                <input
                  className="rating__input"
                  name="rating3"
                  id="rating3-1"
                  value="1"
                  type="radio"
                  onChange={onRating}
                />
                <label
                  aria-label="2 stars"
                  className="rating__label"
                  htmlFor="rating3-2"
                >
                  <i className="rating__icon rating__icon--star fa fa-star"></i>
                </label>
                <input
                  className="rating__input"
                  name="rating3"
                  id="rating3-2"
                  value="2"
                  type="radio"
                  onChange={onRating}
                />
                <label
                  aria-label="3 stars"
                  className="rating__label"
                  htmlFor="rating3-3"
                >
                  <i className="rating__icon rating__icon--star fa fa-star"></i>
                </label>
                <input
                  className="rating__input"
                  name="rating3"
                  id="rating3-3"
                  value="3"
                  type="radio"
                  onChange={onRating}
                />
                <label
                  aria-label="4 stars"
                  className="rating__label"
                  htmlFor="rating3-4"
                >
                  <i className="rating__icon rating__icon--star fa fa-star"></i>
                </label>
                <input
                  className="rating__input"
                  name="rating3"
                  id="rating3-4"
                  value="4"
                  type="radio"
                  onChange={onRating}
                />
                <label
                  aria-label="5 stars"
                  className="rating__label"
                  htmlFor="rating3-5"
                >
                  <i className="rating__icon rating__icon--star fa fa-star"></i>
                </label>
                <input
                  className="rating__input"
                  name="rating3"
                  id="rating3-5"
                  value="5"
                  type="radio"
                  onChange={onRating}
                />
              </div>
            </div>
            <div className="rating-review-text">
              <textarea
                type="text"
                name="review"
                placeholder="Nội dung"
                onChange={onReview}
              ></textarea>
            </div>
            <button type="submit">Gửi đánh giá</button>
          </form>
        )}
      </div>
      <div className="rated">
        {bookRating.map((rated) => (
          <div
            className="rated-item"
            key={`${rated.book_id}-${rated.user_id}-${rated.rating}`}
          >
            <div className="rated-user">
              <div className="user-avatar">
                <img
                  src={
                    rated.image_url === ""
                      ? require("../../img/blank-profile-picture.jpg").default
                      : rated.image_url
                  }
                  alt=""
                />
              </div>
              <div>
                <div className="user-name">{rated.name}</div>
                <div className="rated-time">
                  {formatDate(rated.modified_date)}
                </div>
              </div>
            </div>
            <div className="rated-detail">
              <div className="rated-star">
                {userStarRatedView(
                  rated.rating,
                  `${rated.book_id}-${rated.user_id}`
                )}
              </div>
              <div className="rated-review">{rated.review}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rating;
