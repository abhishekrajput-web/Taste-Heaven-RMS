import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='d-flex justify-content-center align-items-center w-100' style={{height:"100vh"}}>
        <div className='d-flex flex-column text-center'>
            <h3 className='display-2 text-secondary fw-medium'>404 Not found !</h3>
            <p className='fw-light text-secondary-emphasis fs-5'>the page you are looking is not found.</p>
            <Link className="btn btn-outline-primary" to="/">Go Back</Link>
        </div>
    </div>
  )
}

export default NotFound;