import React from "react";
import "./Assets/css/CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="product" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
