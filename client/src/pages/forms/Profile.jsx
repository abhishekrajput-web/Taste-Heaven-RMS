
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import { UserSidebar, Heading } from '../../components';
import BASE_URL from '../../utils/fetchBaseUrl';
const Profile = () => {

  // context 
  const {auth, setAuth} = useAuth();

  // state
  const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
   const {name, email, address, phone} = auth?.user;
   setName(name);
  //  setPassword(password);
   setEmail(email);
   setAddress(address);
   setPhone(phone);
  },[auth]);

  const updateProfile = async (e) => {
    e.preventDefault();
    console.log(name, email, address, phone);

    
    if (!/^[A-Za-z]+$/.test(name) || name.length < 3) {
      toast.error("Name must contain only alphabets and be at least three characters long");
      return;
    }

    // Validation for Email field
if (!/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(email)) {
  toast.error("Please enter a valid email address");
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
  
  
  

    try {
      const {data} = await axios.put(`${BASE_URL}/api/v1/auth/user-profile`, {
        name,
        email,
        // password,
        phone,
        address,
      });
      console.log(data);

      if (data?.error) {
        toast.error(data?.error);
        console.log(data?.error);
      }

      else{
        setAuth({...auth, user:data?.updatedUser});
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("profile updated successfully");
        window.location.reload();
      }

    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }

  }

  return (
    <section className='py-5'>
      <div className="container py-5">
        <div className="row g-5 ">
        <div className="col-md-6">
            <UserSidebar/>
          </div>

          <div className="col-md-6">
          <Heading heading="update user profile" textPosition={true}/>
        {/* <h2 className='fs-4 text-capitalize'>Update User Profile</h2> */}
          <form className='d-flex flex-column gap-3 justify-content-center align-items-center py-4' onSubmit={updateProfile} autoFocus={true}>
        <input type="text" placeholder='Name' value={name} onChange={((e) => setName(e.target.value))} className='form-control' required="required" style={{maxWidth:"500px"}} />
        <input type="email" placeholder='Email' value={email} onChange={((e) => setEmail(e.target.value))} className='form-control' required="required" style={{maxWidth:"500px"}} disabled />
        {/* <input type="password" placeholder='Password' value={password} onChange={((e) => setPassword(e.target.value))} className='form-control' required="required" style={{maxWidth:"500px"}} /> */}
        <input type="text" placeholder='Phone' value={phone} onChange={((e) => setPhone(e.target.value))} className='form-control' required="required" style={{maxWidth:"500px"}} />

        <input type="text" placeholder='Address' value={address} onChange={((e) => setAddress(e.target.value))} className='form-control mw-50' required="required" style={{maxWidth:"500px"}} />
      
        <button className='btn btn-primary' type='submit'>Update</button>
      </form>
          </div>

       
        </div>


      </div>
    </section>
  )
}

export default Profile;