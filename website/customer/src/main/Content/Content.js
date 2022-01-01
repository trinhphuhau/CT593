import Block from "../Block/Block";
import Categories from "../Categories/Categories";
import "./Content.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import Promo from "../Promo";

function Content(props) {
  const { onAdd } = props;
  const [categories, setCategories] = useState([]);
  const [newBook, setNewBook] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);

  const getCategories = () => {
    Axios.get("http://localhost:3001/categories").then((response) => {
      setCategories(response.data);
    });
  };

  const getNewBook = () => {
    Axios.get("http://localhost:3001/new-book").then((res) => {
      setNewBook(res.data);
    });
  };

  const getBestSelling = () => {
    Axios.get("http://localhost:3001/best-selling").then((res) => {
      setBestSelling(res.data);
    });
  };

  useEffect(() => {
    getCategories();
    getNewBook();
    getBestSelling();
  }, []);

  return (
    <div>
      <Categories categories={categories} />
      <Promo />
      <Block
        title="Sách mới"
        img="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/285/package_1f4e6.png"
        bookList={newBook}
        onAdd={onAdd}
        showAll="/new-book"
      />
      <Block
        title="Sách bán chạy"
        img="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/285/chart-increasing_1f4c8.png"
        bookList={bestSelling}
        onAdd={onAdd}
        showAll="/best-selling"
      />
    </div>
  );
}

export default Content;
