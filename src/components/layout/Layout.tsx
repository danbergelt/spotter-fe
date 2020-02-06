import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

interface Props {
  // eslint-disable-next-line
  children: any;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
