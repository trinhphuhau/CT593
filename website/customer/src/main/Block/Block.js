import Book from "../Book/BookList";
import React from "react";
import { Link } from "react-router-dom";
import "./Block.css";

function Block(props) {
  const { onAdd, bookList, showAll } = props;
  return (
    <div className="block">
      <div className="block-header">
        <div className="block-title">
          <img src={props.img} alt="" />
          <h2>{props.title}</h2>
        </div>
        {showAll !== "none show all" && <Link to={showAll}>Show all</Link>}
      </div>
      <div className="block-list">
        <Book bookList={bookList} onAdd={onAdd} />
      </div>
    </div>
  );
}

export default Block;
