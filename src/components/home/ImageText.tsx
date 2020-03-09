import React from 'react';
import image from '../../assets/imagetext.png';
import { Link } from 'react-router-dom';
import Flex from '../lib/Flex';
import { useWindowSize } from 'react-use';
import styles from './ImageText.module.scss';

/*== Image text =====================================================

Alternate homepage CTA that features an image of the workout modal

*/

const ImageText: React.FC = () => {
  // used to dynamically change flex styling
  const { width } = useWindowSize();

  return (
    <Flex
      align='center'
      justify='center'
      fd={width <= 800 ? 'column-reverse' : undefined}
      cn={styles.container}
    >
      <div>
        <img className={styles.image} src={image} alt='Dashboard View' />
      </div>
      <Flex fd='column' justify='space-between' cn={styles.content}>
        <p className={styles.title}>For people who lift, by people who lift</p>
        <p className={styles.text}>
          Excel is a drag, tracking by hand is unsustainable, and other apps are
          bloated with unnecessary features.
        </p>
        <p className={styles.text}>
          With Spotter, tracking your lifts has never been easier.
        </p>
        <Link data-testid='imgtxt' className={styles.cta} to='/signup'>
          Get Tracking
        </Link>
      </Flex>
    </Flex>
  );
};

export default ImageText;
