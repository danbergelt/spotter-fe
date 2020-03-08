import React, { useState, useRef, useEffect } from 'react';
import { useWindowSize } from 'react-use';
import NavLinks from './NavLinks';
import { FiMenu } from 'react-icons/fi';
import Flex from '../util/Flex';
import styles from './Nav.module.scss';
import Dropdown from '../util/Dropdown';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
  const { width } = useWindowSize();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLSpanElement>(null);

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
            <FiMenu
              className={styles.burger}
              onClick={(): void => setIsOpen(!isOpen)}
              size={22.5}
            />
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

  return (
    <Flex justify='space-between' align='center' cn={styles.container}>
      <Link data-testid='spotter' className={styles.logo} to={'/'}>
        s<span className={styles.spot}>.</span>
      </Link>
      {renderLinks()}
    </Flex>
  );
};

export default Nav;
