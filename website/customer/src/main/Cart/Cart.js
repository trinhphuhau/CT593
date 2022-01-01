import { numberFormat } from "../../numberFormat";
import "./Cart.css";
import { Link } from "react-router-dom";

function Cart(props) {
  const { cartItems } = props;
  return (
    <div className="cart">
      <div className="cart-header">
        <p>Sản phẩm mới thêm</p>
      </div>
      <div className="cart-products">
        {cartItems.map((item, key) => (
          <div className="cart-product" key={key}>
            <div className="cart-item">
              <img src={item.image_url} alt="" />
              <div className="cart-item-text">
                <div className="cart-item-title">{item.title}</div>
                <div className="cart-item-price">
                  {numberFormat(item.price)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <p>
          Bạn có <span>{cartItems.length}</span> sản phẩm trong giỏ
        </p>
        {/* <Link to="/check-out">Xem giỏ hàng</Link> */}
        <Link to="/check-out">Xem giỏ hàng</Link>
      </div>
    </div>
  );
}

export default Cart;
