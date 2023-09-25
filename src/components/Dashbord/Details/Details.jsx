import React from 'react';
import DetailsHeader from './DetailsHeader';
import EmailDetails from './EmailDetails';

const Details = () => {
  
  return (
    <div className='dashbord dashbord-details'>
      <DetailsHeader/>
      <div className="dashbord-body body-details">
        <EmailDetails/>
      </div>
    </div>
  )
}

export default Details