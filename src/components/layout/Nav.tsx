import React, { useState, useRef, useEffect } from 'react';
import { useWindowSize, useWindowScroll } from 'react-use';
import NavLinks from './NavLinks';
import { FiMenu, FiX } from 'react-icons/fi';
import Flex from '../util/Flex';
import styles from './Nav.module.scss';
import Dropdown from '../util/Dropdown';
import { Link, useLocation } from 'react-router-dom';

const Nav: React.FC = () => {
  const { width } = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLSpanElement>(null);
  const { pathname } = useLocation();
  const { y } = useWindowScroll();

  useEffect(() => {
    if (width > 500) {
      setIsOpen(false);
    }
  }, [width]);

  const renderLinks = (): JSX.Element => {
    if (width <= 500) {
      return (
        <>
          <span ref={menuRef}>
            {isOpen ? (
              <FiX
                className={styles.mobile}
                onClick={(): void => setIsOpen(!isOpen)}
                size={20}
              />
            ) : (
              <FiMenu
                className={styles.mobile}
                onClick={(): void => setIsOpen(!isOpen)}
                size={20}
              />
            )}
          </span>
          {isOpen && (
            <Dropdown triggerRef={menuRef} setState={setIsOpen}>
              <NavLinks setIsOpen={setIsOpen} />
            </Dropdown>
          )}
        </>
      );
    } else {
      return <NavLinks />;
    }
  };

  const checkPath = (): boolean => pathname === '/';

  return (
    <div
      style={{
        position: checkPath() ? 'fixed' : undefined,
        width: checkPath() ? '100%' : undefined
      }}
      className={checkPath() && y > 50 ? styles.scrolling : undefined}
    >
      <Flex
        justify='space-between'
        align={width <= 500 ? 'flex-end' : undefined}
        cn={styles.container}
      >
        <Link className={styles.logo} data-testid='spotter' to={'/'}>
          spotter
        </Link>
        {renderLinks()}
      </Flex>
    </div>
  );
};

export default Nav;
