import Axios from "axios";
import { useEffect, useState } from "react";
import AddNewStaff from "./AddNewStaff";
import Staff from "./Staff";

export default function Staffs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [staffs, setStaffs] = useState([]);

  const getJobs = () => {
    Axios.get("http://localhost:3001/admin/staff/get-jobs").then((response) => {
      setJobs(response.data);
    });
  };

  const getStaffs = () => {
    const data = {
      query: search,
      page: page,
    };
    Axios.post("http://localhost:3001/admin/staff/get-staffs", data).then((res) => {
      setStaffs(res.data);
    });
  };

  const getPage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    getJobs();
    getStaffs();
  }, []);
  return (
    <div className="bg-light">
      <AddNewStaff jobs={jobs} getStaffs={getStaffs} />
      <div className="px-5 py-4 border rounded bg-white">
        <h1 className="display-2 mb-3">Nhân viên</h1>
        <div className="form-group clearfix">
          <div
            className="input-group float-start"
            style={{ width: "calc(100% - 177px" }}
          >
            <div className="input-group-prepend">
              <span className="input-group-text material-icons">search</span>
            </div>
            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="Nhập tên nhân viên"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <button
            className="btn btn-success float-end"
            data-bs-toggle="collapse"
            data-bs-target="#addNewStaff"
          >
            <span className="material-icons-outlined">add</span>Thêm nhân viên
          </button>
        </div>
        <Staff
          search={search}
          jobs={jobs}
          getStaffs={getStaffs}
          staffs={staffs}
          getPage={getPage}
        />
      </div>
    </div>
  );
}
