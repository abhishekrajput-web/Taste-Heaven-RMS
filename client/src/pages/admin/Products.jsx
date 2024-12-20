
import React, { useState, useEffect } from 'react';
import { AdminSidebar, Heading } from "../../components";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from '../../utils/fetchBaseUrl';

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // Handle get products
    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/product/get-product`);
            setProducts(data?.products);
            console.log(data.products);
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong in getting products");
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <section className='py-5'>
            <div className="container py-5">
                <div className='row g-5 py-3'>
                    <div className="col-md-4 col-lg-3">
                        <AdminSidebar />
                    </div>

                    <div className='col-md-8 col-lg-9'>
                        <Heading heading="All Products" />
                        <div className='row g-4'>
                            {products.map((product, i) => (
                                <div key={i} className='col-sm-6 col-md-4 col-lg-3'>
                                    <div className="card shadow-sm">
                                        <img 
                                            src={product.photo} 
                                            className='card-img-top adjust' 
                                            alt={product.name} 
                                        />
                                        <div className="card-body">
                                            <h5 className='card-title text-capitalize'>{product?.name}</h5>
                                            <p className='card-text text-secondary'>{product?.description?.slice(0,30)}...</p>
                                            <p className='text-success font-weight-bold'>Price: ₹{product?.price}</p>
                                            <div className='d-flex justify-content-between'>
                                                <button 
                                                    className="btn btn-primary"
                                                    onClick={() => navigate(`/dashboard/admin/product/${product.slug}`)}
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Products;
