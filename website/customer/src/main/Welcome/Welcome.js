import "./Welcome.css";
import logo from "../../img/logo.png";
import img from "../../img/pixeltrue-study-from-books-1.png";
import { useLocation } from "react-router-dom";

function Welcome() {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();

  return (
    <div className="welcome">
      <a href="/">
        <img src={logo} alt="Logo" className="logo" />
      </a>
      <form action="/search" className="search-bar">
        <input
          placeholder="Nhập tên sách..."
          type="text"
          name="q"
          id="search-input"
          defaultValue={query.get("q") !== null ? query.get("q") : ""}
        />
      </form>
      <div className="tag">
        <a href="/search?q=harry potter" className="color-test primary">#harry potter</a>
        <a href="/search?q=a thousand year" className="color-test primary">#a thousand year</a>
        <a href="/search?q=the hunger game" className="color-test primary">#the hunger game</a>
        <a href="/search?q=lady gaga" className="color-test primary">#lady gaga</a>
        <a href="/search?q=van hoc" className="color-test primary">#van hoc</a>
        <a href="/search?q=twilight" className="color-test primary">#twilight</a>
        <a href="/search?q=tủ sách" className="color-test primary">#tủ sách</a>
      </div>
      <div className="welcome-img">
        <img src={img} alt="" />
      </div>
    </div>
  );
}

export default Welcome;
