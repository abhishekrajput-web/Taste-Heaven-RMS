// import React, {useEffect, useState} from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import {ProductCard, Heading} from "../components";
// import { useCart } from "../context/cart";
// import toast from 'react-hot-toast';
// const ProductDetail = () => {
//   const {cart, setCart} = useCart();
//   const {slug} = useParams();
//   const [product, setproduct] = useState({});
//   const [relatedProduct, setRelatedProduct] = useState([]);


//   // get product detail
//   const getProduct = async () => {
//     try{
//       const {data} = await axios.get(`http://localhost:3000/api/v1/product/single-product/${slug}`);
//       setproduct(data?.singleProduct);
//       getRelatedProduct(data?.singleProduct._id, data?.singleProduct.category._id);
//       console.log(data);
//     }
//     catch(err){
//       console.log(err);
//     }
//   }

//   useEffect(() => {
//     getProduct();
//   },[slug]);

//   // get related product
//   const getRelatedProduct = async (pid, cid) => {
//     try{
//       const {data} = await axios.get(`http://localhost:3000/api/v1/product/related-product/${pid}/${cid}`);
//       setRelatedProduct(data?.products);
//       console.log(data);
//     }
//     catch(err){
//       console.log(err);
//     }
//   }


//   return (

// <section className='py-5'>
//   <div className="container py-5">
//     <div className="row g-5 align-items-center">
//       <div className="col-md-6">
//  <img src={product.photo ? product.photo : `https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} className='img-fluid' alt="watches" />

//       </div>
//       <div className='col-md-6'>
//        <div className='d-flex flex-column gap-1'>
//      <p className='text-dark fs-6 text-capitalize fw-medium'>Name:{product.name}</p>
//      <p className='text-dark fs-6 text-capitalize fw-medium'>Description{product.description}</p>
//      <p className='text-dark fs-6 text-capitalize fw-medium'>Price:{product.price}</p>
//      <p className='text-dark fs-6 text-capitalize fw-medium'>CategoryName{product?.category?.name}</p>
//      <p className='text-dark fs-6 text-capitalize fw-medium'>Quantity{product?.quantity}</p>
//      <button type="button" className="btn btn-outline-danger" onClick={() => {
//         setCart([...cart, product]);
//         localStorage.setItem("cart", JSON.stringify([...cart, product]));
//         toast.success("product added to cart");
//       }}>Add To Cart</button>
//      {/* <button type='button' className='btn btn-outline-dark'>Add To Cart</button> */}
//    </div>
//       </div>
//     </div>

//     <div className="row py-5 g-4">
//     <Heading heading="similar products" textPosition={true}/>
//      {/* <h2 className='text-dark fs-4 text-uppercase'>similar products</h2> */}
//      {relatedProduct?.length < 1 && (<h1>No similar product found</h1>)}
//              {relatedProduct?.map((product, i) => (
//             <ProductCard product={product} i={i} key={i}/>
//             ))}
//     </div>
//   </div>
// </section>

//   )
// }

// export default ProductDetail;





// chatgpt enhance version ui 


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { ProductCard, Heading } from '../components';
// import { useCart } from '../context/cart';
// import toast from 'react-hot-toast';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const ProductDetail = () => {
//   const { cart, setCart } = useCart();
//   const { slug } = useParams();
//   const [product, setProduct] = useState({});
//   const [relatedProduct, setRelatedProduct] = useState([]);


//   // Get product details
//   const getProduct = async () => {
//     try {
//       const { data } = await axios.get(`http://localhost:3000/api/v1/product/single-product/${slug}`);
//       setProduct(data?.singleProduct);
//       getRelatedProduct(data?.singleProduct._id, data?.singleProduct.category._id);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getProduct();
//   }, [slug]);

