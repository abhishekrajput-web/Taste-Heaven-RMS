
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from "../context/cart";
import toast from 'react-hot-toast';

const ProductCard = ({ product, i }) => {
  const { cart, setCart } = useCart();

  const handleAddToCart = () => {
    const productInCart = cart.find(item => item._id === product._id);
    
    if (productInCart) {
      toast.success("Already In Cart");
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      localStorage.setItem("cart", JSON.stringify([...cart, { ...product, quantity: 1 }]));
      toast.success("Product added to cart");
    }
  };

  return (
    <div key={i} className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <img
          src={product.photo ? product.photo : `https://images.unsplash.com/photo-1614252368727-99517bc90d7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80`}
          className="card-img-top product-image img-fluid adjust"
          alt={product.name}
        />
        <div className="card-body text-center">
          <h5 className="card-title text-capitalize font-weight-bold">{product?.name}</h5>
          <p className="card-text text-muted">{product?.description.slice(0, 50)}...</p>
          <p className="price text-danger fs-5">₹{product?.price}</p>
        </div>
        <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
          <Link to={`/product/${product.slug}`} className="btn btn-success btn-sm">
            View Details
          </Link>
          <button 
            className="btn btn-outline-danger btn-sm" 
            onClick={handleAddToCart}>
            {cart.some(item => item._id === product._id) ? 'Already in Cart' : 'Add To Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

