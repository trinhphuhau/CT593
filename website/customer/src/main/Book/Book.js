import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { numberFormat } from "../../numberFormat";
import Skeletion from "../Skeletion/Skeleton";

function Book(props) {
  const { item } = props;
  const [loaded, setLoaded] = useState(false);
  const starAvg = (productRateAvg, bookId) => {
    const div = [];
    for (var j = 0; j < Math.round(productRateAvg); j++) {
      div.push(
        <i className="rating__icon--star fa fa-star" key={`${bookId}${j}`}></i>
      );
    }
    for (var z = Math.round(productRateAvg); z < 5; z++) {
      div.push(<i className="fa fa-star not-rated" key={`${bookId}${z}`}></i>);
    }
    return div;
  };

  const onLoading = () => {
    setTimeout(() => {
      setLoaded(true);
    }, 500);
  };

  return (
    <Link to={"/product?id=" + item.book_id}>
      <div className="book-item" key={item.book_id}>
        <div className="book-info">
          {!loaded && <Skeletion extraStyles={{ height: "100%", borderRadius: "10px" }} />}
          <img
            src={item.image_url}
            alt=""
            onLoad={onLoading}
          />
        </div>
        <div className="book-detail">
          <div className="book-title-authors">
            {!loaded && <Skeletion extraStyles={{ height: "39px" }} />}
            {loaded && (
              <p className="book-title" onLoad={onLoading}>
                {item.title}
              </p>
            )}
            {!loaded && (
              <Skeletion extraStyles={{ height: "14px", marginTop: "5px" }} />
            )}
            {loaded && <p className="book-authors" onLoad={onLoading}>{item.authors}</p>}
          </div>
          <div className="book-rate">
            {!loaded && <Skeletion extraStyles={{ height: "15px" }} />}
            {loaded && (
              <span className="book-rate-star" onLoad={onLoading}>
                {starAvg(item.average_rating, item.book_id)}
              </span>
            )}

            {/* <span className="book-rate-count">
              (
              <span>
                {item.rateCount === null ? "0" : item.work_ratings_count}
              </span>
              )
            </span> */}
          </div>
          <div className="book-price">
            {!loaded && <Skeletion extraStyles={{ height: "36px" }} />}
            {loaded && (
              <Fragment>
                <p className="book-actual-price">
                  {numberFormat(item.price_tag)}
                </p>
                <p className="book-sale">
                  <span className="book-sale-price">
                    {numberFormat(item.price)}
                  </span>
                  <span className="book-sale-off color-test danger">
                    -{Math.ceil(100 - (item.price / item.price_tag) * 100)}%
                  </span>
                </p>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Book;
