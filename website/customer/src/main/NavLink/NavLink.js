import { Link, useLocation } from "react-router-dom";

function NavLink(props) {
  const { customerInfo } = props;
  const pathname = useLocation().pathname;
  return (
    <nav>
      <ul className="navigation-link">
        <li className={pathname === "/" ? "active" : ""}>
          <h1>
            <Link to="/">Trang chủ</Link>
          </h1>
        </li>
        {customerInfo.user_id !== 0 && (
          <li className={pathname === "/for-you" ? "active" : ""}>
            <h1>
              <Link to="/for-you">Dành cho bạn</Link>
            </h1>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavLink;
