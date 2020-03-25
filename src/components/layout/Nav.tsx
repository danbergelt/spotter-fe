import React, { useState, useRef, useEffect } from 'react';
import { useWindowSize } from 'react-use';
import NavLinks from './NavLinks';
import { FiMenu, FiX } from 'react-icons/fi';
import Flex from '../lib/Flex';
import styles from './Nav.module.scss';
import Dropdown from '../lib/Dropdown';
import { Link } from 'react-router-dom';

/*== Nav =====================================================

Nav bar wrapper component. Depending on window width, either
renders a burger dropdown (sub 500 width) or a normal nav

*/

const Nav: React.FC = () => {
  // window width to set menu (mobile or desktop)
  const { width } = useWindowSize();
  // mobile menu open state
  const [isOpen, setIsOpen] = useState(false);
  // ref for mobile menu (passed to dropdown, allows dropdown close on menu onClick)
  const menuRef = useRef<HTMLSpanElement>(null);

  // automatically closes menu when user resizes desktop from small --> large
  useEffect(() => {
    if (width > 500) {
      setIsOpen(false);
    }
  }, [width]);

  // function that, depending on viewport width, either renders mobile menu or desktop menu
  const renderLinks = (): JSX.Element => {
    if (width <= 500) {
      return (
        <>
          <span data-testid='burger' ref={menuRef}>
            {isOpen ? (
              // if menu is open, render an X to close it
              <FiX
                className={styles.mobile}
                onClick={(): void => setIsOpen(!isOpen)}
                size={20}
              />
            ) : (
              // if menu is closed, render a hamburger
              <FiMenu
                className={styles.mobile}
                onClick={(): void => setIsOpen(!isOpen)}
                size={20}
              />
            )}
          </span>
          {isOpen && (
            // if burger is clicked, render a dropdown with the nav links
            <Dropdown
              top='35px'
              right='25px'
              refs={[menuRef]}
              setState={setIsOpen}
            >
              <NavLinks setIsOpen={setIsOpen} />
            </Dropdown>
          )}
        </>
      );
    } else {
      return <NavLinks />;
    }
  };

  return (
    <Flex
      justify='space-between'
      align={width <= 500 ? 'flex-end' : 'center'}
      css={styles.container}
    >
      <Link className={styles.logo} data-testid='spotter' to={'/'}>
        spotter
      </Link>
      {renderLinks()}
    </Flex>
  );
};

export default Nav;
