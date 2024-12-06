import React, {useState} from 'react';
import { Heading } from '../../components';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  return (
    <section className='py-5'>
    <div className="container py-5">
      <div className="row g-5 py-3">
      <div className="col-md-6 col-lg-6">
          <img src="https://images.pexels.com/photos/1000739/pexels-photo-1000739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className='img-fluid' alt="about-us" />
        </div>
        <div className="col-md-6 col-lg-6">
        <Heading heading="contact us" textPosition={true}/>
          <form className='d-flex flex-column gap-3 justify-content-center align-items-center' autoFocus={true}>
            <input type="text" placeholder='Name' value={name} onChange={((e) => setName(e.target.value))} className='form-control' required="required" />
            <input type="email" placeholder='Email' value={email} onChange={((e) => setEmail(e.target.value))} className='form-control' required="required" />
            <input type="text" placeholder='Phone' value={phone} onChange={((e) => setPhone(e.target.value))} className='form-control' required="required" />
            <textarea type="text" placeholder='Message' value={message} onChange={((e) => setMessage(e.target.value))} className='form-control' required="required" rows={4} />
            <button className='btn btn-primary w-100' type='submit'>Submit</button>
          </form>
          </div>

      

      </div>
    </div>
  </section>
  )
}

export default Contact