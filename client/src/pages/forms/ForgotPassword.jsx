import React, {useState} from 'react'
import { Link, useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import { Heading } from '../../components';
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  // const [question, setQuestion] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const submitPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/forgot-password", {
        email,
        // question,
        newPassword,
      })

      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }

      else{
        toast.error(res.data.message);
      }

    } catch (error) {
      // console.log(error);
      // toast.error("something went wrong");
      if (error.response && error.response.status === 404) {
        toast.error("Email Does Not Exist");  // Custom message for 404 errors
    } else {
        toast.error("Something went wrong");
    }
    }

  }


  return (

<section className='py-5'>
<div className="container py-5">

  <div className="row g-5">

    <div className="col-lg-6 col-md-0 col-sm-0">
      {/* <img src="https://images.unsplash.com/photo-1541929866681-94eb7c9a4c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1003&q=80" className='img-fluid d-none d-md-none d-lg-block' alt="" /> */}
      <img src="../../../forms_img/forgot_password.jpg" className='img-fluid d-none d-md-none d-lg-block' alt="" />
    </div>

    <div className="col-lg-6 col-md-12 col-sm-12">
      <Heading heading="Reset Password" textPosition={true}/>
      {/* <h2 className='fs-4 text-center text-capitalize'>reset password</h2> */}
      <form className='d-flex flex-column gap-4 justify-content-center align-items-center' autoFocus={true} onSubmit={submitPassword}>
        <input type="email" placeholder='Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required="required"  />
        <input type="text" placeholder='New Password' className='form-control' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required="required" />
        <button className='btn btn-primary w-100' type='submit'
        >Reset</button>
      </form>
    </div>
  </div>




</div>

</section>
  )
}

export default ForgotPassword;