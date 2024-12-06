import React from 'react';

const Heading = ({heading, textPosition}) => {
  return (
    <h2 className={textPosition ? "fs-4 text-capitalize text-center" : "fs-4 text-capitalize"}>{heading}</h2>

  )
}

export default Heading;