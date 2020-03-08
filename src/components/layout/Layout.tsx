import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

/*== Layout wrapper =====================================================

This component wraps all JSX on the site with a nav and footer. Is
implemented on the App component

Props:
  children: JSX
    the site content

*/

interface Props {
  children: JSX.Element;
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
