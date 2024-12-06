import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import { ProductCard, Heading } from "../../components";

const CategoryProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/product/product-category/${slug}`
      );
      setCategory(data?.category);
      console.log(data);
      setProducts(data?.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductByCat();
  }, [slug]);

  return (
    <section className="py-5">
      <div className="container">
        <Heading heading={category?.name} />

        {/* <h2 className='fs-4 text-uppercase '>{category?.name}</h2> */}

        <div className="row g-3">
          {products?.map((product, i) => (
            <ProductCard product={product} i={i} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryProduct;
