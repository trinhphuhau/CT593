import { numberFormat } from "../numberFormat";
import { useState, useEffect } from "react";
import Axios from "axios";
import folderImg from "../images/folderImg.png";
import { formatDate } from "../formatDate";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Modal from "../Components/Modal";

export default function Books(props) {
  const { search, genres, getBookData, books, getPage } = props;
  const [totalBook, setTotalBook] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [image, setImage] = useState("");
  const [isUploadedImg, setIsUploadedImg] = useState(false);

  const [bookDetail, setBookDetail] = useState({
    authors: "",
    average_rating: 0,
    book_id: 0,
    description: "",
    genre_id: "",
    image_url: "",
    price: 0,
    price_tag: 0,
    publisher: "",
    ratings_1: 0,
    ratings_2: 0,
    ratings_3: 0,
    ratings_4: 0,
    ratings_5: 0,
    title: "",
    work_id: 0,
    status: 0,
  });

  const getBookDetail = (book) => {
    setBookDetail(book);
  };

  const updateBookDetail = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("image", bookDetail.image);
    data.append("title", bookDetail.title);
    data.append("authors", bookDetail.authors);
    data.append("price_tag", bookDetail.price_tag);
    data.append("price", bookDetail.price);
    data.append("genre_id", bookDetail.genre_id);
    data.append("book_id", bookDetail.book_id);
    data.append("status", bookDetail.status);
    data.append("publisher", bookDetail.publisher);
    data.append("image_url", bookDetail.image_url);
    data.append("description", bookDetail.description);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    Axios.post(
      "http://localhost:3001/admin/product/update-book-detail",
      data,
      config
    ).then((res) => {
      let alert = document.getElementById(`alert_${bookDetail.book_id}`);
      if (res.data.message === "success") {
        getBookData();
        alert.innerHTML =
          '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Thành công!</strong> Bạn đã cập nhật thông tin của sản phẩm thành công <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"/></div>';
      } else {
        alert.innerHTML =
          '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Thất bại!</strong> Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"/></div>';
      }
    });
  };

  const onHandleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setBookDetail({ ...bookDetail, [name]: value });
  };

  const changePage = (page) => {
    setPage(page);
    getPage(page);
  };

  const getTotalBooks = () => {
    const data = { query: search.query, genre_id: search.genre_id };
    Axios.post("http://localhost:3001/admin/product/get-total-book", data).then(
      (res) => {
        setTotalBook(res.data[0].totalBook);
        setTotalPage(Math.ceil(res.data[0].totalBook / 4));
      }
    );
  };

  const deleteBook = (book_id) => {
    Axios.post("http://localhost:3001/admin/product/delete-book", {
      book_id: book_id,
    }).then((response) => {
      if (response.data.message === "success") {
        getTotalBooks();
        getBookData();
      }
    });
  };

  const onHandleImgChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result);
        setIsUploadedImg(true);
      };

      setBookDetail({ ...bookDetail, image: e.target.files[0] });

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    getTotalBooks();
    getBookData();
  }, [search, page]);

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
          rangeWithDots.push(
            <span key={`pagination-dot-${i}`} style={{ margin: "0 10px" }}>
              ...
            </span>
          );
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

  return (
    <>
      <div id="product" className="mt-3">
        <div className="container-fluid border rounded">
          <div className="row font-weight-bold border-bottom p-3">
            <div className="col-auto p-0" style={{ width: "80px" }}></div>
            <div className="col">Tên sách</div>
            <div className="col">Tác giả</div>
            <div className="col">Thể loại</div>
            <div className="col">Giá bán (₫)</div>
            <div className="col">Số hàng tồn</div>
            <div className="col">Số lượng bán</div>
            <div className="col">Trạng thái</div>
            <div className="col-auto p-0" style={{ width: "5%" }}></div>
            <div className="col-auto p-0" style={{ width: "5%" }}></div>
          </div>
          {books.map((book) => (
            <div key={book.book_id}>
              <div className="row p-3 border-bottom item">
                <div className="col-auto p-0" style={{ width: "80px" }}>
                  <img src={book.image_url} className="product-img" alt="" />
                </div>
                <div className="col font-weight-bold product-title">
                  {book.title}
                </div>
                <div className="col product-authors">{book.authors}</div>
                <div className="col">{book.genre} </div>
                <div className="col">
                  <span className="color-test text-primary font-weight-bold">
                    {numberFormat(book.price)}
                  </span>
                </div>
                <div className="col">
                  <span
                    style={{ position: "relative" }}
                    className={`color-test font-weight-bold ${
                      book.stock === 0 ? "text-danger" : "text-info"
                    }`}
                  >
                    <span>{book.stock}</span>
                  </span>
                </div>
                <div className="col">
                  <span className="color-test text-success font-weight-bold">
                    {book.total - book.stock}
                  </span>
                </div>
                <div className="col">
                  <span
                    className={`badge ${
                      book.status === 1 && book.stock > 0
                        ? "bg-success"
                        : book.status === 1 && book.stock <= 0
                        ? "bg-danger"
                        : "bg-secondary"
                    }`}
                  >
                    {book.status === 1 && book.stock > 0
                      ? "Còn hàng"
                      : book.status === 1 && book.stock <= 0
                      ? "Hết hàng"
                      : "Chờ xác nhận"}
                  </span>
                </div>
                <div className="col-auto p-0" style={{ width: "5%" }}>
                  <a
                    href={`#product-details-${book.book_id}`}
                    className="btn btn-primary material-icons-outlined"
                    data-bs-toggle="collapse"
                    onClick={() => getBookDetail(book)}
                  >
                    create
                  </a>
                </div>
                <div className="col-auto p-0" style={{ width: "5%" }}>
                  <button
                    className="btn btn-danger material-icons-outlined"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteProductModal"
                  >
                    delete
                  </button>
                </div>
                <Modal
                  id="deleteProductModal"
                  label="deleteProductModalLabel"
                  title="Xác nhận xóa sản phẩm"
                  text="Bạn đồng ý muốn xóa sản phẩm này chứ?"
                  closeBtn="Hủy bỏ"
                  saveBtn="Đồng ý"
                  save={() => deleteBook(book.book_id)}
                />
              </div>
              <div
                className="row p-4 border-bottom formDetail collapse"
                id={`product-details-${book.book_id}`}
                key={`detail-${book.book_id}`}
                data-bs-parent="#product"
              >
                <div className="col-12 pb-2" id={`alert_${book.book_id}`}></div>
                <div className="col-4 pl-0">
                  <div className="productImg">
                    <label htmlFor={`hinhanh${book.book_id}`}>
                      <div className="productImg-input">
                        {!isUploadedImg ? (
                          <img
                            src={
                              book.image_url !== "" &&
                              !book.image_url.includes(
                                "https://s.gr-assets.com/assets/nophoto/book"
                              )
                                ? book.image_url
                                : folderImg
                            }
                            className="detail_img rounded productImg1"
                            id={`newProductImg${book.book_id}`}
                            alt=""
                            draggable={false}
                          />
                        ) : (
                          <img
                            src={image}
                            className="detail_img rounded productImg1"
                            id={`newProductImg${book.book_id}`}
                            alt=""
                            draggable={false}
                          />
                        )}
                        <span>Nhấn vào đây để tải lên ảnh mới</span>
                      </div>
                    </label>
                    <input
                      type="file"
                      name="hinhanh"
                      className="hide"
                      id={`hinhanh${book.book_id}`}
                      accept=".png, .jpg, .jpeg"
                      onChange={onHandleImgChange}
                    />
                  </div>
                </div>
                <div className="col-8">
                  <form onSubmit={updateBookDetail}>
                    <div className="row mb-4">
                      <div className="col-12 pe-2">
                        <label className="form-label" htmlFor="title">
                          Tên sách
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          defaultValue={book.title}
                          placeholder="Tên sách"
                          onChange={onHandleChange}
                        />
                        <div className="invalid-feedback">
                          Vui lòng nhập tên sách
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-8 pe-0">
                        <label className="form-label" htmlFor="authors">
                          Tác giả
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="authors"
                          defaultValue={book.authors}
                          placeholder="Tác giả"
                          onChange={onHandleChange}
                        />
                      </div>
                      <div className="col-2 ps-3 pe-0">
                        <label className="form-label" htmlFor="price">
                          Giá bìa (₫)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="price_tag"
                          defaultValue={book.price_tag}
                          placeholder="Price"
                          onChange={onHandleChange}
                        />
                      </div>
                      <div className="col-2 ps-2">
                        <label className="form-label" htmlFor="price">
                          Giá bán (₫)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="price"
                          defaultValue={book.price}
                          placeholder="Price"
                          onChange={onHandleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-4 mt-2">
                      <div className="col-6 pe-2">
                        <label className="form-label" htmlFor="name">
                          Thể loại
                        </label>
                        <select
                          className="form-select"
                          name="genre_id"
                          defaultValue={book.genre_id}
                          onChange={onHandleChange}
                        >
                          {genres.map((genre) => (
                            <option
                              value={genre.genre_id}
                              key={`genre-${genre.genre_id}-${book.book_id}`}
                            >
                              {genre.genre}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-6">
                        <label className="form-label" htmlFor="publisher">
                          Nhà xuất bản
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="publisher"
                          defaultValue={book.publisher}
                          placeholder="Nhà xuất bản"
                          onChange={onHandleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-4 mt-2">
                      <div className="col-6">
                        <label
                          className="form-label"
                          htmlFor=""
                          className="me-1"
                        >
                          Modified Date:{" "}
                        </label>
                        <span className="text-secondary">
                          {formatDate(book.modified_date)}
                        </span>
                      </div>
                      <div className="col-6">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`confirm-${book.book_id}`}
                            checked={bookDetail.status === 1 ? true : false}
                            onChange={(e) =>
                              setBookDetail({
                                ...bookDetail,
                                status: bookDetail.status === 1 ? 0 : 1,
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`confirm-${book.book_id}`}
                          >
                            Đã duyệt
                          </label>
                        </div>
                      </div>
                    </div>
                    <CKEditor
                      editor={ClassicEditor}
                      config={{ placeholder: "Mô tả của sản phẩm..." }}
                      data={book.description}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setBookDetail({ ...bookDetail, description: data });
                      }}
                    />
                    <div className="row mt-4">
                      <div className="col-12">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg w-100"
                          data-bs-toggle="modal"
                          data-bs-target="#updateProductModal"
                        >
                          Thay đổi thông tin
                        </button>
                      </div>
                    </div>
                    <Modal
                      id="updateProductModal"
                      label="updateProductModalLabel"
                      title="Xác nhận thay đổi thông tin"
                      text="Bạn đồng ý muốn thay đổi thông tin sản phẩm này chứ?"
                      closeBtn="Hủy bỏ"
                      saveBtn="Đồng ý"
                    />
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <nav aria-label="Page navigation" className="mt-4">
        <ul className="pagination justify-content-center">
          {pagination(page, totalPage)}
        </ul>
      </nav>
    </>
  );
}
