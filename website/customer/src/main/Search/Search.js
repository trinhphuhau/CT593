import { Link, useLocation } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";
import SearchHeader from "./SearchHeader";
import Book from "../Book/Book";
import Promo from "../Promo";

function Search(props) {
  const { cartItems } = props;
  const [search, setSearch] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();

  useEffect(() => {
    Axios.post("http://localhost:3001/get-total-search?" + query).then(
      (res) => {
        setTotalCount(res.data[0].totalCount);
        setTotalPage(Math.ceil(res.data[0].totalCount / 12));
      }
    );
  }, [query]);

  const pageCal = () => {
    if (query.get("page") === null || Number(query.get("page")) <= 0) {
      return 1;
    } else {
      return Number(query.get("page"));
    }
  };

  const getSearchData = () => {
    const data = {
      q: query.get("q"),
      page: pageCal(),
    };
    Axios.post("http://localhost:3001/search", data).then((res) => {
      setSearch(res.data);
    });
  };

  useEffect(() => {
    getSearchData();
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
          to={`?q=${query.get("q")}&page=${i}`}
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
    <div>
      <SearchHeader cartItems={cartItems} />
      <div className="search">
        <div className="search-title">
          <span className="search-query">{query.get("q")}</span>
          <span className="search-total">({totalCount} kết quả)</span>
        </div>
      </div>
      {totalCount === 0 && (
        <>
          <div className="search-empty">
            <div className="search-empty-text">
              Không tìm thấy kết quả phù hợp
            </div>
            <img
              src={require("../../img/pixeltrue-seo-1.png").default}
              alt=""
              className="search-empty-img"
            />
          </div>
          <div style={{ marginTop: "30px" }}>
            <Promo />
          </div>
        </>
      )}
      {totalCount > 0 && (
        <>
          <Promo />
          <div className="book-all-list">
            {search.map((item) => {
              return <Book item={item} key={`search-${item.book_id}`} />;
            })}
          </div>
          <div className="pagination">
            {pagination(Number(query.get("page")), totalPage)}
          </div>
        </>
      )}
    </div>
  );
}

export default Search;
