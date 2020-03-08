import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOutAction } from '../../actions/globalActions';
import useApi from '../../hooks/useApi';
import useToken from '../../hooks/useToken';
import { logout } from 'src/utils/queries';
import styles from './NavLinks.module.scss';
import { useWindowSize } from 'react-use';

interface Props {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavLinks: React.FC<Props> = ({ setIsOpen }) => {
  const token = useToken();
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const [, call] = useApi();

  const closeMenu = (): void => setIsOpen && setIsOpen(false);

  const logOutUser = async (): Promise<void> => {
    closeMenu();
    dispatch(logOutAction());
    await call(logout);
  };

  return (
    <nav className={styles.links}>
      {token && (
        <Link
          data-testid='settings'
          className={styles.link}
          to='/settings'
          onClick={closeMenu}
        >
          Settings
        </Link>
      )}
      {token && (
        <Link
          data-testid='logout'
          onClick={logOutUser}
          className={width <= 500 ? styles.link : styles.btn}
          to='/login'
        >
          Log Out{' '}
        </Link>
      )}
      {!token && (
        <Link
          data-testid='login'
          className={styles.link}
          to='/login'
          onClick={closeMenu}
        >
          Log In
        </Link>
      )}
      {!token && (
        <Link
          data-testid='signup'
          className={width <= 500 ? styles.link : styles.btn}
          to='/signup'
          onClick={closeMenu}
        >
          Sign Up
        </Link>
      )}
    </nav>
  );
};

export default NavLinks;
