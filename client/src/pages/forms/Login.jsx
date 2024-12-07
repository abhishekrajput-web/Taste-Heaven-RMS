import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import { Heading } from '../../components';
import BASE_URL from '../../utils/fetchBaseUrl';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log( password, email);

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
        email,
        password,
      })

      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      }

      else {
        toast.error(res.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }

  }


  return (

    <section className='py-5'>
      <div className="container py-5">

        <div className="row g-5 align-items-center">

          <div className="col-lg-6 col-md-0 col-sm-0">
            {/* <img src="https://wallpapercave.com/wp/wp1874162.jpg" className='img-fluid d-none d-md-none d-lg-block img-ratio' alt="" /> */}
            <img src="../../../forms_img/login_bg.jpg" className='img-fluid d-none d-md-none d-lg-block img-ratio' alt="" />
          </div>

          <div className="col-lg-6 col-md-12 col-sm-12">
            <Heading heading="Login" textPosition={true}/>
            {/* <h2 className='fs-4 text-center'>Login</h2> */}
            <form className='d-flex flex-column gap-4 justify-content-center align-items-center' autoFocus={true} onSubmit={onSubmit}>
              <input type="email" placeholder='Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required="required" />
              <input type="password" placeholder='Password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} required="required"  />
              <div className='d-flex flex-column gap-2'>
                <Link to="/register" className='text-dark'>
                  not a register user ? <span className='text-primary'>Register </span>
                </Link>
                
                <Link to="/forgot-password" className='text-dark'>
                  forgot password ? <span className='text-primary'>Reset Password</span>
                </Link>
              </div>
              <button className='btn btn-primary w-100' type='submit'
              >Login</button>
            </form>
          </div>
        </div>




      </div>

    </section>
  )
}

export default Login;