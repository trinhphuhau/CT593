import Axios from "axios";
import { useState } from "react";
import folderImg from "../images/folderImg.png";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Modal from "../Components/Modal";

export default function AddNewProduct(props) {
  const { getBookData } = props;
  const [image, setImage] = useState("");
  const [isUploadedImg, setIsUploadedImg] = useState(false);
  const [newBook, setNewBook] = useState({
    authors: "",
    average_rating: 0,
    book_id: 0,
    description: "",
    genre_id: "gd",
    id: 0,
    image_url: "",
    original_publication_year: "",
    price: 0,
    price_tag: 0,
    publisher: "",
    ratings_1: 0,
    ratings_2: 0,
    ratings_3: 0,
    ratings_4: 0,
    ratings_5: 0,
    ratings_count: 0,
    title: "",
    work_id: 0,
    status: 0,
    image: [],
  });

  const onHandleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setNewBook({ ...newBook, [name]: value });
  };

  const onHandleImgChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result);
        setIsUploadedImg(true);
      };

      setNewBook({ ...newBook, image: e.target.files[0] });

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onAddNewProduct = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", newBook.image);
    data.append("title", newBook.title);
    data.append("authors", newBook.authors);
    data.append("price_tag", newBook.price_tag);
    data.append("price", newBook.price);
    data.append("genre_id", newBook.genre_id);
    data.append("status", newBook.status);
    data.append("publisher", newBook.publisher);
    data.append("description", newBook.description);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    Axios.post(
      "http://localhost:3001/admin/product/add-new-product",
      data,
      config
    ).then((res) => {
      let alert = document.getElementById(`alert_newbook`);
      if (res.data.message === "success") {
        getBookData();
        e.target.reset();
        setNewBook({
          authors: "",
          average_rating: 0,
          book_id: 0,
          description: "",
          genre_id: "gd",
          id: 0,
          image_url: "",
          original_publication_year: "",
          price: 0,
          price_tag: 0,
          publisher: "",
          ratings_1: 0,
          ratings_2: 0,
          ratings_3: 0,
          ratings_4: 0,
          ratings_5: 0,
          ratings_count: 0,
          title: "",
          work_id: 0,
          status: 0,
          image: [],
        });
        setIsUploadedImg(false);
        alert.innerHTML =
          '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Thành công!</strong> Bạn đã thêm sản phẩm mới thành công <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"/></div>';
      } else {
        alert.innerHTML =
          '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Thất bại!</strong> Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"/></div>';
      }
    });
  };

  return (
    <div className="border rounded bg-white mb-4 collapse" id="addNewProduct">
      <div className="px-5 py-4">
        <h1 className="display-2 mb-3">Sản phẩm mới</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
          className="close-btn"
          data-bs-toggle="collapse"
          data-bs-target="#addNewProduct"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
        <form onSubmit={onAddNewProduct} className="row p-4">
          <div className="col-12 pb-2" id="alert_newbook"></div>
          <div className="row">
            <div className="col-4 pl-0">
              <div className="productImg">
                <label htmlFor="newProduct">
                  <div className="productImg-input">
                    {!isUploadedImg ? (
                      <img
                        src={folderImg}
                        className="detail_img rounded productImg1"
                        alt=""
                        draggable={false}
                      />
                    ) : (
                      <img
                        src={image}
                        className="detail_img rounded productImg1"
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
                  id="newProduct"
                  accept=".png, .jpg, .jpeg"
                  onChange={onHandleImgChange}
                />
              </div>
            </div>
            <div className="col-8">
              <div className="row mb-4">
                <div className="col-12 pe-2">
                  <label className="form-label" htmlFor="title">
                    Tên sách
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Tên sách"
                    onChange={onHandleChange}
                  />
                  <div className="invalid-feedback">Vui lòng nhập tên sách</div>
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
                    placeholder="Tác giả"
                    onChange={onHandleChange}
                  />
                </div>
                <div className="col-2 ps-3 pe-0">
                  <label className="form-label" htmlFor="price_tag">
                    Giá bìa (₫)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="price_tag"
                    placeholder="Price"
                    onChange={onHandleChange}
                  />
                </div>
                <div className="col-2 ps-2">
                  <label className="form-label" htmlFor="price">
                    Giá bán (₫)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    placeholder="Price"
                    onChange={onHandleChange}
                  />
                </div>
              </div>
              <div className="row mb-4 mt-2">
                <div className="col-6 pe-2">
                  <label className="form-label" htmlFor="genre_id">
                    Thể loại
                  </label>
                  <select
                    className="form-select"
                    name="genre_id"
                    defaultValue="gd"
                    onChange={onHandleChange}
                  >
                    <option value="gd">Gia đình</option>
                    <option value="kd">Kinh doanh</option>
                    <option value="kn">Kỹ năng</option>
                    <option value="tn">Thiếu nhi</option>
                    <option value="vh">Văn học</option>
                    <option value="xh">Xã hội</option>
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
                    placeholder="Nhà xuất bản"
                    onChange={onHandleChange}
                  />
                </div>
              </div>
              <CKEditor
                editor={ClassicEditor}
                config={{ placeholder: "Mô tả của sản phẩm..." }}
                data=""
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setNewBook({ ...newBook, description: data });
                }}
              />
              <div className="row mt-4">
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#addNewProductModal"
                  >
                    Thêm sản phẩm mới
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Modal
            id="addNewProductModal"
            label="addNewProductModalLabel"
            title="Xác nhận thêm sản phẩm"
            text="Bạn đồng ý muốn thêm sản phẩm này chứ?"
            closeBtn="Hủy bỏ"
            saveBtn="Đồng ý"
          />
        </form>
      </div>
    </div>
  );
}
