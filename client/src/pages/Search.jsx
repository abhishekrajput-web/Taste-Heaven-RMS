import React, { useState } from 'react';
import { useSearch } from '../context/search';
import { useNavigate } from 'react-router-dom';
import {ProductCard} from "../components";
import { useCart } from "../context/cart";
    const Search = () => {
      const [loading, Setloading] = useState(false);
      const navigate = useNavigate();
      const { cart, setCart } = useCart();
    const {values, setValues} = useSearch();

    if (loading) {
      return <div>
        <h1 className='display-1 text-center'>Loading.....</h1>
      </div>
    }

  return (
    <section className='py-5'>
      <div className="container py-5">
          <h6 className='text-center fs-4'>{values?.results?.results?.length < 1  ?  "No Product Found" : `Found ${values?.results?.results?.length}` } <span className='text-danger'>results</span> </h6>
                  <div className='row g-4'>
                {values?.results?.results?.map((product, i) => (
                  <ProductCard product={product} i={i} key={i}/>
                ))}
              </div>
      </div>


    </section>
  )
}

export default Search;