import { Link } from "react-router-dom";
import "./Categories.css";

function Category(props) {
  const { categories } = props;
  return (
    <div className="category">
      {categories.map((category) => (
          <div className="category-item" key={category.genre_id}>
          <Link to={"/category?id=" + category.genre_id}>
            <div className="center">
              <img src={category.image} alt={category.genre} />
              <p>{category.genre}</p>
            </div>
        </Link>
          </div>
      ))}
    </div>
  );
}

export default Category;
