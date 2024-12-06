import React from 'react';
import {UserSidebar, Heading} from '../../components';
import { useAuth } from '../../context/auth';
const Dashboard = () => {
  const {auth, setAuth } = useAuth();
  return (
    <section className='py-5'>

    <div className="container py-5">
      <div className="row g-5">
        <div className="col-md-5">
      <UserSidebar/>
        </div>
        <div className="col-md-7">
        <Heading heading="user details" textPosition={true}/>
      <div className="flex flex-col gap-2 text-center">
        <p>User Name: {auth?.user?.name}</p>
        <p>User Email: {auth?.user?.email}</p>
        <p>User Phone: {auth?.user?.phone}</p>
        <p>User Address: {auth?.user?.address}</p>
      </div>
        </div>

      </div>
    </div>
    </section>

  )
}

export default Dashboard;