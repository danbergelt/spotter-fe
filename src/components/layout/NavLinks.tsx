import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchToken } from '../../types/State';
import { logOutAction } from '../../actions/globalActions';

interface Props {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen?: boolean;
}

const NavLinks: React.FC<Props> = ({ setIsOpen, isOpen }) => {
  const token: string | null = useSelector(fetchToken);
  const dispatch = useDispatch();

  const logOut: () => void = () => {
    // clears refresh token and access token
    dispatch(logOutAction());
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
