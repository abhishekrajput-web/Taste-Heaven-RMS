import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Checkbox, Radio } from "antd";
import { Prices, HeroBanner, ProductCard } from '../components';
import ReservationForm from './user/ReservationForm';
// import HeroBanner from '../components/HeroBanner';
// import {ProductCard} from "../components";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, Setloading] = useState(false);
  // const [HomeLoading, SetHomeloading] = useState(false);


  // handle category get
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    }
    catch (err) {
      console.log(err);
      toast.error("something went wong in getting categories");
    }
  }


  //  handle total products 
  const getTotalProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/v1/product/product-count");
      setTotal(data?.total);
    }
    catch (err) {
      console.log(err);
      toast.error("Error in total product");
    }
  }

  useEffect(() => {
    getAllCategory();
    getTotalProducts();
  }, []);

  const getProducts = async () => {
    try {
      Setloading(true);
      const { data } = await axios.get(`http://localhost:3000/api/v1/product/product-list/${page}`);
      // const { data } = await axios.get("http://localhost:3000/api/v1/product/get-product");
      Setloading(false);
      setProducts(data?.products);
      //  console.log(data.products);
    }
    catch (err) {
      Setloading(false);
      console.log(err);
      toast.error("something went wong in getting products");
    }
  }


  // loadmore func
  // hanlde per page

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      Setloading(true);
      const { data } = await axios.get(`http://localhost:3000/api/v1/product/product-list/${page}`);
      Setloading(false);
      setProducts([...products, ...data?.products]);
    }
    catch (err) {
      Setloading(false);
      console.log(err);
      toast.error("something wrong in per page product");
    }
  }

  // handle filter products

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    }
    else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all);
  }


  useEffect(() => {
    if (!checked.length || !radio.length) getProducts();
  }, []);

  // post filter products
  const postFilterProducts = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/api/v1/product/product-filters", { checked, radio });
      console.log(data);
      setProducts(data?.products);
    }
    catch (err) {
      console.log(err);
      toast.error("something went wong in getting filter products");
    }
  }



  useEffect(() => {
    if (checked.length || radio.length) postFilterProducts();
  }, [checked, radio]);


if (loading) {
  return (
    // <h1 className='display-6 text-center w-100 d-flex justify-content-center align-items-center' style={{height
    // :"100vh"}}>Loading.....</h1>
    <div className="food-loader-container">
    <div className="food-loader">
      <div className="plate">
        <div className="food"></div>
      </div>
      <div className="utensil">
        <div className="fork"></div>
        <div className="spoon"></div>
      </div>
    </div>
    <p>Loading your delicious meal...</p>
  </div>
  )
}


  return (

    <section className='py-5'>
      <HeroBanner />

      <div className="container py-5">
        <div className="row g-3">
           <div className="col-md-4 col-lg-3">

            <div>
              <h2 className='fs-5 text-capitalize'>filter by category</h2>
              <div className='d-flex flex-column'>
                {categories?.map((c) => (
                  <div className='fw-medium text-capitalize' key={c?._id}>
                    <Checkbox key={c?._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c?.name}</Checkbox>
                  </div>
                ))}
              </div>
            </div>

            <div className='pt-5'>
              <h2 className='fs-5 text-capitalize'>filter by price</h2>
              <div className='d-flex flex-column fw-medium text-capitalize'>
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>


            <div className='py-5'>
              <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>RESET FILTER</button>
            </div>

          </div> 
   


          <div className='col-md-8 col-lg-9'>
            <div>
              <h1 className='fs-3 text-capitalize'>All Dishes</h1>
              <div className='row g-4'>
                {products.map((product, i) => (
                  <ProductCard product={product} i={i} key={i}/>
                ))}
              </div>



              <div className='py-5'>
                {/* [{total}] */}
                {products && products.length < total && (
                  <button className='btn btn-warning' onClick={(e) => { e.preventDefault(); setPage(page + 1) }}>
                      {loading ? "Loading..." : "LoadMore"}
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>


      

    </section>
  )
}

export default Home;