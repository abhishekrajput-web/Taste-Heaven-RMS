

import React from 'react';
import { AdminSidebar, Heading } from '../../components';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
  const { auth } = useAuth();

  return (
    <section className='py-5'>
      <div className="container py-3">
        <div className="row g-5">
          <div className="col-md-4 col-lg-3">
            <AdminSidebar />
          </div>

          <div className="col-md-8 col-lg-9">
            <Heading heading="Admin Detail" />
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-center">Admin Information</h5>
                <div className="d-flex flex-column gap-3">
                  <div className="p-3 border rounded bg-light">
                    <p className="fs-6 text-capitalize"><strong>Name:</strong> {auth?.user?.name}</p>
                  </div>
                  <div className="p-3 border rounded bg-light">
                    <p className="fs-6 text-capitalize"><strong>Email:</strong> {auth?.user?.email}</p>
                  </div>
                  <div className="p-3 border rounded bg-light">
                    <p className="fs-6 text-capitalize"><strong>Phone:</strong> {auth?.user?.phone}</p>
                  </div>
                  <div className="p-3 border rounded bg-light">
                    <p className="fs-6 text-capitalize"><strong>Address:</strong> {auth?.user?.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
