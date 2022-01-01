import React from "react";
import "./Product.css";
import ProductHeader from "./ProductHeader";
import ProductContent from "./ProductContent";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Axios from "axios";

function Product(props) {
  const { onAdd, cartItems, customerInfo } = props;
  const [bookRating, setBookRating] = useState([]);
  const [userRating, setUserRating] = useState([
    {
      book_id: 0,
      user_id: 0,
      rating: 0,
      review: "",
    },
  ]);
  const [bookDetail, setBookDetail] = useState([
    {
      id: 0,
      book_id: 0,
      best_book_id: 0,
      work_id: 0,
      books_count: 0,
      authors: "",
      original_publication_year: "",
      original_title: "",
      title: "",
      genre_id: "",
      description: "",
      publisher: "",
      price: 0,
      price_tag: 0,
      average_rating: 0,
      ratings_count: 0,
      work_ratings_count: 0,
      work_text_reviews_count: 0,
      ratings_1: 0,
      ratings_2: 0,
      ratings_3: 0,
      ratings_4: 0,
      ratings_5: 0,
      image_url: "",
      small_image_url: "",
      genre: "",
      image: "",
    },
  ]);
  const [contentBasedList, setContentBasedList] = useState([]);
  const [contentBasedTitle, setContentBasedTitle] = useState("");

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();

  const getBookDetail = () => {
    Axios.get("http://localhost:3001/get-book-detail?" + query).then(
      (response) => {
        setBookDetail(response.data);
      }
    );
  };

  const getBookRating = () => {
    Axios.post("http://localhost:3001/get-book-rating?" + query).then(
      (response) => {
        setBookRating(response.data);
      }
    );
  };

  const getUserRating = () => {
    const data = {
      user_id: customerInfo.user_id,
    };
    Axios.post("http://localhost:3001/get-user-rating?" + query, data).then(
      (response) => {
        setUserRating(response.data);
      }
    );
  };

  const allRatingFunction = () => {
    getBookDetail();
    getBookRating();
    getUserRating();
  };

  useEffect(() => {
    Axios.all([
      Axios.get("http://localhost:3001/get-recommend-content-based?" + query),
      Axios.get("http://localhost:3001/get-book-detail?" + query),
      Axios.post("http://localhost:3001/get-book-rating?" + query),
      Axios.post("http://localhost:3001/get-user-rating?" + query, {
        user_id: customerInfo.user_id,
      }),
    ]).then(
      Axios.spread((obj1, obj2, obj3, obj4) => {
        setContentBasedList(obj1.data.data);
        setContentBasedTitle(obj1.data.title);
        setBookDetail(obj2.data);
        setBookRating(obj3.data);
        setUserRating(obj4.data);
      })
    );
  }, [query.get("id")]);

  useEffect(() => {
    getUserRating();
  }, [customerInfo]);

  return (
    <>
      <ProductHeader cartItems={cartItems} bookDetail={bookDetail} />
      <ProductContent
        cartItems={cartItems}
        bookDetail={bookDetail}
        bookRating={bookRating}
        onAdd={onAdd}
        allRatingFunction={allRatingFunction}
        customerInfo={customerInfo}
        userRating={userRating}
        contentBasedList={contentBasedList}
        contentBasedTitle={contentBasedTitle}
      />
    </>
  );
}

export default Product;
