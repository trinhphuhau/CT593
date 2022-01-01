// import Display from "../Display/Display";
import "../Content/Content.css";
import "../Product/Product.css";
import { numberFormat } from "../../numberFormat";
import React from "react";
import Block from "../Block/Block";
import Rating from "../Rating/Rating";
import Skeletion from "../Skeletion/Skeleton";
import ReactHtmlParser from "react-html-parser";
import { useState } from "react";

function ProductContent(props) {
  const {
    bookDetail,
    onAdd,
    bookRating,
    allRatingFunction,
    customerInfo,
    userRating,
    contentBasedList,
    contentBasedTitle,
  } = props;

  const [loaded, setLoaded] = useState(false);

  const onLoading = () => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  };

  const starAvg = () => {
    const div = [];
    for (var j = 0; j < Math.round(bookDetail[0].average_rating); j++) {
      div.push(
        <i
          className="rating__icon--star fa fa-star"
          key={`${bookDetail[0].book_id}${j}`}
        ></i>
      );
    }
    for (var z = Math.round(bookDetail[0].average_rating); z < 5; z++) {
      div.push(
        <i
          className="fa fa-star not-rated"
          key={`${bookDetail[0].book_id}${z}`}
        ></i>
      );
    }
    return div;
  };

  return (
    <>
      <div className="product-details">
        <div className="product-img">
          {!loaded && (
            <Skeletion
              extraStyles={{ height: "300px", borderRadius: "10px" }}
            />
          )}
          <img
            src={bookDetail[0].image_url}
            alt=""
            className="product-img"
            onLoad={onLoading}
          />
        </div>
        <div className="product-detail">
          {!loaded && (
            <Skeletion extraStyles={{ height: "26px", marginBottom: "5px" }} />
          )}
          {loaded && <h2 className="product-title">{bookDetail[0].title}</h2>}
          <div>
            {!loaded && (
              <Skeletion
                extraStyles={{ height: "19px", marginBottom: "15px" }}
              />
            )}
            {loaded && (
              <a href="#ratings">
                <div className="product-rating">
                  <div>{starAvg()}</div>{" "}
                  <div className="product-rating-text">
                    (<span>{bookDetail[0].work_ratings_count} đánh giá</span>)
                  </div>
                </div>
              </a>
            )}
          </div>
          {!loaded && (
            <Skeletion extraStyles={{ height: "19px", marginBottom: "5px" }} />
          )}
          {loaded && (
            <div className="product-authors">
              <span>Tác giả:</span> {bookDetail[0].authors}
            </div>
          )}
          {!loaded && (
            <Skeletion extraStyles={{ height: "19px", marginBottom: "5px" }} />
          )}
          {loaded && (
            <div className="product-genre">
              <span>Thể loại:</span> {bookDetail[0].genre}
            </div>
          )}
          {!loaded && (
            <Skeletion extraStyles={{ height: "50px", margin: "20px 0" }} />
          )}
          {loaded && (
            <div className="product-price">
              <span className="product-actual-price">
                {numberFormat(bookDetail[0].price_tag)}
              </span>
              <div className="product-sale">
                <span className="product-sale-price">
                  {numberFormat(bookDetail[0].price)}
                </span>
                <span className="product-sale-off color-test danger">
                  -
                  {Math.ceil(
                    100 - (bookDetail[0].price / bookDetail[0].price_tag) * 100
                  )}
                  %
                </span>
              </div>
            </div>
          )}
          {!loaded && (
            <Skeletion extraStyles={{ height: "46px", marginBottom: "20px" }} />
          )}
          {loaded && (
            <div className="product-add">
              <button onClick={() => onAdd(bookDetail[0])}>
                Thêm vào giỏ hàng
              </button>
            </div>
          )}
          <div className="product-text">
            <p>
              <img
                src="https://shop.waka.vn/themes/desktop/images/shipper_icon.png"
                alt=""
              />
              Nhập mã <strong>"FREELOVERS"</strong> miễn phí giao hàng!
            </p>
            <p>
              <img
                src="https://shop.waka.vn/themes/desktop/images/phone_icon.png"
                alt=""
              />
              Hotline: 0123 456 789
            </p>
          </div>
        </div>
      </div>
      <div className="block" style={{ padding: "20px" }}>
        <div className="product-description">
          <h3>Mô tả sách</h3>
          {!loaded && (
            <>
              <Skeletion extraStyles={{ height: "22px", marginTop: "10px" }} />
              <Skeletion extraStyles={{ height: "22px", marginTop: "10px" }} />
              <Skeletion extraStyles={{ height: "22px", marginTop: "10px" }} />
              <Skeletion extraStyles={{ height: "22px", marginTop: "10px" }} />
              <Skeletion extraStyles={{ height: "22px", marginTop: "10px" }} />
            </>
          )}
          {loaded && (
            <div className="description">
              {ReactHtmlParser(bookDetail[0].description)}
            </div>
          )}
        </div>
      </div>
      <Block
        title={contentBasedTitle}
        img="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/285/package_1f4e6.png"
        bookList={contentBasedList}
        onAdd={onAdd}
        showAll="none show all"
      />
      <Rating
        bookRating={bookRating}
        allRatingFunction={allRatingFunction}
        bookDetail={bookDetail}
        starAvg={starAvg}
        customerInfo={customerInfo}
        userRating={userRating}
      />
    </>
  );
}

export default ProductContent;
