import Axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ChangeInfo from "./ChangeInfo";
import ChangePassword from "./ChangePassword";
import Login from "./Login";
import Register from "./Register";

const loginStatusFromLocalStorage = JSON.parse(
  localStorage.getItem("loginStatus") || false
);

const customerInfoFromLocalStorage = JSON.parse(
  localStorage.getItem("customerInfo")
);

function LoginForm(props) {
  const { getCustomerInfo } = props;

  const [customerInfo, setCustomerInfo] = useState(
    customerInfoFromLocalStorage || {
      name: "",
      password: "",
      phone: "",
      user_id: 0,
      username: "",
      matp: "",
      maqh: "",
      xaid: "",
      favorite: "",
    }
  );

  const [loginStatus, setLoginStatus] = useState(loginStatusFromLocalStorage);

  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const getRegisterInfo = (data) => {
    setRegisterInfo(data);
  }; //Nhan thong tin nhap tu Register
  const [registerMessage, setRegisterMessage] = useState("");
  const onRegister = (e) => {
    e.preventDefault();
    const data = {
      name: registerInfo.name,
      username: registerInfo.username,
      password: registerInfo.password,
    };
    Axios.post("http://localhost:3001/register", data).then((res) => {
      setRegisterMessage("");
      if (res.data.message === "success") {
        document.getElementById("user-favorite").classList.toggle("hide");
        document.getElementById("user-create-account").classList.toggle("hide");
        // onLogin(e);
      } else {
        setRegisterMessage(res.data.message);
      }
    });
  };

  const [favorite, setFavorite] = useState();
  const getFavorite = (data) => {
    setFavorite(data);
  };

  const onAddFavorite = (e, option) => {
    option === true
      ? Axios.post("http://localhost:3001/add-favorite", {
          favorite: favorite,
          username: loginInfo.username,
        }).then((res) => {
          if (res.data.message === "success") {
            onLogin(e);
          } else {
            setRegisterMessage(res.data.message);
          }
        })
      : onLogin(e);
  };

  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const getLoginInfo = (data) => {
    setLoginInfo(data);
  };
  const [loginMessage, setLoginMessage] = useState("");
  const onLogin = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      username: loginInfo.username,
      password: loginInfo.password,
    }).then((response) => {
      setLoginMessage("");
      if (response.data.result) {
        setLoginStatus(true);
        setLoginMessage(response.data.message);
        setCustomerInfo(response.data.result[0]);
        getCustomerInfo(response.data.result[0]);
        localStorage.setItem("accessToken", response.data.accessToken);
      } else {
        setLoginMessage(response.data.message);
      }
    });
  };

  const onLogout = () => {
    setLoginStatus(false);
    localStorage.removeItem("customerInfo");
    localStorage.removeItem("accessToken");
    setCustomerInfo({
      address: "",
      name: "",
      password: "",
      phone: "",
      user_id: 0,
      username: "",
      matp: "",
      maqh: "",
      xaid: "",
      favorite: "",
    });
    getCustomerInfo({
      address: "",
      name: "",
      password: "",
      phone: "",
      user_id: 0,
      username: "",
      matp: "",
      maqh: "",
      xaid: "",
      favorite: "",
    });
  };

  const [changePasswordInfo, setChangePasswordInfo] = useState({
    password_old: "",
    password_new: "",
    password_confirm: "",
  });
  const getChangePasswordInfo = (data) => {
    setChangePasswordInfo(data);
  }; //Nhan thong tin nhap tu ChangePassword
  const [changePasswordMessage, setChangePasswordMessage] = useState("");
  const onChangePassword = (e) => {
    e.preventDefault();
    const data = {
      password_old: changePasswordInfo.password_old,
      password_new: changePasswordInfo.password_new,
      user_id: customerInfo.user_id,
    };
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };
    Axios.post("http://localhost:3001/change-password", data, config).then(
      (response) => {
        setChangePasswordMessage("");
        if (response.data.message === "") {
          e.target.reset();
          setChangePasswordInfo({
            password_old: "",
            password_new: "",
            password_confirm: "",
          });
          clearErrorMessage("password-error-message");
          setChangePasswordMessage("Thay đổi mật khẩu thành công");
        } else {
          setChangePasswordMessage(response.data.message);
        }
      }
    );
  };

  const [changeInfo, setChangeInfo] = useState(customerInfo);
  const getChangeInfo = (data) => {
    setChangeInfo(data);
  }; //Nhan thong tin nhap tu ChangeInfo
  const [changeInfoMessage, setChangeInfoMessage] = useState("");
  const onChangeInfo = (e) => {
    e.preventDefault();
    const data = {
      name: changeInfo.name,
      phone: changeInfo.phone,
      address: changeInfo.address,
      matp: changeInfo.matp,
      maqh: changeInfo.maqh,
      xaid: changeInfo.xaid,
      user_id: customerInfo.user_id,
    };
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };
    Axios.post("http://localhost:3001/change-info", data, config).then(
      (response) => {
        e.target.reset();
        setCustomerInfo(changeInfo);
        setChangeInfoMessage(response.data.message);
      }
    );
  };

  const toggleFormAccount = () => {
    document.getElementById("account-login").classList.toggle("hide");
    document.getElementById("account-create").classList.toggle("show");
  };

  const loginSuccessForm = (form) => {
    document.getElementById("login-success-form").classList.toggle("hide");
    document
      .getElementsByClassName("login-success-button")[0]
      .classList.toggle("hide");
    document
      .getElementsByClassName("login-success-welcome")[0]
      .classList.toggle("hide");
    document
      .getElementsByClassName("logout-button")[0]
      .classList.toggle("hide");
    document.getElementById(form).classList.toggle("show");
  };

  const showFormAccount = () => {
    document.getElementById("overlay").classList.toggle("active");
    document.getElementById("userAccount").classList.toggle("active");
  };

  useEffect(() => {
    localStorage.setItem("loginStatus", loginStatus);
  }, [loginStatus]);

  useEffect(() => {
    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
  }, [customerInfo]);

  const clearErrorMessage = (className) => {
    const errorMessage = document.getElementsByClassName(className);
    for (var i = 0; i < errorMessage.length; i++) {
      errorMessage[i].innerHTML = "";
    }
  };

  return (
    <div className="user-account" id="userAccount">
      <div className="close-button" onClick={showFormAccount}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
      </div>
      <a href="/" className="logo-mobile">
        <img
          src="/static/media/logo.15cb513a.png"
          alt="Logo"
          className="logo"
        />
      </a>
      <div className="user-account-form">
        <div>
          {loginStatus === false && (
            <>
              <Login
                onLogin={onLogin}
                toggleFormAccount={toggleFormAccount}
                getLoginInfo={getLoginInfo}
                loginMessage={loginMessage}
                clearErrorMessage={clearErrorMessage}
              />

              <Register
                getFavorite={getFavorite}
                onRegister={onRegister}
                toggleFormAccount={toggleFormAccount}
                getRegisterInfo={getRegisterInfo}
                registerMessage={registerMessage}
                clearErrorMessage={clearErrorMessage}
                getLoginInfo={getLoginInfo}
                onAddFavorite={onAddFavorite}
              />
            </>
          )}
          <div
            className={`user-account-success ${
              loginStatus === true ? "active" : ""
            }`}
            id="loginSuccess"
          >
            {loginStatus === true && (
              <>
                <div className="login-success-welcome">
                  Chào <span>{customerInfo.name}</span>
                  <img
                    src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/285/red-heart_2764-fe0f.png"
                    alt=""
                  />
                </div>
                <div className="login-success-button">
                  <div id="login-success-form">
                    <Link
                      to="/order-history/all"
                      onClick={() => {
                        showFormAccount();
                        if (
                          document.querySelector(
                            ".navigation-mobile #accountNav.active"
                          )
                        ) {
                          document
                            .getElementById("accountNav")
                            .classList.remove("active");
                        }
                      }}
                    >
                      <button>Lịch sử đặt hàng</button>
                    </Link>
                    {/* <Link
                      to="/order-history/all"
                      id="orderHistory-desktop"
                      onClick={showFormAccount}
                    >
                      <button>Lịch sử đặt hàng</button>
                    </Link> */}
                    <Link
                      to="/for-you"
                      id="foryou-mobile"
                      onClick={() => {
                        document
                          .getElementById("userAccount")
                          .classList.toggle("active");
                        if (document.querySelector("#overlay.active")) {
                          document
                            .querySelector("#overlay.active")
                            .classList.toggle("active");
                        }
                        if (
                          document.querySelector(
                            ".navigation-mobile #accountNav.active"
                          )
                        ) {
                          document
                            .getElementById("accountNav")
                            .classList.toggle("active");
                        }
                      }}
                    >
                      <button>Sách dành cho bạn</button>
                    </Link>
                    <button
                      onClick={() => loginSuccessForm("change-info-form")}
                    >
                      Cập nhật thông tin
                    </button>
                    <button
                      onClick={() => loginSuccessForm("change-password-form")}
                    >
                      Thay đổi mật khẩu
                    </button>
                  </div>
                </div>
                <ChangePassword
                  onChangePassword={onChangePassword}
                  getChangePasswordInfo={getChangePasswordInfo}
                  loginSuccessForm={loginSuccessForm}
                  changePasswordMessage={changePasswordMessage}
                  clearErrorMessage={clearErrorMessage}
                />
                <ChangeInfo
                  loginSuccessForm={loginSuccessForm}
                  onChangeInfo={onChangeInfo}
                  getChangeInfo={getChangeInfo}
                  customerInfo={customerInfo}
                  changeInfoMessage={changeInfoMessage}
                />
                <div className="logout-button">
                  <button onClick={onLogout}>Đăng xuất</button>
                </div>
              </>
            )}
          </div>
        </div>
        <img
          src={
            require(loginStatus === true
              ? "../../img/pixeltrue-welcome-1.png"
              : "../../img/pixeltrue-vision-1.png").default
          }
          alt=""
          className={`loginImg active`}
        />
      </div>
    </div>
  );
}
export default LoginForm;
