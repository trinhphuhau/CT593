import { useEffect, useState } from "react";
import Axios from "axios";
import Modal from "../Components/Modal";

export default function AddNewReceipt() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState({
    query: "",
    genre_id: "",
  });
  const [receipt, setReceipt] = useState([]);
  const [receiptInfo, setReceiptInfo] = useState([]);

  const onHandleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setReceiptInfo({ ...receiptInfo, [name]: value });
  };

  const getBookData = () => {
    if (search.query !== "") {
      const data = {
        query: search.query,
        genre_id: search.genre_id,
        page: 1,
        limit: 5,
      };
      Axios.post("http://localhost:3001/admin/product/get-books", data).then(
        (res) => {
          setBooks(res.data);
        }
      );
    } else {
      setBooks([]);
    }
  };

  const stockIn = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/admin/inventory/stock-in", {
      receiptInfo: receiptInfo,
      receipt: receipt,
    }).then((res) => {
      const alert = document.getElementById("alert_add_receipt");
      if (res.data.message === "success") {
        getBookData();
        alert.innerHTML =
          '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Thành công!</strong> Bạn đã nhập hàng thành công <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"/></div>';
        setTimeout(() => {
          e.target.reset();
          setSearch({
            query: "",
            genre_id: "",
          });
          setReceipt([]);
          setReceiptInfo([]);
        }, 750);
      } else {
        alert.innerHTML =
          '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Thất bại!</strong> Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"/></div>';
      }
    });
  };

  const addToReceipt = (book) => {
    setReceipt([...receipt, { ...book, quantity: 1 }]);
  };

  const removeFromReceipt = (book) => {
    setReceipt(receipt.filter((x) => x.book_id !== book.book_id));
  };

  useEffect(() => {
    getBookData();
  }, [search]);

  return (
    <div className="border rounded bg-white mb-4 collapse" id="addNewReceipt">
      <form onSubmit={stockIn}>
        <div className="px-5 pt-4">
          <h1 className="display-2 mb-3">Nhập hàng</h1>
          <div className="col-12 pb-3" id="alert_add_receipt"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
            className="close-btn"
            data-bs-toggle="collapse"
            data-bs-target="#addNewReceipt"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text material-icons">search</span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Tìm tên sách..."
                onChange={(e) =>
                  setSearch({ ...search, query: e.target.value })
                }
              />
            </div>
            <div>
              <table className="table mt-4 border" id="bangthemhang">
                <thead className="table-secondary">
                  <tr>
                    <th>Tên sách</th>
                    <th>Tác giả</th>
                    <th>Thể loại</th>
                    <th>Số hàng tồn</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {books.length !== 0 ? (
                    books.map((book) => (
                      <tr key={`search-${book.book_id}`}>
                        <td>{book.title}</td>
                        <td>{book.authors}</td>
                        <td>{book.genre}</td>
                        <td>{book.stock}</td>
                        <td>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                            fill="#000000"
                            className="pointer"
                            onClick={() => addToReceipt(book)}
                          >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                          </svg>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        Vui lòng tìm kiếm sản phẩm muốn nhập hàng
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="p-5 pt-0">
          <div className="row">
            <div className="col-6 pe-2">
              <div className="form-group pt-1">
                <label htmlFor="receipt_id" className="font-weight-bold pb-2">
                  Mã đơn nhập
                </label>
                <input
                  type="text"
                  name="receipt_id"
                  className="form-control"
                  placeholder="Mã đơn nhập"
                  onChange={onHandleChange}
                  required={true}
                />
              </div>
            </div>
            <div className="col-6 ps-2">
              <div className="form-group pt-1">
                <label htmlFor="date" className="font-weight-bold pb-2">
                  Thời gian nhập{" "}
                  <small className="text-muted font-weight-normal">
                    (Tháng/Ngày/Năm)
                  </small>
                </label>
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  required={true}
                  onChange={onHandleChange}
                />
              </div>
            </div>
          </div>
          <table className="table mt-4 border" id="bangthemhang">
            <thead className="table-secondary">
              <tr>
                <th>Tên sách</th>
                <th>Tác giả</th>
                <th>Thể loại</th>
                <th>Số lượng nhập</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {receipt.length !== 0 ? (
                receipt.map((item) => (
                  <tr key={`receipt-${item.book_id}`}>
                    <td>{item.title}</td>
                    <td>{item.authors}</td>
                    <td>{item.genre}</td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "65px", textAlign: "center" }}
                        defaultValue={item.quantity}
                        onChange={(e) =>
                          setReceipt(
                            receipt.map((x) =>
                              x.book_id === item.book_id
                                ? { ...item, quantity: Number(e.target.value) }
                                : x
                            )
                          )
                        }
                      />
                    </td>
                    <td>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                        className="pointer"
                        onClick={() => removeFromReceipt(item)}
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M19 13H5v-2h14v2z" />
                      </svg>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Chưa có sản phẩm nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mb-2">
            <input
              type="button"
              className="btn btn-primary w-100"
              value="Nhập hàng"
              data-bs-toggle="modal"
              data-bs-target="#addNewReceiptModal"
            />
          </div>
        </div>
        <Modal
          id="addNewReceiptModal"
          label="addNewReceiptModalLabel"
          title="Xác nhận thêm đơn nhập"
          text="Bạn đồng ý muốn thêm đơn nhập này chứ?"
          closeBtn="Hủy bỏ"
          saveBtn="Đồng ý"
        />
      </form>
    </div>
  );
}
