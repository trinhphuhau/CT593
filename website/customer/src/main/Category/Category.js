import CategoryHeader from "./CategoryHeader";
import Book from "../Book/Book";
import "./CategoryMenu.css";
import Axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Promo from "../Promo";

function Category(props) {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const { cartItems } = props;
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  const getCategoryTotalPage = () => {
    const data = {
      genre_id: query.get("id"),
    };
    Axios.post("http://localhost:3001/get-category-total-page", data).then(
      (res) => {
        setTotalPage(res.data);
      }
    );
  };

  const pageCal = () => {
    if (query.get("page") === null || Number(query.get("page")) <= 0) {
      return 1;
    } else {
      return Number(query.get("page"));
    }
  };

  const getCategoryData = () => {
    const data = {
      genre_id: query.get("id"),
      page: pageCal(),
    };
    Axios.post("http://localhost:3001/get-category-data?", data).then((res) => {
      setBooks(res.data.books);
      setGenre(res.data.books[0].genre);
    });
  };

  useEffect(() => {
    getCategoryTotalPage();
  }, []);

  useEffect(() => {
    getCategoryData();
  }, [page]);

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
        <Link
          to={`?id=${query.get("id")}&page=${i}`}
          key={`pagination-button-${i}`}
        >
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

  return (
    <>
      <CategoryHeader cartItems={cartItems} genre={genre} />
      <div>
        <Promo />
        <div className="book-all-list">
          {books.map((item) => {
            return <Book item={item} key={`search-${item.book_id}`} />;
          })}
        </div>
        <div className="pagination">
          {pagination(Number(query.get("page")), totalPage)}
        </div>
      </div>

      {/* <div><button onClick={() => changePage(page + 1)}>aa</button></div> */}
    </>
  );
}

export default Category;
