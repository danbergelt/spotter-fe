import React from 'react';
import { Helmet } from 'react-helmet-async';
import Flex from 'src/components/lib/Flex';
import styles from './NotFound.module.scss';

/*== 404 =====================================================

A 404 page --> renders when a user visits a page that does not
exist

*/

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404 | Spotter</title>
      </Helmet>
      <Flex fd='column' justify='center' align='center' css={styles.container}>
        <h1 className={styles.header}>404</h1>
        <p className={styles.content}>Page not found</p>
      </Flex>
    </>
  );
};

export default NotFound;
