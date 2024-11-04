// Product.js
import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../../styles/Product.css";
import Star from "./Star";
import * as utils from "../../logic/utils";

function Product({ id, image, title, price, rating }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddClick = (e) => {
    e.stopPropagation(); // Prevent navigation on button click
    dispatch(addItem({ id, title, image, price, rating }));
  };

  const handleProductClick = () => {
    navigate(`/product/${id}`); // Navigate to product detail page
  };

  return (
    <div className="product" onClick={handleProductClick}>
      <div className="product__img-container">
        <img className="product__img" src={image} alt={title} width={256} height={256} />
      </div>
      <div className="product__info">
        <p className="product__title">{title}</p>
        <div className="product__rating">
          {utils.renderRating(rating * 2).map((val, index) => (
            <Star key={index} text={val} />
          ))}
        </div>
        <p className="product__price">
          <span>$</span>
          <span>{utils.getPrice(price)}</span>
        </p>
      </div>
      <button type="button" onClick={handleAddClick} aria-label={`${title} - Add to cart`}>
        Add to cart
      </button>
    </div>
  );
}

export default Product;
