import Axios from "axios";
import { useState, useEffect, Fragment } from "react";
import Modal from "../Components/Modal";
export default function Staffs(props) {
  const { search, jobs, getStaffs, staffs, getPage } = props;
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [staffInfo, setStaffInfo] = useState({
    user_id: 0,
    password: "",
    confirmPassword: "",
  });

  const getTotalStaff = () => {
    Axios.post("http://localhost:3001/admin/staff/get-total-staff", {
      query: search,
    }).then((res) => {
      setTotalPage(Math.ceil(res.data[0].total / 5));
    });
  };

  const changePage = (page) => {
    setPage(page);
    getPage(page);
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    getStaffs();
    getTotalStaff();
  }, [search, page]);

  const changeJob = (user_id, job_id) => {
    const data = { user_id: user_id, job_id: job_id };
    Axios.post("http://localhost:3001/admin/staff/change-job", data).then(
      (res) => {
        getStaffs();
      }
    );
  };

  const changeStaffPassword = (event) => {
    event.preventDefault();
    const data = {
      user_id: staffInfo.user_id,
      password: staffInfo.password,
    };
    Axios.post(
      "http://localhost:3001/admin/staff/change-staff-password",
      data
    ).then((response) => {
      let alert = document.getElementById(`alert_${data.user_id}`);
      if (response.data.message === "success") {
        alert.innerHTML =
          '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Thành công!</strong> Bạn đã thay đổi mật khẩu thành công <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"/></div>';
      } else {
        alert.innerHTML =
          '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Thất bại!</strong> Đã có lỗi xảy ra, vui lòng kiểm tra và thử lại sau <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"/></div>';
      }
    });
  };

  const deleteStaff = (user_id) => {
    Axios.post("http://localhost:3001/admin/staff/delete-staff", {
      user_id: user_id,
    }).then((response) => {
      console.log(response.data.message);
      if (response.data.message === "success") {
        getStaffs();
        getTotalStaff();
      }
    });
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
    <div className="mt-3" id="staffs">
      <table className="table pt-4 border">
        <thead className="table-secondary">
          <tr>
            <th>#</th>
            <th>Họ và tên</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Tên tài khoản</th>
            <th style={{ width: "200px" }} className="text-center">
              Công việc
            </th>
            <th className="text-center">Đôi mật khẩu</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {staffs.map((staff, i) => (
            <Fragment key={`staff-${staff.user_id}`}>
              <tr className="border-bottom">
                <td className="font-weight-bold">
                  {(i += (page - 1) * 4) + 1}
                </td>
                <td style={{ width: "140px" }}>{staff.name}</td>
                <td style={{ width: "140px" }}>{staff.phone}</td>
                <td>{`${staff.address}, ${staff.tt_name}, ${staff.qh_name}, ${staff.tp_name}`}</td>
                <td className="font-weight-bold">{staff.username}</td>
                <td style={{ width: "200px" }}>
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {staff.job}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {jobs.map((job) => (
                        <li key={`${staff.user_id}-job-${job.job_id}`}>
                          <a
                            className={`dropdown-item ${
                              staff.job_id === job.job_id ? "active" : ""
                            }`}
                            onClick={() => changeJob(staff.user_id, job.job_id)}
                          >
                            {job.job}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </td>
                <td className="text-center">
                  <a
                    href={`#changePw-${staff.user_id}`}
                    data-bs-toggle="collapse"
                    className="btn btn-primary material-icons-outlined"
                    onClick={() => {
                      setStaffInfo({ ...staffInfo, user_id: staff.user_id });
                    }}
                  >
                    create
                  </a>
                </td>
                <td>
                  <button
                    className="btn btn-danger material-icons-outlined"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteStaffModal"
                  >
                    delete
                  </button>
                </td>
                <Modal
                  id="deleteStaffModal"
                  label="deleteStaffModalLabel"
                  title="Xác nhận xóa nhân viên"
                  text="Bạn đồng ý muốn xóa nhân viên này chứ?"
                  closeBtn="Hủy bỏ"
                  saveBtn="Đồng ý"
                  save={() => {
                    deleteStaff(staff.user_id);
                  }}
                />
              </tr>
              <tr>
                <td colSpan="8" className="p-0">
                  <div
                    className="bg-light p-4 collapse"
                    id={`changePw-${staff.user_id}`}
                    data-bs-parent="#staffs"
                  >
                    <div className="border rounded p-4 bg-white">
                      <div className="clearfix">
                        <h4 className="display-5">Thay đổi mật khẩu</h4>
                      </div>
                      <div id={`alert_${staff.user_id}`}></div>
                      <form onSubmit={changeStaffPassword}>
                        <div className="mb-2">
                          <div className="input-group">
                            <label
                              className="input-group-text font-weight-bold"
                              style={{ width: "162px" }}
                            >
                              Tên tài khoản
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              readOnly={true}
                              defaultValue={staff.username}
                            />
                          </div>
                        </div>
                        <div className="input-group mb-2">
                          <label
                            className="input-group-text font-weight-bold"
                            style={{ width: "162px" }}
                          >
                            Mật khẩu mới
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            onChange={(e) => {
                              setStaffInfo({
                                ...staffInfo,
                                password: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div className="input-group mb-2">
                          <label
                            className="input-group-text font-weight-bold"
                            style={{ width: "162px" }}
                          >
                            Xác nhận
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            onChange={(e) => {
                              setStaffInfo({
                                ...staffInfo,
                                confirmPassword: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div className="pb-0">
                          <input
                            type="button"
                            className="btn btn-primary w-100"
                            value="Thay đổi mật khẩu"
                            data-bs-toggle="modal"
                            data-bs-target="#changePasswordStaffModal"
                          />
                        </div>
                        <Modal
                          id="changePasswordStaffModal"
                          label="changePasswordStaffModalLabel"
                          title="Xác nhận thay đổi mật khẩu"
                          text="Bạn đồng ý muốn thay đổi mật khẩu cho nhân viên này chứ?"
                          closeBtn="Hủy bỏ"
                          saveBtn="Đồng ý"
                        />
                      </form>
                    </div>
                  </div>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>

      <nav aria-label="Page navigation" className="mt-4">
        <ul className="pagination justify-content-center">
          {pagination(page, totalPage)}
        </ul>
      </nav>
    </div>
  );
}
