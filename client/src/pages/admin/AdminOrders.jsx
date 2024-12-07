

import React, { useState, useEffect } from 'react';
import { AdminSidebar, Heading } from '../../components';
import axios from 'axios';
import toast from "react-hot-toast";
import { useAuth } from '../../context/auth';
import moment from "moment";
import { Select } from 'antd';
import BASE_URL from '../../utils/fetchBaseUrl';

const { Option } = Select;

const AdminOrders = () => {
  const { auth } = useAuth();
  const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Delivered", "Cancelled"]);
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/auth/all-orders`);
      setOrders(data?.orders);
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting orders");
    }
  };

  useEffect(() => {
    if (auth?.token) getAllOrders();
  }, [auth]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`${BASE_URL}/api/v1/auth/order-status/${orderId}`, { status: value });
      getAllOrders();
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in updating order status");
    }
  };

  return (
    <section className='py-5'>
      <div className="container py-5">
        <div className='row g-5 py-3'>
          <div className="col-md-4 col-lg-3">
            <AdminSidebar />
          </div>

          <div className='col-md-8 col-lg-9'>
            <Heading heading="Admin Orders" />
            {orders?.map((o, index) => (
              <div key={o._id} className="mb-4">
                <div className="card p-3">
                  <div className="card-header">
                    <h5>Order #{index + 1}</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <strong>Status: </strong>
                      <Select
                        bordered={false}
                        onChange={(value) => handleChange(o._id, value)}
                        defaultValue={o?.status}
                      >
                        {status.map((s, i) => (
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <div className="mb-3">
                      <strong>Buyer: </strong>{o?.buyer?.name}
                    </div>
                    <div className="mb-3">
                      <strong>Date: </strong>{moment(o?.createdAt).fromNow()}
                    </div>
                    <div className="mb-3">
                      <strong>Payment: </strong>{o?.payment.success ? "Success" : "Failed"}
                    </div>
                    <div className="mb-3">
                      <strong>Total Quantity: </strong>{o?.products?.length}
                    </div>
                    <div className="products-list">
                      {o?.products?.map((p, i) => (
                        <div className="row mb-2 p-2 border rounded" key={p._id}>
                          <div className="col-md-3">
                            <img
                              src={p.photo}
                              className="img-fluid"
                              alt={p.name}
                              width="100%"
                              height="auto"
                            />
                          </div>
                          <div className="col-md-9">
                            <p><strong>Name:</strong> {p.name}</p>
                            <p><strong>Description:</strong> {p.description.substring(0, 30)}...</p>
                            <p><strong>Price:</strong> ₹{p.price}</p>
                            {/* <p><strong>Quantity:</strong> {p.quantity}</p> */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminOrders;
