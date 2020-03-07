import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { useWindowSize, useWindowScroll } from 'react-use';
import { styles } from './MobileMenuStyles';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavLinks from './NavLinks';

const Nav: React.FC = () => {
  const { width }: { width: number } = useWindowSize();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { pathname } = useLocation();

  const { y } = useWindowScroll();

  return width <= 500 ? (
    <div className='spacer' style={{ display: 'flex', alignItems: 'center' }}>
      <Menu
        isOpen={isOpen}
        onStateChange={(state): void => setIsOpen(state.isOpen)}
        disableAutoFocus
        width={210}
        right
        styles={styles}
      >
        <div className='spotter-nav spacer'>
          <section className='spotter-nav-head'></section>
          <NavLinks isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </Menu>
      <Link data-testid='spotter' className='spotter-nav-head-logo' to={'/'}>
        s<span className='spot'>.</span>
      </Link>
    </div>
  ) : (
    <div
      style={{
        position: width > 1000 && pathname === '/' ? 'fixed' : undefined,
        paddingBottom: pathname === '/' ? '1.5rem' : undefined,
        boxShadow:
          pathname === '/' && y > 100
            ? '0 2px 12px 0 rgba(36,50,66,.075)'
            : undefined,
        width: '100%',
        transition:
          pathname === '/' && y > 100
            ? 'box-shadow .3s ease-in-out'
            : undefined,
        background: pathname === '/' && y > 100 ? 'white' : undefined
      }}
    >
      <div className='spotter-nav spacer'>
        <section className='spotter-nav-head'>
          <Link
            data-testid='spotter'
            className='spotter-nav-head-logo'
            to={'/'}
          >
            s<span className='spot'>.</span>
          </Link>
        </section>
        <NavLinks />
      </div>
    </div>
  );
};

export default Nav;
