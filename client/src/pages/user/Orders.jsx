
import React, { useEffect, useState } from 'react';
import { UserSidebar, Heading } from '../../components';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import moment from "moment";
import BASE_URL from '../../utils/fetchBaseUrl';

const Orders = () => {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/auth/orders`);
      setOrders(data?.orders);
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting orders");
    }
  };

  console.log(orders);
 console.log(orders?.Products?.length);
 

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth]);

  return (
    <section className='py-5'>
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-md-4 col-lg-4">
            <UserSidebar />
          </div>
          <div className="col-md-8 col-lg-8">
            <Heading heading="All Orders" textPosition={true} />
            {orders?.map((order, orderIndex) => {
              const totalQuantity = order?.products?.reduce((acc, product) => acc + product.quantity, 0) || 0;
              const totalAmount = order?.products?.reduce((acc, product) => acc + product.price * product.quantity, 0) || 0;

              return (
                <div key={order._id} className="border shadow mb-4">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Total Product</th>
                        <th scope="col">Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{orderIndex + 1}</td>
                        <td>{order?.status}</td>
                        <td>{order?.buyer?.name}</td>
                        <td>{moment(order?.createdAt).fromNow()}</td>
                        <td>{order?.payment.success ? "Success" : "Failed"}</td>
                        <td>{order?.products?.length}</td>
                        <td>₹{totalAmount.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    <h5>Products:</h5>
                    {order?.products?.map((product) => (
                      <div className="row mb-3 p-3 card flex-row" key={product._id}>
                        <div className="col-md-4">
                          <img
                            src={product.photo ? product.photo : `https://images.unsplash.com/photo-1503342452485-86b7f54527ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80`}
                            className="card-img-top img-fluid adjust"
                            alt={product.name}
                            style={{ maxWidth: "200px", height: "auto" }}
                          />
                        </div>
                        <div className="col-md-8">
                          <h6>{product.name}</h6>
                          <p>{product.description.substring(0, 30)}...</p>
                          <p><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
                          <p><strong>Quantity:</strong> {product.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
