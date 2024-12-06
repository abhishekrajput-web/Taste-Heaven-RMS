import React from 'react';
import { Heading } from '../../components';

const Policy = () => {
  return (
    <section className='py-5'>
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-md-6 col-lg-6">
            <img src="https://images.pexels.com/photos/7735625/pexels-photo-7735625.jpeg?auto=compress&cs=tinysrgb&w=600" className='img-fluid' alt="about-us" />
          </div>
          <div className="col-md-6 col-lg-6">
            <div>
              <Heading heading="policy" textPosition={true} />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi nihil nisi quibusdam ut, voluptates perspiciatis molestias cumque autem iste in doloribus eos expedita! Quidem facilis adipisci est sed. Placeat, ipsa?</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi nihil nisi quibusdam ut, voluptates perspiciatis molestias cumque autem iste in doloribus eos expedita! Quidem facilis adipisci est sed. Placeat, ipsa?</p>
              <button class="btn btn-outline-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">More About Policy</button>

              <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Policy Rules</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                  <div className='d-flex flex-column gap-4'>
                    <img src="https://images.pexels.com/photos/1367276/pexels-photo-1367276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className='img-fluid' alt="" />
                    <p>At s, accessible from a, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by s and how we use it.
                    </p>
                    <p>
                      If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                    </p>
                    <p>
                      This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in s. This policy is not applicable to any information collected offline or via channels other than this website
                    </p>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Policy;