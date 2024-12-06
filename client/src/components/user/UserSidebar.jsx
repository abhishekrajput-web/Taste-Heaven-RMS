import React from 'react';
import { NavLink } from 'react-router-dom'

const UserSidebar = () => {
  return (
  <div>
  <div className='d-flex flex-column gap-2'>
    <h2 className='fs-4 text-capitalize text-center'> User Panel</h2>
  <NavLink to="/dashboard/user/profile" className='btn btn-outline-primary'>
    Profile
  </NavLink>
  <NavLink to="/dashboard/user/orders" className='btn btn-outline-primary'>
    Orders
  </NavLink>
  <NavLink to="/dashboard/user/feedbacks" className='btn btn-outline-primary'>
    Feedback
  </NavLink>
  </div>
  </div>
  )
}

export default UserSidebar