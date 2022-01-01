import "./App.css";
import CardInfo from "./Components/CardInfo";
import CardToday from "./Components/CardToday";
import Menu from "./Components/Menu";
import Products from "./Product/Product";
import Inventory from "./Inventory/Inventory";
import Orders from "./Orders/Orders";
import Staffs from "./Staff/Staffs";
import Customers from "./Customer/Customers";
import Review from "./Review/Review";
import Message from "./Message/Message";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Chart from "./Components/Chart";
import Recent from "./Components/Recent";
import Promotion from "./Promotion/Promotion";
// import Login from "./Components/Login";
import Axios from "axios";
import { useEffect, useState } from "react";

import "./Components/style.css";

function App() {
  const [userAccount, setUserAccount] = useState({
    username: "",
    password: "",
  });
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || {
      user_id: "",
      name: "",
      username: "",
      job_id: "",
    }
  );
  const [adminLoginStatus, setAdminLoginStatus] = useState(
    JSON.parse(localStorage.getItem("adminLoginStatus")) || false
  );
  const onSubmitLogin = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/admin/login", {
      username: userAccount.username,
      password: userAccount.password,
    }).then((res) => {
      setUserAccount({
        username: "",
        password: "",
      });
      setAdminLoginStatus(true);
      setUserInfo(res.data.result[0]);
      localStorage.setItem("userInfo", JSON.stringify(res.data.result[0]));
      localStorage.setItem("adminLoginStatus", true);
    });
  };
  const onLogout = () => {
    setAdminLoginStatus(false);
    setUserInfo({
      user_id: "",
    });
    localStorage.setItem("userInfo", null);
    localStorage.setItem("adminLoginStatus", false);
  };
  return (
    <div className="App">
      {adminLoginStatus === false && userInfo.user_id === "" && (
        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 text-center mb-5">
                <h2 className="heading-section display-3">Trang quản lý</h2>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-7 col-lg-4">
                <div className="login-wrap p-4 p-md-5">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <span className="fa fa-user-o"></span>
                  </div>
                  <h3 className="text-center mb-4">Đăng nhập</h3>
                  <form onSubmit={(e) => onSubmitLogin(e)} className="login-form">
                    <div className="form-group login-form-group">
                      <input
                        type="text"
                        className="form-control rounded-left"
                        placeholder="Username"
                        onChange={(e) =>
                          setUserAccount({
                            ...userAccount,
                            username: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="form-group login-form-group">
                      <input
                        type="password"
                        className="form-control rounded-left"
                        placeholder="Password"
                        onChange={(e) =>
                          setUserAccount({
                            ...userAccount,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="form-group login-form-group">
                      <button
                        type="submit"
                        className="form-control btn btn-primary rounded submit px-3"
                      >
                        Đăng nhập
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {adminLoginStatus === true && userInfo.user_id !== "" && (
        <div>
          <header>
            <div className="container-fluid bg-primary">
              <div className="nav-info">
                <div className="text-end text-light">
                  <span
                    className="material-icons"
                    id="signout"
                    onClick={onLogout}
                  >
                    logout
                  </span>
                </div>
              </div>
            </div>
          </header>
          <section>
            <div className="row">
              <BrowserRouter>
                <Menu />
                <div className="col-10 bg-light wrapper p-4">
                  <Switch>
                    <Route exact path="/">
                      <CardToday />
                      <CardInfo />
                      <Chart />
                      <Recent />
                    </Route>
                    <Route exact path="/products">
                      <Products />
                    </Route>
                    <Route exact path="/inventory">
                      <Inventory />
                    </Route>
                    <Route exact path="/orders">
                      <Orders />
                    </Route>
                    <Route exact path="/staffs">
                      <Staffs />
                    </Route>
                    <Route exact path="/customers">
                      <Customers />
                    </Route>
                    <Route exact path="/review">
                      <Review />
                    </Route>
                    <Route exact path="/promotion">
                      <Promotion />
                    </Route>
                    <Route exact path="/messages">
                      <Message />
                    </Route>
                  </Switch>
                </div>
              </BrowserRouter>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
