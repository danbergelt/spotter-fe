import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Footer.module.scss';
import Flex from '../util/Flex';

const Footer: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <Flex justify='center' cn={pathname === '/' ? styles.home : styles.site}>
      <p>Spotter © 2020. All Rights Reserved.</p>
    </Flex>
  );
};

export default Footer;
