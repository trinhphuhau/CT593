import { useEffect, useState } from "react";
import Books from "./Books";
import Axios from "axios";
import AddNewProduct from "./AddNewProduct";

export default function Product() {
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState({
    query: "",
    genre_id: "",
  });
  const getGenres = () => {
    Axios.get("http://localhost:3001/admin/product/get-genres").then((res) => {
      setGenres(res.data);
    });
  };

  const getBookData = () => {
    const data = {
      query: search.query,
      genre_id: search.genre_id,
      page: page,
      limit: 4,
    };
    Axios.post("http://localhost:3001/admin/product/get-books", data).then((res) => {
      setBooks(res.data);
    });
  };

  const getPage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    getGenres();
  }, []);
  return (
    <div className="bg-light">
      <AddNewProduct getBookData={getBookData} />
      <div className="px-5 py-4 border rounded bg-white">
        <h1 className="display-2 mb-3">Sản phẩm</h1>
        <div className="form-group clearfix">
          <div
            className="input-group float-start"
            style={{ width: "calc(100% - 166px)" }}
          >
            <div className="input-group-prepend">
              <span className="input-group-text material-icons">search</span>
            </div>
            <input
              type="text"
              className="form-control me-3"
              id="search"
              onChange={(e) => {
                setSearch({ ...search, query: e.target.value });
              }}
              placeholder="Tìm tên sản phẩm..."
            />
            <select
              className="form-select"
              name="genre_id"
              defaultValue={""}
              onChange={(e) => {
                setSearch({ ...search, genre_id: e.target.value });
              }}
            >
              <option value="">Tất cả thể loại</option>
              {genres.map((genre) => (
                <option value={genre.genre_id} key={`genre-${genre.genre_id}`}>
                  {genre.genre}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn btn-success float-end"
            data-bs-toggle="collapse"
            data-bs-target="#addNewProduct"
          >
            <span className="material-icons-outlined">add</span>
            Sản phẩm mới
          </button>
        </div>
        <Books
          search={search}
          genres={genres}
          getBookData={getBookData}
          books={books}
          getPage={getPage}
        />
      </div>
    </div>
  );
}
