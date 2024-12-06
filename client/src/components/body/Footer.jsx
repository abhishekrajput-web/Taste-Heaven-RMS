import React from 'react';
import { IoMdContact } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import {MdPolicy} from "react-icons/md";
import {IoLogoWhatsapp} from "react-icons/io";
import {AiFillInstagram, AiFillTwitterCircle} from "react-icons/ai";
import {Link} from "react-router-dom";
import Heading from '../Heading';
const Footer = () => {
  return (
    <footer className='bg-dark' style={{marginTop:"auto"}}>
      <div className="container">
        <div className="row g-4">
        <div className="col-md-6 col-lg-3">
            <div className='text-white'>
              <h4 className='fs-5'>Policy</h4>
              <p className='fs-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis </p>
            </div>
            </div>
          <div className="col-md-6 col-lg-3">
            <div className='text-white'>
            <h4 className='fs-5'>Social Links</h4>
            <div className='d-flex flex-row gap-3'>
              <a href="" target='_blank'>
              <AiFillInstagram className='text-white fs-3'/>
              </a>
              <a href="" target='_blank'>
              <AiFillTwitterCircle className='text-white  fs-3'/>
              </a>
              <a href="" target='_blank'>
              <IoLogoWhatsapp className='text-white  fs-3'/>
              </a>
            </div>
            </div>
 
          </div>
          <div className="col-md-6 col-lg-3">
            <div className='text-white'>
            <h4 className='fs-5'>NewsLetter</h4>
            <div className='d-flex flex-row gap-3'>
            <input type="text" placeholder='@newsletter' className='form-control' />
            <button className='btn btn-outline-warning'>Submit</button>
            </div>
            <div className='d-flex flex-row gap-3 my-3'>
            <Link to="/about" title='about comapany'>
                    <FcAbout className='text-white fs-3'/>
                </Link>
                <Link to="/contact">
                    <IoMdContact className='text-white fs-3' title='contact us'/>
                </Link>

                <Link to="/policy">
                    <MdPolicy className='text-white fs-3' title='policy'/>
                </Link>
           
            </div>
         
            </div>

            </div>
     
            <div className="col-md-6 col-lg-3 text-white">
              <div>
          <h4 className='fs-5'>Trending Products</h4>
                      
          <div className='d-flex flex-row gap-3 flex-wrap'>
              <img src="https://images.pexels.com/photos/577794/pexels-photo-577794.jpeg?auto=compress&cs=tinysrgb&w=300" alt="" className='img-fluid w-25 h-25' />
              <img src="https://images.pexels.com/photos/2130796/pexels-photo-2130796.jpeg?auto=compress&cs=tinysrgb&w=300" alt="" className='img-fluid w-25 h-25' />
              <img src="https://images.pexels.com/photos/1496647/pexels-photo-1496647.jpeg?auto=compress&cs=tinysrgb&w=300" alt="" className='img-fluid w-25 h-25' />
              <img src="https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=300" alt="" className='img-fluid w-25 h-25' />
              <img src="https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=300" alt="" className='img-fluid w-25 h-25' />
              <img src="https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=300" alt="" className='img-fluid w-25 h-25' />
            </div>
              </div>

            </div>
        </div>
      </div>
    </footer>

  )
}

export default Footer;