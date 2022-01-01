import { useState, useEffect } from "react";
import Axios from "axios";
import Modal from "../Components/Modal";
export default function AddNewStaff(props) {
  const { jobs, getStaffs } = props;
  const [cityList, setCityList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [townList, setTownList] = useState([]);
  const [newStaffInfo, setNewStaffInfo] = useState({
    name: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    matp: "0",
    maqh: "0",
    xaid: "0",
    job_id: "ad",
  });

  const onChangeCity = (event) => {
    setNewStaffInfo({ ...newStaffInfo, matp: event.target.value });
    getDistrictList(event.target.value);
  };

  const onChangeDistrict = (event) => {
    setNewStaffInfo({ ...newStaffInfo, maqh: event.target.value });
    getTownList(event.target.value);
  };

  const onChangeTown = (event) => {
    setNewStaffInfo({ ...newStaffInfo, xaid: event.target.value });
  };

  const onHandleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setNewStaffInfo({ ...newStaffInfo, [name]: value });
  };

  const getCityList = () => {
    Axios.get("http://localhost:3001/get-city").then((response) => {
      setCityList(response.data);
    });
  };

  const getDistrictList = (matp) => {
    Axios.post("http://localhost:3001/get-district", { matp: matp }).then(
      (response) => {
        setDistrictList(response.data);
      }
    );
  };

  const getTownList = (maqh) => {
    Axios.post("http://localhost:3001/get-town", { maqh: maqh }).then(
      (response) => {
        setTownList(response.data);
      }
    );
  };

  const onAddNewStaff = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3001/admin/staff/add-new-staff", {
      data: newStaffInfo,
    }).then((res) => {
      let alert = document.getElementById(`alert_newstaff`);
      if (res.data.message === "success") {
        getStaffs();
        event.target.reset();
        setNewStaffInfo({
          name: "",
          phone: "",
          username: "",
          password: "",
          address: "",
          matp: "0",
          maqh: "0",
          xaid: "0",
          job_id: "ad",
        });
        alert.innerHTML =
          '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Thành công!</strong> Bạn đã thêm nhân viên mới thành công <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"/></div>';
      } else {
        alert.innerHTML =
          '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Thất bại!</strong> Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"/></div>';
      }
    });
  };

  useEffect(() => {
    getCityList();
  }, []);

  return (
    <div className="border rounded bg-white mb-4 collapse" id="addNewStaff">
      <div className="px-5 py-4">
        <h1 className="display-2">Thêm nhân viên</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
          className="close-btn"
          data-bs-toggle="collapse"
          data-bs-target="#addNewStaff"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
      </div>
      <div className="row p-5 pt-0">
        <div className="col-12 pb-2" id="alert_newstaff"></div>
        <form onSubmit={onAddNewStaff}>
          <div className="row pb-3">
            <div className="col-6 pe-2">
              <label className="form-label" htmlFor="name">
                Họ và tên
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Họ và tên"
                onChange={onHandleChange}
              />
            </div>
            <div className="col-6 ps-2">
              <label className="form-label" htmlFor="phone">
                Số điện thoại
              </label>
              <input
                type="text"
                className="form-control"
                name="phone"
                placeholder="Số điện thoại"
                onChange={onHandleChange}
              />
            </div>
          </div>
          <div className="row pb-3">
            <div className="col-6 pe-2">
              <label className="form-label" htmlFor="username">
                Tên tài khoản
              </label>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Tên tài khoản"
                onChange={onHandleChange}
              />
            </div>
            <div className="col-6 ps-2">
              <label className="form-label" htmlFor="password">
                Mật khẩu
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Mật khẩu"
                onChange={onHandleChange}
              />
            </div>
          </div>
          <div className="row pb-3">
            <div className="col-12 pb-3">
              <label className="form-label" htmlFor="address">
                Địa chỉ
              </label>
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder="Số nhà, tên đường,..."
                onChange={onHandleChange}
              />
            </div>
            <div className="col-4 pe-2">
              <select
                className="form-select"
                name="matp"
                onChange={onChangeCity}
              >
                <option value="">Tỉnh/Thành phố</option>
                {cityList.map((item) => (
                  <option value={item.matp} key={item.matp}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-4 pe-2 ps-2">
              <select
                className="form-select"
                name="maqh"
                onChange={onChangeDistrict}
              >
                <option value="">Quận/Huyện</option>
                {districtList.map((item) => (
                  <option value={item.maqh} key={item.maqh}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-4 ps-2">
              <select
                className="form-select"
                name="xaid"
                onChange={onChangeTown}
              >
                <option value="">Xã/Phường/Thị trấn</option>
                {townList.map((item) => (
                  <option value={item.xaid} key={item.xaid}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row pb-3">
            <div className="col-12">
              <label className="form-label" htmlFor="job">
                Công việc
              </label>
              <select
                className="form-select"
                name="job_id"
                defaultValue="ad"
                onChange={onHandleChange}
              >
                {jobs.map((job) => (
                  <option value={job.job_id} key={job.job_id}>
                    {job.job}
                  </option>
                ))}
              </select>
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
                value="Thêm nhân viên"
                data-bs-toggle="modal"
                data-bs-target="#addNewStaffModal"
              />
            </div>
          </div>
          <Modal
            id="addNewStaffModal"
            label="addNewStaffModalLabel"
            title="Xác nhận thêm nhân viên"
            text="Bạn đồng ý muốn thêm nhân viên này chứ?"
            closeBtn="Hủy bỏ"
            saveBtn="Đồng ý"
          />
        </form>
      </div>
    </div>
  );
}
