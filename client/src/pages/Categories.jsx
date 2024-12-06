
import React from 'react';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';
import { Heading } from '../components';
const Categories = () => {
    const categories = useCategory();
  return (
    <section className='py-5'>
    <div className='container py-5'>
    <Heading heading="all categories" textPosition={true}/>
      {/* <h2 className='text-center fw-normal text-decoration-underline'>All Categories</h2> */}
      <div className='row g-5 py-3'>
        {categories.map((c, i) => (
          <div className='col-sm-6 col-md-6 col-lg-4 col-xl-3' key={i}>
          <div className='d-flex justify-content-center align-items-center bg-warning' key={i}>
           <Link className='text-white fs-5 p-4 rounded-left rounded-bottom text-capitalize categories' to={`/category/${c.slug}`}>
           {c?.name}
           </Link>
          </div>
          </div>
        ) )}
        </div>
      </div>
        </section>
  )
}

export default Categories;












