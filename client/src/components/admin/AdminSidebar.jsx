import React from 'react'
import { NavLink } from 'react-router-dom'
const AdminSidebar = () => {
  return (
    <div>
  <div className='d-flex flex-column gap-2'>
  <h2 className='fs-4 text-capitalize'> Admin Panel</h2>
  <NavLink to="/dashboard/admin/create-category" className='btn btn-outline-primary'>
    Create Category
  </NavLink>
  <NavLink to="/dashboard/admin/create-product" className='btn btn-outline-primary'>
    Create Products
  </NavLink>
  <NavLink to="/dashboard/admin/products" className='btn btn-outline-primary'>
     Products
  </NavLink>
  <NavLink to="/dashboard/admin/orders" className='btn btn-outline-primary'>
     Admin Orders
  </NavLink>
  {/* <NavLink to="/dashboard/admin/users" className='btn btn-outline-primary'>
    Users
  </NavLink> */}
  </div>
  </div>
  )
}

export default AdminSidebar