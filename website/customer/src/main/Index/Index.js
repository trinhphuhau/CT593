import React from "react";
import Header from "../Header/Header";
import Content from "../Content/Content";

function Index(props) {
  const { onAdd, cartItems, customerInfo } = props;
  return (
    <>
      <Header cartItems={cartItems} customerInfo={customerInfo} />
      <Content onAdd={onAdd} />
    </>
  );
}

export default Index;
