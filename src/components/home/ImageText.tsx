import React from 'react';
import image from '../../assets/imagetext.png';
import { Link } from 'react-router-dom';

const ImageText: React.FC = () => {
  return (
    <article className='imagetext-container'>
      <section>
        <img className='imagetext-image' src={image} alt='Dashboard View' />
      </section>
      <section className='imagetext-content-container'>
        <p className='imagetext-title'>
          For people who lift, by people who lift
        </p>
        <p className='imagetext-text'>
          Excel is a drag, tracking by hand is unsustainable, and other apps are
          bloated with unnecessary features.
        </p>
        <p className='imagetext-text'>
          With Spotter, tracking your lifts has never been easier.
        </p>
        <Link className='imagetext-cta' to='/signup'>
          Get Tracking
        </Link>
      </section>
    </article>
  );
};

export default ImageText;
