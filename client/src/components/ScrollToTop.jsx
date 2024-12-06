

import React, { useState, useEffect } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    console.log('Scrolled:', scrolled); // Debugging log
    setVisible(scrolled > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  return (
    <button
      className="btn btn-primary position-fixed bottom-3 end-2 rounded-circle p-3"
      style={{
        display:'block', // Only show when scrolled down
        fontSize: '2rem', // Increased font size for visibility
        width: '70px', // Adjust width for better spacing
        height: '70px', // Adjust height for better spacing
		position:"relative",
		top:"60%",
		left:"70%"
      }}
      onClick={scrollToTop}
    >
		<h1>lmald;d;ama</h1>
      <FaArrowCircleUp size={50} /> {/* Increased icon size */}
    </button>
  );
};

export default ScrollToTop;