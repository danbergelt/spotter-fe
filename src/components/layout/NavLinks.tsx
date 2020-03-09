import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOutAction } from '../../actions/globalActions';
import useApi from '../../hooks/useApi';
import useToken from '../../hooks/useToken';
import { logoutQuery } from 'src/utils/queries';
import styles from './NavLinks.module.scss';
import { useWindowSize } from 'react-use';

/*== NavLinks =====================================================

Nav bar links. Includes:
  log in (unauth)
  sign up (unauth)
  settings (auth)
  sign out (auth)

Props:
  setIsOpen: React setStateAction
    the state setter for the burger dropdown. whenever a link is clicked, 
    close burger automatically

*/

interface Props {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavLinks: React.FC<Props> = ({ setIsOpen }) => {
  // auth token
  const token = useToken();
  // used to style links depending on window size
  const { width } = useWindowSize();
  // store dispatcher
  const dispatch = useDispatch();
  // api utils
  const [, call] = useApi();

  // if the menu is open, close it
  const closeMenu = (): void => setIsOpen && setIsOpen(false);

  // on logout close the menu, dispatch a log out action (wipes global),
  // and send a logout query to server
  const logOutUser = async (): Promise<void> => {
    closeMenu();
    dispatch(logOutAction());
    await call(logoutQuery);
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