//   // Get related products
//   const getRelatedProduct = async (pid, cid) => {
//     try {
//       const { data } = await axios.get(`http://localhost:3000/api/v1/product/related-product/${pid}/${cid}`);
//       setRelatedProduct(data?.products);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <section className="py-5">
//       <div className="container py-5">
//         <div className="row g-5 align-items-center">
//           <div className="col-md-6">
//             <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
//               <div className="carousel-inner">
//                 <div className="carousel-item active">
//                   <img src={product.photo || 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg'} className="d-block w-100 rounded" alt={product.name} />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className="d-flex flex-column gap-3">
//               <h3 className="text-dark fs-4 text-capitalize">{product.name}</h3>
//               <p className="text-muted">{product.description}</p>
//               <p className="text-danger fs-5">₹ {product.price}</p>
//               <p className="text-secondary">Category: {product?.category?.name}</p>
        
//               <button
//                 type="button"
//                 className="btn btn-outline-primary my-3"
//                 onClick={() => {
//                   const isProductInCart = cart.find((item) => item._id === product._id); // Check if the product is already in the cart
//                   if (isProductInCart) {
//                     toast.error('Product already in cart');
//                   } else {
//                     setCart([...cart, product]);
//                     localStorage.setItem('cart', JSON.stringify([...cart, product]));
//                     toast.success('Product added to cart');
//                   }
//                 }}
//               >
//                  {cart.some(item => item._id === product._id) ? 'Already in Cart' : 'Add To Cart'}
//               </button>

//             </div>
//           </div>
//         </div>

//          <div className="row py-5">
//           <Heading heading="Similar Products" textPosition={true} />
//           {relatedProduct?.length < 1 && <h5 className="text-center text-muted">No similar products found</h5>}
//           <div className="row g-4">
//             {relatedProduct?.map((product, i) => (
//               <div key={i}>
//                 <ProductCard product={product} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div> 
 
//     </section>
//   );
// };

// export default ProductDetail;












// loaded scroll top



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ProductCard, Heading } from '../components';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import BASE_URL from '../utils/fetchBaseUrl';

const ProductDetail = () => {
  const { cart, setCart } = useCart();
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  // Get product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/single-product/${slug}`);
      setProduct(data?.singleProduct);
      getRelatedProduct(data?.singleProduct._id, data?.singleProduct.category._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, [slug]);

  // Get related products
  const getRelatedProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProduct(data?.products);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="py-5">
      <div className="container py-5">
        <div className="row g-5 align-items-start">
          {/* Product Image Section */}
          <div className="col-md-6">
            <div className="product-image shadow-lg rounded overflow-hidden">
              <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={product.photo || 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg'}
                      className="d-block w-100 rounded"
                      alt={product.name}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="col-md-6">
            <div className="product-details">
              <h1 className="text-dark fs-2 fw-bold text-capitalize">{product.name}</h1>
              <p className="text-muted">{product.description}</p>
              <p className="text-danger fs-4 fw-bold">₹ {product.price}</p>
              <p className="text-secondary">Category: {product?.category?.name}</p>

              {/* Add to Cart Button */}
              <button
                type="button"
                className="btn btn-primary btn-lg rounded-pill mt-3 px-5 py-2 shadow"
                onClick={() => {
                  const isProductInCart = cart.find((item) => item._id === product._id); // Check if the product is already in the cart
                  if (isProductInCart) {
                    toast.success('Product already in cart');
                  } else {
              
                    setCart([...cart, { ...product, quantity: 1 }]);
                    localStorage.setItem("cart", JSON.stringify([...cart, { ...product, quantity: 1 }]));
                    toast.success("Product added to cart");
                  }
                }}
              >
                {cart.some(item => item._id === product._id) ? 'Already in Cart' : 'Add To Cart'}
              </button>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="row py-5">
          <Heading heading="Similar Products" textPosition={true} />
          {relatedProduct?.length < 1 && <h5 className="text-center text-muted">No similar products found</h5>}
          <div className="row g-4">
            {relatedProduct?.map((product, i) => (
              <div key={i}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;












