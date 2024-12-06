import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = ({path = 'login'}) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const interval  = setInterval(() => {
     setCount((prevValue) => --prevValue)
  },1000)
  count === 0 && navigate(`/${path}`, {
    state:location.pathname
  });
  console.log(count);
  return () => clearInterval(interval);
  },[count, navigate, location, path])

  return (
    <div className='flex justify-center items-center flex-col h-screen gap-5'>
        <p className='text-center text-base lowercase font-normal'>redirecting to you in {count} seconds</p>
        <div className="w-12 h-12 rounded-full animate-spin border border-dashed border-yellow-500 border-t-transparent"></div>
    </div>
  )
}

export default Spinner;