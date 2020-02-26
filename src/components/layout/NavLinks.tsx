import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOutAction } from '../../actions/globalActions';
import useApi from '../../hooks/useApi';
import useToken from '../../hooks/useToken';
import { logout } from 'src/utils/queries';

interface Props {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen?: boolean;
}

const NavLinks: React.FC<Props> = ({ setIsOpen, isOpen }) => {
  const token = useToken();
  const dispatch = useDispatch();
  const [, call] = useApi();

  const logOut: () => Promise<void> = async () => {
    // clears refresh token and access token
    try {
      await call(logout);
      dispatch(logOutAction());
    } catch (error) {
      // no-op, will consider solution for broken logout action later
    }
    if (setIsOpen) setIsOpen(!isOpen);
  };

  return (
    <nav className='spotter-nav-links'>
      {token && (
        <Link
          data-testid='settings'
          className='spotter-nav-link'
          to='/settings'
          onClick={(): void => setIsOpen && setIsOpen(!isOpen)}
        >
          Settings
        </Link>
      )}
      {token && (
        <Link
          data-testid='logout'
          onClick={logOut}
          className='spotter-nav-link styled'
          to='/login'
        >
          Log Out{' '}
        </Link>
      )}
      {!token && (
        <Link
          data-testid='login'
          className='spotter-nav-link dashboard'
          to='/login'
          onClick={(): void => setIsOpen && setIsOpen(!isOpen)}
        >
          Log In
        </Link>
      )}
      {!token && (
        <Link
          data-testid='signup'
          className='spotter-nav-link styled'
          to='/signup'
          onClick={(): void => setIsOpen && setIsOpen(!isOpen)}
        >
          Sign Up
        </Link>
      )}
    </nav>
  );
};

export default NavLinks;
