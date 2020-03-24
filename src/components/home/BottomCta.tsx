import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BottomCta.module.scss';

/*== Homepage CTA =====================================================

This component is a final CTA at the bottom of the splash page (route '/')

Clicking the link directs you to signup

*/

const BottomCta: React.FC = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Log your first workout</h2>
      <Link data-testid='bottom-cta' className={styles.cta} to='/signup'>
        Get Tracking
      </Link>
    </section>
  );
};

export default BottomCta;
