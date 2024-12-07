
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import { useCart } from '../../context/cart';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import DropIn from "braintree-web-drop-in-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import BASE_URL from '../../utils/fetchBaseUrl';

const Cart = () => {
  const { auth } = useAuth();
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);

  const totalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
    });
    return total.toLocaleString("en-IN", { style: "currency", currency: "INR" });
  };

  const removeItem = (pid) => {
    const updatedCart = cart.filter(item => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Selected item removed");
  };

  const handleQuantityChange = (pid, delta) => {
    const updatedCart = cart.map(item => {
      if (item._id === pid) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getToken();
    }
  }, [auth]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${BASE_URL}/api/v1/product/braintree/payment`, { nonce, cart });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment completed successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-5">
          {/* Cart Items Section */}
          <div className="col-md-8">
            <div className="mb-4" style={{paddingTop:"40px"}}>
              <h4 className="text-secondary">Hello, <span className="text-primary text-capitalize">{auth?.user?.name}</span></h4>
              <p className="fs-5">
                {cart?.length >= 1 
                  ? `You have ${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`
                  : "Your cart is empty"}
              </p>
            </div>
            {cart.length > 0 ? (
              <div className="row g-4">
                {cart.map((product, i) => (
                  <div key={i} className="col-sm-6 col-lg-4">
                    <div className="card h-100 shadow-sm">
                      <img src={product.photo || `https://images.unsplash.com/photo-1614252368727-99517bc90d7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80`} className="card-img-top rounded adjust img-fluid" alt={product.name} />
                      <div className="card-body">
                        <h5 className="card-title text-capitalize">{product.name}</h5>
                        {/* <p className="card-text text-muted">{product.description.slice(0, 30)}...</p> */}
                        <p className="text-danger">₹{product.price}</p>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(product._id, -1)}>-</button>
                          <span>{product.quantity}</span>
                          <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(product._id, 1)}>+</button>
                        </div>
                      </div>
                      <div className="card-footer d-flex justify-content-between flex-column gap-2 align-items-center">
                        <button type="button" className="btn btn-outline-danger w-100" onClick={() => removeItem(product._id)}>
                          Remove
                        </button>
                        <Link className='btn btn-outline-success w-100' to={`/product/${product.slug}`}>
                        Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No items in cart</p>
            )}
          </div>

          {/* Cart Summary Section */}
          <div className="col-md-4" style={{paddingTop:"40px"}}>
            <div className="bg-light p-4 shadow rounded">
              <h5 className="fw-bold">Cart Summary</h5>
              <hr />
              <p className="fs-5">Total: <span className="text-danger fw-bold">{totalAmount()}</span></p>

              {/* Payment Button */}
              {clientToken && auth?.token && cart.length > 0 ? (
                <div className="mt-4">
                  <DropIn
                    options={{
                      authorization: clientToken,
                      // paypal: { flow: "vault" },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary w-100"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </div>
              ) : (
                <div className="alert alert-info mt-4">
                  {auth?.token ? "Add items to cart to proceed with payment" : "Login to proceed with payment"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;







