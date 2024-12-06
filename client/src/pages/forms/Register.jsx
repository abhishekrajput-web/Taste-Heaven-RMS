import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import { Heading } from '../../components';
const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  // const [question, setQuestion] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();


    if (!/^[A-Za-z]+$/.test(name) || name.length < 3) {
      toast.error("Name must contain only alphabets and be at least three characters long");
      return;
    }

    // Validation for Email field
if (!/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(email)) {
  toast.error("Please enter a valid email address");
  return;
}


const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
if (!passwordPattern.test(password)) {
  toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
  return;
}



 
    

  
    const phoneNumberPattern = /^(9|8|7|6)\d{9}$/;
    if (!phoneNumberPattern.test(phone)) {
      toast.error("Phone number must start with 9, 8, 7, or 6 and contain exactly 10 digits");
      return;
    }


      if (!/^[A-Za-z0-9 ,.-]+$/.test(address)) {
        toast.error("Address must contain only letters, numbers");
        return;
      }
      
      
      
      
      
      


    console.log(name, password, email, address, phone);




    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/register", {
        name,
        password,
        email,
        address,
        phone,
        // question
      })

      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
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

      <div className="row align-items-center">

        <div className="col-lg-6 col-md-0 col-sm-0">
          {/* <img src="https://wallpapercave.com/wp/wp1874159.jpg" className='img-fluid d-none d-lg-block img-ratio' alt="" /> */}
          <img src="../../../forms_img/register_bg.jpg" className='img-fluid d-none d-md-none d-lg-block img-ratio' alt="" />
        </div>

        <div className="col-lg-6 col-md-12 col-sm-12">
          <Heading heading="Register" textPosition={true}/>
    {/* <h2 className='fs-4 text-capitalize text-center'>Register</h2> */}

          <form className='d-flex flex-column gap-3 justify-content-center align-items-center' autoFocus={true}>
            <input type="text" placeholder='Name' value={name} onChange={((e) => setName(e.target.value))} className='form-control' min="5"/>
            <input type="email" placeholder='Email' value={email} onChange={((e) => setEmail(e.target.value))} className='form-control'/>
            <input type="password" placeholder='Password' value={password} onChange={((e) => setPassword(e.target.value))} className='form-control'/>
            <input type="text" placeholder='Phone' value={phone} onChange={((e) => setPhone(e.target.value))} className='form-control'/>
            <input type="text" placeholder='Address' value={address} onChange={((e) => setAddress(e.target.value))} className='form-control'/>
            <Link to="/login" className='text-dark'>
              already a register user ? <span className='text-primary'>Login</span>
            </Link>
            <button className='btn btn-primary w-100' type='submit' onClick={onSubmit}>Register</button>
          </form>
        </div>
      </div>




      </div>

    </section>
  )
}

export default Register;