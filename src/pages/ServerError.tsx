import React from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './Fallback.module.scss';
import Flex from 'src/components/lib/Flex';

/*== 500 =====================================================

Renders when a top level server error occurs. Could be when server
dies, when uncaught error happens --> user gets pushed here.

TODO --> implement global error boundary to provide a fallback,
probably will push user to this page.

*/

const ServerError: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>500 | Spotter</title>
      </Helmet>
      <Flex fd='column' justify='center' align='center' css={styles.container}>
        <h1 className={styles.header}>500</h1>
        <p className={styles.content}>Server error</p>
      </Flex>
    </>
  );
};

export default ServerError;
