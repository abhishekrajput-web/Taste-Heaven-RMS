
// video hero page
// import React from 'react';

// const HeroBanner = () => {
//   return (
//     <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
//       <div className="carousel-inner">

//       <div className="carousel-item active">
//           <video className='hero-video' src="../../../hero-videos/bg_video1.mp4" autoPlay loop muted />
//         </div>

//         <div className="carousel-item">
//           <video className='hero-video' src="../../../hero-videos/bg_video2.mp4" autoPlay loop muted />
//         </div>
    
    
//         <div className="carousel-item">
//           <video className='hero-video' src="../../../hero-videos/bg_video3.mp4" autoPlay loop muted />
//         </div>

//         <div className="carousel-item">
//           <video className='hero-video' src="../../../hero-videos/bg_video4.mp4" autoPlay loop muted />
//         </div>

  
//       </div>

//       <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
//         <span className="carousel-control-prev-icon" aria-hidden="true" />
//         <span className="visually-hidden">Previous</span>
//       </button>
//       <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
//         <span className="carousel-control-next-icon" aria-hidden="true" />
//         <span className="visually-hidden">Next</span>
//       </button>
//     </div>
//   );
// };

// export default HeroBanner;








// new animated text hero page
import React from 'react';

const HeroBanner = () => {
  return (
<div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <video className="hero-video" src="../../../hero-videos/bg_video1.mp4" autoPlay loop muted />
      <div className="carousel-caption d-flex flex-column align-items-center">
        <h1 className="animated-text">Welcome to Taste Heaven</h1>
        <p className="animated-subtext">Where great food meets unforgettable moments!</p>
      </div>
    </div>

    <div className="carousel-item">
      <video className="hero-video" src="../../../hero-videos/bg_video2.mp4" autoPlay loop muted />
      <div className="carousel-caption d-flex flex-column align-items-center">
        <h1 className="animated-text">Your Table Awaits!</h1>
        <p className="animated-subtext">Join us for a feast of flavors crafted with love.</p>
      </div>
    </div>

    <div className="carousel-item">
      <video className="hero-video" src="../../../hero-videos/bg_video3.mp4" autoPlay loop muted />
      <div className="carousel-caption d-flex flex-column align-items-center">
        <h1 className="animated-text">Taste the Difference</h1>
        <p className="animated-subtext">Experience freshly made dishes and exceptional service.</p>
      </div>
    </div>

    <div className="carousel-item">
      <video className="hero-video" src="../../../hero-videos/bg_video4.mp4" autoPlay loop muted />
      <div className="carousel-caption d-flex flex-column align-items-center">
        <h1 className="animated-text">Good Food, Great Vibes</h1>
        <p className="animated-subtext">Come hungry, leave happy.</p>
      </div>
    </div>
  </div>

  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

  );
};

export default HeroBanner;