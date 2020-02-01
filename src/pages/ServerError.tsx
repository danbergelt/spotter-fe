import React from 'react';
import { Helmet } from 'react-helmet-async';

const ServerError: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>500 | Spotter</title>
      </Helmet>
      <section className='notfound-container'>
        <h1 className='notfound-header'>500</h1>
        <p className='notfound-content'>Server error. Please try again later</p>
      </section>
    </>
  );
};

export default ServerError;
