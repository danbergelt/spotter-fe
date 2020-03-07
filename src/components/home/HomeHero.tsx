import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <article className='home-hero-container' style={{ margin: 0 }}>
      <section className='home-hero-main'>
        <p className='home-hero-main-text'>
          A <span className='home-hero-sub-text-highlight'>lifting pal</span>{' '}
          that includes what you need, and cuts the BS
        </p>
      </section>
      <section className='home-hero-sub'>
        <p className='home-hero-sub-text'>
          Stop living in Excel. Track your lifts with{' '}
          <span className='alt'>Spotter</span>, and go crush some PRs.
        </p>
      </section>
      <Link to='/signup' className='home-hero-reg'>
        Sign up
      </Link>
      <p className='home-hero-alt-signin'>
        Already have an account?{' '}
        <Link to='/login' className='home-hero-alt-signin-link'>
          Log in.
        </Link>
      </p>
    </article>
  );
};

export default Hero;
