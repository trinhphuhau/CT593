import { Route } from "react-router-dom";
import { useEffect, useState } from "react";
import randomstring from "randomstring";
import { useLocation } from "react-router-dom";

import "./App.css";
import "./main/Account/Account.css";

import Welcome from "./main/Welcome/Welcome";
import Info from "./main/Info/Info";
import Product from "./main/Product/Product";
import Index from "./main/Index/Index";
import Category from "./main/Category/Category";
import CheckOut from "./main/CheckOut/CheckOut";
import LoginForm from "./main/User/LoginForm";
import ForYou from "./main/ForYou/ForYou";
import Search from "./main/Search/Search";
import OrderHistory from "./main/Order/OrderHistory";
import OrderDetail from "./main/Order/OrderDetail";
import CheckOutMessage from "./main/CheckOut/CheckOutMessage";
import NavMobile from "./main/NavMobile/NavMobile";

const cartFromLocalStorage = JSON.parse(
  localStorage.getItem("cartItems") || "[]"
);

const customerInfoFromLocalStorage = JSON.parse(
  localStorage.getItem("customerInfo")
);

function App() {
  const [cartItems, setCartItems] = useState(cartFromLocalStorage);
  const [customerInfo, setCustomerInfo] = useState(
    customerInfoFromLocalStorage || {
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
    }
  );

  const getCustomerInfo = (info) => {
    setCustomerInfo(info);
  };

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.book_id === product.book_id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.book_id === product.book_id
            ? { ...exist, quantity: exist.quantity + 1 }
            : x
        )
      );
    } else {
      setCartItems((cartItems) => [
        ...cartItems,
        {
          book_id: product.book_id,
          title: product.title,
          price: product.price,
          image_url: product.image_url,
          quantity: 1,
        },
      ]);
    }
    document.getElementById("cartPopup").classList.toggle("active");
    setTimeout(function () {
      document.getElementById("cartPopup").classList.toggle("active");
    }, 1000);
  };

  const showRemoveConfirm = () => {
    document.getElementById("overlay").classList.toggle("active");
    document.getElementById("confirm_remove").classList.toggle("active");
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.book_id === product.book_id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.book_id !== product.book_id));
      showRemoveConfirm();
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.book_id === product.book_id
            ? { ...exist, quantity: exist.quantity - 1 }
            : x
        )
      );
    }
  };

  const onRemoveItem = (product) => {
    const exist = cartItems.find((x) => x.book_id === product.book_id);
    if (exist) {
      setCartItems(cartItems.filter((x) => x.book_id !== product.book_id));
    }
  };

  const onRemoveCartItems = () => {
    setCartItems([]);
  };

  const [randomKey, setRandomKey] = useState(localStorage.getItem("randomKey"));
  const getRandomKey = () => {
    if (randomKey === null || randomKey === "null") {
      localStorage.setItem("randomKey", randomstring.generate());
    }
  };

  const location = useLocation();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();

  useEffect(() => {
    if (
      query.get("failed") === localStorage.getItem("randomKey") &&
      localStorage.getItem("randomKey") !== null
    ) {
      document.getElementById("overlay").classList.toggle("active");
      document.getElementById("order-notpaying").classList.toggle("active");
      setRandomKey(null);
    } else if (
      query.get("success") === localStorage.getItem("randomKey") &&
      localStorage.getItem("randomKey") !== null
    ) {
      onRemoveCartItems();
      document.getElementById("overlay").classList.toggle("active");
      document.getElementById("order-success").classList.toggle("active");
      setRandomKey(null);
    }
  }, []);

  useEffect(() => {
    getRandomKey();
  }, [randomKey]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  
  return (
    <>
      <div className="App">
        <div className="cartPopUp" id="cartPopup">
          Thêm sản phẩm vào giỏ hàng thành công
        </div>
        <div id="overlay"></div>
        <Route exact path="/">
          <div className="container">
            <div className="left">
              <Welcome />
              <Info id="info-desktop" />
            </div>
            <div className="content">
              <Index
                onAdd={onAdd}
                cartItems={cartItems}
                customerInfo={customerInfo}
              />
            </div>
            <Info id="info-mobile" />
          </div>
        </Route>
        <Route exact path="/for-you">
          <div className="container">
            <div className="left" id="forYouApp">
              <Welcome />
              <Info id="info-desktop" />
            </div>
            <div className="content">
              <ForYou cartItems={cartItems} customerInfo={customerInfo} />
            </div>
            <Info id="info-mobile" />
          </div>
        </Route>
        <Route exact path="/product">
          <div className="container">
            <div className="left" id="productApp">
              <Welcome />
              <Info id="info-desktop" />
            </div>
            <div className="content">
              <Product
                onAdd={onAdd}
                cartItems={cartItems}
                customerInfo={customerInfo}
              />
            </div>
            <Info id="info-mobile" />
          </div>
        </Route>
        <Route exact path="/category">
          <div className="container" id="categoryApp">
            <div className="left">
              <Welcome />
              <Info id="info-desktop" />
            </div>
            <div className="content">
              <Category cartItems={cartItems} />
            </div>
            <Info id="info-mobile" />
          </div>
        </Route>
        <Route exact path="/search">
          <div className="container">
            <div className="left">
              <Welcome />
              <Info id="info-desktop" />
            </div>
            <div className="content">
              <Search cartItems={cartItems} />
            </div>
            <Info id="info-mobile" />
          </div>
        </Route>
        <Route exact path="/check-out">
          <CheckOut
            onAdd={onAdd}
            onRemove={onRemove}
            onRemoveItem={onRemoveItem}
            cartItems={cartItems}
            customerInfo={customerInfo}
            onRemoveCartItems={onRemoveCartItems}
            showRemoveConfirm={showRemoveConfirm}
          />
        </Route>
        <Route exact path="/order-history/:status">
          <OrderHistory cartItems={cartItems} customerInfo={customerInfo} />
        </Route>
        <Route exact path="/order-detail/:order_id">
          <OrderDetail cartItems={cartItems} customerInfo={customerInfo} />
        </Route>
        <LoginForm getCustomerInfo={getCustomerInfo} />
        <CheckOutMessage
          messageTop={"Bạn đã đặt hàng thành công"}
          messageBottom={"Hãy theo dõi tình trạng đơn hàng tại đây"}
          imgSrc={require("./img/check-circle.gif").default}
          imgStyles={{ width: "50%" }}
          id={"order-success"}
        />
        <CheckOutMessage
          messageTop={"Ôi không, đã có lỗi xảy ra"}
          messageBottom={"Xin lỗi vì sự cố này, vui lòng thử lại sau"}
          imgSrc={require("./img/ohnoohnononononono.gif").default}
          imgStyles={{ width: "100%" }}
          id={"order-fail"}
        />
        <CheckOutMessage
          messageTop={"Đặt hàng không thành công"}
          messageBottom={"Bạn đã hủy quá trình thanh toán"}
          imgSrc={require("./img/ohnoohnononononono.gif").default}
          imgStyles={{ width: "100%" }}
          id={"order-notpaying"}
        />
        <NavMobile />
      </div>
    </>
  );
}

export default App;
