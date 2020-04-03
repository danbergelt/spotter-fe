import React from 'react';
import { Link } from 'react-router-dom';
import Flex from '../lib/Flex';
import styles from './HomeHero.module.scss';
import AltLink from '../lib/AltLink';

/*== Splash page hero =====================================================

The hero section of the splash page. Features prominent CTAs to login and
signup

*/

const Hero: React.FC = () => {
  return (
    <Flex fd='column' align='center' css={styles.container}>
      <section>
        <h1 className={styles.title}>
          A <span className={styles.alt}>lifting pal</span> that includes what
          you need, and cuts the BS
        </h1>
      </section>
      <section className={styles.sub}>
        <p className={styles.text}>
          Stop living in Excel. Track your lifts with{' '}
          <span className={styles.subAlt}>Spotter</span>, and go crush some PRs.
        </p>
      </section>
      <Link data-testid='hero' to='/signup' className={styles.btn}>
        Sign up
      </Link>
      <AltLink
        content='Already have an account? '
        linkContent='Log in.'
        path='/login'
      />
    </Flex>
  );
};

export default Hero;
