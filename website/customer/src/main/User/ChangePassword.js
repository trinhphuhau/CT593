import { useState } from "react";
export default function ChangePassword(props) {
  const {
    onChangePassword,
    getChangePasswordInfo,
    loginSuccessForm,
    changePasswordMessage,
    clearErrorMessage,
  } = props;

  const [changePasswordInfo, setChangePasswordInfo] = useState({
    password_old: "",
    password_new: "",
    password_confirm: "",
  });

  const onHandleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setChangePasswordInfo({ ...changePasswordInfo, [name]: value });
    getChangePasswordInfo({ ...changePasswordInfo, [name]: value });
  };

  const clearRedError = () => {
    const chpwInput = document.querySelectorAll("#change-password-form input");
    for (var i = 0; i < chpwInput.length; i++) {
      chpwInput[i].classList.remove("error");
    }
  };

  const onChangePasswordSubmit = (e) => {
    e.preventDefault();
    clearErrorMessage("password-error-message");
    clearRedError()
    let ok1 = true;
    let ok2 = true;
    let ok3 = true;
    let ok4 = true;
    const errorMessage = document.getElementsByClassName(
      "password-error-message"
    );
    const chpwInput = document.querySelectorAll("#change-password-form input");
    if (changePasswordInfo.password_old === "") {
      errorMessage[0].innerHTML = "Vui lòng nhập mật khẩu cũ";
      chpwInput[0].classList.add("error");
      ok1 = false;
    }
    if (changePasswordInfo.password_new === "") {
      errorMessage[1].innerHTML = "Vui lòng nhập mật khẩu mới";
      chpwInput[1].classList.add("error");
      ok2 = false;
    }
    if (changePasswordInfo.password_confirm === "") {
      errorMessage[2].innerHTML = "Vui lòng xác nhận lại mật khẩu";
      chpwInput[2].classList.add("error");
      ok3 = false;
    }
    if (
      changePasswordInfo.password_confirm !== changePasswordInfo.password_new
    ) {
      errorMessage[2].innerHTML = "Mật khẩu xác nhận không khớp";
      chpwInput[1].classList.add("error");
      chpwInput[2].classList.add("error");
      ok4 = false;
    }
    if (ok1 && ok2 && ok3 && ok4) {
      onChangePassword(e);
    }
  };

  return (
    <div id="change-password-form">
      <form onSubmit={onChangePasswordSubmit}>
        <h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="25px"
            viewBox="0 0 25 25"
            width="25px"
            fill="#000000"
            onClick={() => loginSuccessForm("change-password-form")}
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          <span>Thay đổi mật khẩu</span>
        </h2>
        <div>
          <input
            type="password"
            name="password_old"
            placeholder="Mật khẩu cũ"
            onChange={onHandleChange}
          />
          <div className="password-error-message"></div>
        </div>
        <div>
          <input
            type="password"
            name="password_new"
            placeholder="Mật khẩu mới"
            onChange={onHandleChange}
          />
          <div className="password-error-message"></div>
        </div>
        <div>
          <input
            type="password"
            name="password_confirm"
            placeholder="Xác nhận lại"
            onChange={onHandleChange}
          />
          <div className="password-error-message">
            {changePasswordMessage !== "" ? changePasswordMessage : ""}
          </div>
        </div>
        <button type="submit">Thay đổi mật khẩu</button>
      </form>
      <div className="return-mobile-button">
        <button onClick={() => loginSuccessForm("change-password-form")}>
          Quay lại
        </button>
      </div>
    </div>
  );
}
