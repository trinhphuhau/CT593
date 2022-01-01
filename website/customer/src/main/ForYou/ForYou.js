import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Book from "../Book/Book";
import Promo from "../Promo";
import Axios from "axios";

function ForYou(props) {
  const { cartItems, customerInfo } = props;
  const [recommend, setRecommend] = useState([]);
  const getRecommend = () => {
    Axios.post("http://localhost:3001/recommend", {
      userId: customerInfo.user_id,
      favorite: customerInfo.favorite,
    }).then((response) => {
      setRecommend(response.data);
    });
  };
  useEffect(() => {
    getRecommend();
    if (document.querySelector(".navigation-mobile") && !document.querySelector(".navigation-mobile.hide")) {
      document.querySelector(".navigation-mobile").classList.toggle("hide");
    }
  }, []);
  return (
    <>
      <Header cartItems={cartItems} customerInfo={customerInfo} />
      <Promo />
      <div>
        <div className="book-all-list">
          {recommend.map((item) => (
            <Book item={item} key={item.book_id} />
          ))}
        </div>
        <div className="pagination">
          {/* {pagination(Number(query.get("page")), totalPage)} */}
        </div>
      </div>
    </>
  );
}

export default ForYou;
