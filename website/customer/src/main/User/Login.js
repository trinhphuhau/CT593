import { useState } from "react";
export default function Login(props) {
  const {
    onLogin,
    toggleFormAccount,
    getLoginInfo,
    loginMessage,
    clearErrorMessage,
  } = props;
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const onHandleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setLoginInfo({ ...loginInfo, [name]: value });
    getLoginInfo({ ...loginInfo, [name]: value });
  };

  const clearRedError = () => {
    const chpwInput = document.querySelectorAll("#account-login input");
    for (var i = 0; i < chpwInput.length; i++) {
      chpwInput[i].classList.remove("error");
    }
  };

  const onLoginSubmit = (e) => {
    e.preventDefault();
    clearErrorMessage("login-error-message");
    clearRedError();
    const loginInput = document.querySelectorAll("#account-login input");
    const errorMessage = document.getElementsByClassName("login-error-message");
    if (loginInfo.username === "") {
      errorMessage[0].innerHTML = "Vui lòng nhập tên tài khoản";
      loginInput[0].classList.add("error");
    }
    if (loginInfo.password === "") {
      errorMessage[1].innerHTML = "Vui lòng nhập mật khẩu";
      loginInput[1].classList.add("error");
    }
    if (loginInfo.username !== "" && loginInfo.password !== "") {
      onLogin(e);
    }
  };

  return (
    <div className="user-account-login" id="account-login">
      <h2>Đăng nhập</h2>
      <form onSubmit={onLoginSubmit}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Tên đăng nhập"
            autoComplete="off"
            onChange={onHandleChange}
          />
          <div className="login-error-message"></div>
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            onChange={onHandleChange}
            autoComplete="off"
          />
        </div>
        <div className="login-error-message">
          {loginMessage !== "" ? loginMessage : ""}
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
      <div className="user-account-question">
        Chưa có tài khoản?{" "}
        <span onClick={toggleFormAccount}>Hãy đăng ký ngay</span>
      </div>
    </div>
  );
}
