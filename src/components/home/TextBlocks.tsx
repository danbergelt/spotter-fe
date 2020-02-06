import React from 'react';
import { FiEdit3, FiTarget, FiCalendar } from 'react-icons/fi';

export const TextBlocks: React.FC = () => {
  const strokeWidth = { strokeWidth: 1.25 };

  return (
    <article className='textblocks-container' id='about'>
      <header className='textblocks-title'>
        Spotter is a lifting-focused fitness pal that helps you...
      </header>
      <section className='textblocks'>
        <div className='textblock'>
          <div className='textblock-icon track'>
            <FiEdit3 style={strokeWidth} />
          </div>
          <p className='textblock-title'>Track your lifts</p>
          <p className='textblock-content'>
            Our dashboard{' '}
            <span className='textblock-highlight'>
              automates your fitness journey
            </span>{' '}
            and makes tracking your lifts fun and easy.
          </p>
        </div>
        <div className='textblock'>
          <div className='textblock-icon bests'>
            <FiTarget style={strokeWidth} />
          </div>
          <p className='textblock-title'>Log your personal bests</p>
          <p className='textblock-content'>
            Save the exercises you want tracked, and we&#39;ll{' '}
            <span className='textblock-highlight'>
              calculate your PRs automatically.
            </span>
          </p>
        </div>
        <div className='textblock'>
          <div className='textblock-icon scale'>
            <FiCalendar style={strokeWidth} />
          </div>
          <p className='textblock-title'>Stay organized</p>
          <p className='textblock-content'>
            Spreadsheets are unwieldy.{' '}
            <span className='textblock-highlight'>Access, view, and edit</span>{' '}
            any of your workouts, with ease.
          </p>
        </div>
      </section>
    </article>
  );
};

export default TextBlocks;
