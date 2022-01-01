export default function AddNewPromotion() {
  return (
    <div
      className="border rounded bg-white mb-4 collapse"
      id="addNewReceipt"
      style={{}}
    >
      <div className="px-5 py-4">
        <h1 className="display-2 mb-3">Thêm khuyến mãi</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
          className="close-btn"
          data-bs-toggle="collapse"
          data-bs-target="#addNewReceipt"
          aria-expanded="true"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
        <div className="row pt-0">
          <div className="col-12 pb-2" id="alert_newstaff" />
          <form>
            <div className="row pb-3">
              <div className="col-4 pe-2">
                <label className="form-label" htmlFor="voucher">
                  Mã giảm giá
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="voucher"
                  placeholder="Mã giảm giá"
                />
              </div>
              <div className="col-2 pe-2">
                <label className="form-label" htmlFor="voucher">
                  Số lượng
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="voucher"
                  defaultValue="0"
                />
              </div>  
              <div className="col-2 ps-2">
                <label className="form-label" htmlFor="value">
                  Loại giảm
                </label>
                <select className="form-select" name="status_id">
                  <option value="cxn">Tiền (₫)</option>
                  <option value="clh">Phần trăm (%)</option>
                </select>
              </div>
              <div className="col-2 ps-2">
                <label className="form-label" htmlFor="value">
                  Giá trị
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="value"
                  placeholder="Giá trị"
                />
              </div>
              <div className="col-2 ps-2">
                <label className="form-label" htmlFor="maxValue">
                  Tối đa (₫)
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="maxValue"
                  placeholder="Giá trị tối đa"
                />
              </div>
            </div>
            <div className="row pb-3">
              <div className="col-6 pe-2">
                <label htmlFor="created_date" className="form-label">
                  Thời gian bắt đầu{" "}
                  <small className="text-muted font-weight-normal">
                    (Tháng/Ngày/Năm)
                  </small>
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="created_date"
                />
              </div>
              <div className="col-6 ps-2">
                <label htmlFor="expired_date" className="form-label">
                  Thời gian kết thúc{" "}
                  <small className="text-muted font-weight-normal">
                    (Tháng/Ngày/Năm)
                  </small>
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="expired_date"
                />
              </div>
            </div>
            <div className="row pb-3">
              <div className="col-12">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Sự kiện chính
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div className="row pb-3">
              <div className="col-6 pe-2">
                <input
                  type="reset"
                  className="btn btn-secondary w-100"
                  value="Làm mới"
                />
              </div>
              <div className="col-6 ps-2">
                <input
                  type="button"
                  className="btn btn-primary w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#addNewStaffModal"
                  defaultValue="Thêm khuyến mãi"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
