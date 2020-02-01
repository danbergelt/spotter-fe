import React from 'react';
import { Link } from 'react-router-dom';

const BottomCta: React.FC = () => {
  return (
    <section className='bottomcta-container'>
      <p className='bottomcta-title'>Log your first workout</p>
      <Link
        className='bottomcta-cta'
        style={{ color: 'white', textDecoration: 'none' }}
        to='/signup'
      >
        Get Tracking
      </Link>
    </section>
  );
};

export default BottomCta;
