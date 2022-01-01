import { useEffect, useState } from "react";
export default function Register(props) {
  const {
    onRegister,
    getRegisterInfo,
    toggleFormAccount,
    clearErrorMessage,
    registerMessage,
    getLoginInfo,
    getFavorite,
    onAddFavorite,
  } = props;

  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const onHandleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setRegisterInfo({ ...registerInfo, [name]: value });
    getRegisterInfo({ ...registerInfo, [name]: value });
  };

  const clearRedError = () => {
    const input = document.querySelectorAll("#account-create input");
    for (var i = 0; i < input.length; i++) {
      input[i].classList.remove("error");
    }
  };

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    clearRedError();
    clearErrorMessage("register-error-message");
    const registerInput = document.querySelectorAll("#account-create input");
    const errorMessage = document.getElementsByClassName(
      "register-error-message"
    );
    let ok1 = true;
    let ok2 = true;
    let ok3 = true;
    let ok4 = true;
    let ok5 = true;
    if (registerInfo.name === "") {
      errorMessage[0].innerHTML = "Vui lòng nhập đầy đủ họ tên";
      registerInput[0].classList.add("error");
      ok1 = false;
    }
    if (registerInfo.username === "") {
      errorMessage[1].innerHTML = "Vui lòng nhập tên đăng nhập";
      registerInput[1].classList.add("error");
      ok2 = false;
    }
    if (registerInfo.password === "") {
      errorMessage[2].innerHTML = "Vui lòng nhập mật khẩu";
      registerInput[2].classList.add("error");
      ok3 = false;
    }
    if (registerInfo.confirmPassword === "") {
      errorMessage[3].innerHTML = "Vui lòng xác nhận lại mật khẩu";
      registerInput[3].classList.add("error");
      ok4 = false;
    }
    if (registerInfo.password !== registerInfo.confirmPassword) {
      registerInput[2].classList.add("error");
      registerInput[3].classList.add("error");
      errorMessage[3].innerHTML = "Mật khẩu xác nhận không khớp";
      ok5 = false;
    }
    if (ok1 && ok2 && ok3 && ok4 && ok5) {
      getLoginInfo({
        username: registerInfo.username,
        password: registerInfo.password,
      });
      onRegister(e);
    }
  };

  const [genre, setGenre] = useState([]);
  const selectGenre = (i, g) => {
    const genres = document.querySelectorAll("#selectGenre > span.color-test");
    genres[i].classList.toggle("active");
    const exist = genre.find((x) => x === g);
    if (!exist) {
      setGenre((genre) => [...genre, g]);
    } else {
      setGenre(genre.filter((x) => x !== g));
    }
  };

  useEffect(() => {
    getFavorite(genre);
  }, [genre]);

  return (
    <div className="user-account-create" id="account-create">
      <div id="user-create-account">
        <h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="25px"
            viewBox="0 0 25 25"
            width="25px"
            fill="#000000"
            onClick={toggleFormAccount}
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          <span>Tạo tài khoản</span>
        </h2>
        <form onSubmit={onRegisterSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              onChange={onHandleChange}
            />
            <div className="register-error-message"></div>
          </div>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
              onChange={onHandleChange}
            />
            <div className="register-error-message"></div>
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              onChange={onHandleChange}
            />
            <div className="register-error-message"></div>
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              onChange={onHandleChange}
            />
            <div className="register-error-message">
              {registerMessage !== "success" && registerMessage}
            </div>
          </div>
          <button type="submit">Tạo tài khoản</button>
        </form>
        <div className="return-mobile-button">
          <button onClick={toggleFormAccount}>Quay lại</button>
        </div>
      </div>
      <div className="hide" id="user-favorite">
        <h2>Sở thích của bạn</h2>
        <div>
          <div className="select-genre" id="selectGenre">
            <span
              className="color-test"
              onClick={() => {
                selectGenre(0, "gd");
              }}
            >
              Gia đình
            </span>
            <span
              className="color-test"
              onClick={() => {
                selectGenre(1, "xh");
              }}
            >
              Văn hóa - Xã hội
            </span>
            <span
              className="color-test"
              onClick={() => {
                selectGenre(2, "kn");
              }}
            >
              Kỹ năng
            </span>
            <span
              className="color-test"
              onClick={() => {
                selectGenre(3, "vh");
              }}
            >
              Văn học
            </span>
            <span
              className="color-test"
              onClick={() => {
                selectGenre(4, "tn");
              }}
            >
              Thiếu nhi
            </span>
            <span
              className="color-test"
              onClick={() => {
                selectGenre(5, "kd");
              }}
            >
              Kinh doanh
            </span>
          </div>
          <div className="select-genre-text">
            Hãy cho chúng tôi biết bạn đang có
            <br />
            hứng thú với những thể loại nào nhé!
          </div>
          <button
            type="submit"
            className="select-genre-submit"
            onClick={(e) => {
              onAddFavorite(e, true);
            }}
          >
            Xác nhận
          </button>
          <div
            className="skip"
            onClick={(e) => {
              onAddFavorite(e, false);
            }}
          >
            Bỏ qua
          </div>
        </div>
      </div>
    </div>
  );
}
