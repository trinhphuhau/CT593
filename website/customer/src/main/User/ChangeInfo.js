import Axios from "axios";
import { useState, useEffect } from "react";

export default function ChangeInfo(props) {
  const {
    loginSuccessForm,
    onChangeInfo,
    getChangeInfo,
    customerInfo,
    changeInfoMessage,
  } = props;

  const [cityList, setCityList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [townList, setTownList] = useState([]);
  const [changeInfo, setChangeInfo] = useState(customerInfo);

  const onHandleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setChangeInfo({ ...changeInfo, [name]: value });
    getChangeInfo({ ...changeInfo, [name]: value });
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

  const onChangeCity = (event) => {
    setChangeInfo({ ...changeInfo, matp: event.target.value });
    getChangeInfo({ ...changeInfo, matp: event.target.value });
    getDistrictList(event.target.value);
  };

  const onChangeDistrict = (event) => {
    setChangeInfo({ ...changeInfo, maqh: event.target.value });
    getChangeInfo({ ...changeInfo, maqh: event.target.value });
    getTownList(event.target.value);
  };

  const onChangeTown = (event) => {
    setChangeInfo({ ...changeInfo, xaid: event.target.value });
    getChangeInfo({ ...changeInfo, xaid: event.target.value });
  };

  useEffect(() => {
    getCityList();
    setChangeInfo(customerInfo);
    if (customerInfo.matp !== "") getDistrictList(customerInfo.matp);
    if (customerInfo.maqh !== "") getTownList(customerInfo.maqh);
  }, [customerInfo]);

  return (
    <div id="change-info-form">
      <form onSubmit={onChangeInfo}>
        <h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="25px"
            viewBox="0 0 25 25"
            width="25px"
            fill="#000000"
            onClick={() => loginSuccessForm("change-info-form")}
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          <span>C???p nh???t th??ng tin</span>
        </h2>
        <div>
          <input
            type="text"
            name="name"
            placeholder="H??? v?? t??n"
            onChange={onHandleChange}
            defaultValue={customerInfo.name}
          />
          <div className="info-error-message"></div>
        </div>
        <div>
          <input
            type="text"
            name="phone"
            placeholder="S??? ??i???n tho???i"
            onChange={onHandleChange}
            defaultValue={customerInfo.phone}
          />
          <div className="info-error-message"></div>
        </div>
        <div>
          <input
            type="text"
            name="address"
            placeholder="?????a ch??? c??? th???"
            onChange={onHandleChange}
            defaultValue={customerInfo.address}
          />
          <div className="info-error-message"></div>
        </div>
        <div>
          <select name="matp" onChange={onChangeCity} value={changeInfo.matp}>
            <option value="">Ch???n t???nh/th??nh ph???</option>
            {cityList.map((city) => (
              <option value={city.matp} key={`changeInfo-${city.matp}`}>
                {city.name}
              </option>
            ))}
          </select>
          <div className="info-error-message"></div>
        </div>
        <div>
          <select
            name="maqh"
            onChange={onChangeDistrict}
            value={changeInfo.maqh}
          >
            <option>Ch???n qu???n/huy???n</option>
            {districtList.map((district) => (
              <option value={district.maqh} key={`changeInfo-${district.maqh}`}>
                {district.name}
              </option>
            ))}
          </select>
          <div className="info-error-message"></div>
        </div>
        <div>
          <select name="xaid" onChange={onChangeTown} value={changeInfo.xaid}>
            <option>Ch???n x?? ph?????ng th??? tr???n</option>
            {townList.map((town) => (
              <option value={town.xaid} key={`changeInfo-${town.xaid}`}>
                {town.name}
              </option>
            ))}
          </select>
          <div className="info-error-message">
            {changeInfoMessage !== "" ? changeInfoMessage : ""}
          </div>
        </div>
        <button type="submit">Thay ?????i th??ng tin</button>
      </form>
      <div className="return-mobile-button">
        <button onClick={() => loginSuccessForm("change-info-form")}>
          Quay l???i
        </button>
      </div>
    </div>
  );
}
