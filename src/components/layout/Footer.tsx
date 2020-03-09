import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Footer.module.scss';
import Flex from '../lib/Flex';

/*== Footer =====================================================

Basic copyright statement, not much to see here. When spotter scales
up there might be room here to expand. For now, keeping this minimal
to not distract from the rest of the site

*/

const Footer: React.FC = () => {
  const { pathname } = useLocation();

  return (
    // if user is home, display a different background (since bottom of homepage is gray, not white)
    <Flex justify='center' cn={pathname === '/' ? styles.home : styles.site}>
      <p>Spotter © 2020. All Rights Reserved.</p>
    </Flex>
  );
};

export default Footer;
