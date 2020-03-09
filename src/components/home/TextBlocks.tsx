import React from 'react';
import { FiEdit3, FiTarget, FiCalendar } from 'react-icons/fi';
import styles from './TextBlocks.module.scss';
import Flex from '../lib/Flex';
import { useWindowSize } from 'react-use';

export const TextBlocks: React.FC = () => {
  const STROKE_WIDTH = '1.25px';

  const { width } = useWindowSize();

  return (
    <Flex align='center' fd='column' cn={styles.container}>
      <h2 className={styles.title}>
        Spotter is a lifting-focused fitness pal that helps you...
      </h2>
      <Flex
        fd={width <= 800 ? 'column' : undefined}
        align={width <= 800 ? 'center' : undefined}
        justify='space-between'
        cn={styles.blocks}
      >
        <div className={styles.block}>
          <div className={`${styles.icon} ${styles.track}`}>
            <FiEdit3 strokeWidth={STROKE_WIDTH} />
          </div>
          <p className={styles.blockTitle}>Track your lifts</p>
          <p className={styles.content}>
            Our dashboard{' '}
            <span className={styles.highlight}>
              automates your fitness journey
            </span>{' '}
            and makes tracking your lifts fun and easy.
          </p>
        </div>
        <div className={styles.block}>
          <div className={`${styles.icon} ${styles.bests}`}>
            <FiTarget strokeWidth={STROKE_WIDTH} />
          </div>
          <p className={styles.blockTitle}>Log your personal bests</p>
          <p className={styles.content}>
            Save the exercises you want tracked, and we&#39;ll{' '}
            <span className={styles.highlight}>
              calculate your PRs automatically.
            </span>
          </p>
        </div>
        <div className={styles.block}>
          <div className={`${styles.icon} ${styles.scale}`}>
            <FiCalendar strokeWidth={STROKE_WIDTH} />
          </div>
          <p className={styles.blockTitle}>Stay organized</p>
          <p className={styles.content}>
            Spreadsheets are unwieldy.{' '}
            <span className={styles.highlight}>Access, view, and edit</span> any
            of your workouts, with ease.
          </p>
        </div>
      </Flex>
    </Flex>
  );
};

export default TextBlocks;
