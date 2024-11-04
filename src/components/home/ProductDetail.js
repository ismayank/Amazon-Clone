// ProductDetail.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import productsData from "../../data/products";
import "../../styles/ProductDetail.css";
import Star from "./Star";
import * as utils from "../../logic/utils";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/features/cart/cartSlice";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = productsData.flat().find((item) => item.id === id);
  const handleAddClick = (e) => {
    e.stopPropagation(); // Prevent navigation on button click
    dispatch(addItem({
        id: product.id,
        title: product.name,
        image: product.image,
        price: product.price,
        rating: product.rating,
      }));
  };

  const handleAddToCart = () => {
    dispatch(addItem({
      id: product.id,
      title: product.name,
      image: product.image,
      price: product.price,
      rating: product.rating,
    }));
    alert("Item added to cart!");
  };

  const handleBuyNow = () => {
    // Logic for "Buy Now" could include navigating to checkout or cart page
    dispatch(addItem({
      id: product.id,
      title: product.name,
      image: product.image,
      price: product.price,
      rating: product.rating,
    }));
    navigate("/checkout"); // Replace with the actual checkout path
  };

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="product-detail">
      <div className="product-detail__left">
        <img src={product.image} alt={product.name} className="product-detail__image" />
      </div>

      <div className="product-detail__center">
        <h1 className="product-detail__title">{product.name}</h1>
        <div className="product-detail__rating">
          {utils.renderRating(product.rating * 2).map((val, index) => (
            <Star key={index} text={val} />
          ))}
          <span className="product-detail__review-count">(500 ratings)</span>
        </div>
        <p className="product-detail__price">Price: ${utils.getPrice(product.price)}</p>
        <p className="product-detail__description">
          {product.description || "This is a detailed description of the product, including key features, specifications, and other relevant information that might help the customer."}
        </p>
      </div>

      <div className="product-detail__right">
        <p className="product-detail__price-large">${utils.getPrice(product.price)}</p>
        <p className="product-detail__shipping">Free Shipping available</p>
        <button type="button" onClick={handleAddClick} aria-label={` Add to cart`}>
        Add to cart
      </button>
        <button className="product-detail__buy-now" onClick={handleBuyNow}>Buy Now</button>
        <p className="product-detail__stock">In Stock</p>
      </div>
    </div>
  );
}

export default ProductDetail;
