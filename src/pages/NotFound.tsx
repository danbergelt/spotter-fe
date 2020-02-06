import React from 'react';
import { Helmet } from 'react-helmet-async';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404 | Spotter</title>
      </Helmet>
      <section className='notfound-container'>
        <h1 className='notfound-header'>404</h1>
        <p className='notfound-content'>Page not found</p>
      </section>
    </>
  );
};

export default NotFound;
