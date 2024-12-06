import React from 'react';
import { Heading } from '../../components';

const About = () => {
  return (
    <section className='py-5'>
      <div className="container py-5">
        <div className="row g-5 py-3">
          <div className="col-md-6 col-lg-6">
            <img src="https://images.pexels.com/photos/7433822/pexels-photo-7433822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className='img-fluid' alt="about-us" />
          </div>
          <div className="col-md-6 col-lg-6">
            <div>
            <Heading heading="about us" textPosition={true}/>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi nihil nisi quibusdam ut, voluptates perspiciatis molestias cumque autem iste in doloribus eos expedita! Quidem facilis adipisci est sed. Placeat, ipsa?</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi nihil nisi quibusdam ut, voluptates perspiciatis molestias cumque autem iste in doloribus eos expedita! Quidem facilis adipisci est sed. Placeat, ipsa?</p>
              <button class="btn btn-outline-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Explore More</button>

              <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasScrollingLabel">More About Us</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                  <div className='d-flex flex-column gap-4'>
                    <img src="https://images.pexels.com/photos/1367276/pexels-photo-1367276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className='img-fluid' alt="" />
                    <p className='fs-6'>Contact - +19230-2134-1246</p>
                    <p className='fs-6'>Gmail - fashionist@gmail.com</p>
                    <p className='fs-6'>Adress - New York City </p>
                    <p className='fs-6'>Pincode - 789845</p>

                  </div>
         

                </div>
              </div>
            </div>
          </div>
        </div>


        <div className='row g-4 py-5'>
        <Heading heading="our community" textPosition={true}/>
          {/* <h2 className='fs-4 text-cappitalize'>Our Community</h2> */}
          <div className="col-lg-3 col-md-4 col-sm-6">
            <img src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="community" className='img-fluid' />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <img src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="community" className='img-fluid' />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <img src="https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="community" className='img-fluid' />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <img src="https://images.pexels.com/photos/3183157/pexels-photo-3183157.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="community" className='img-fluid' />
          </div>
        </div>

      </div>
    </section>
  )
}

export default About;