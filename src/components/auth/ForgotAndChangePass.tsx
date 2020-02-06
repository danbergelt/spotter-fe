import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addTokenAction } from 'src/actions/globalActions';
import Loader from 'react-loader-spinner';
import { api } from '../../utils/api';

// hidden page that allows a user to change their password when forgotten
// accessed via link sent out through mailgun
// param is their reset password token

// CODE SMELL
// handling a lot of stuff manually here,
// consider refactoring to something like Formik for automation
const ForgotAndChangePass: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [res, setRes] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const changePass = async (
    e?: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e?.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        `${api()}/api/auth/user/forgotpassword/${id}`,
        { newPassword, confirmPassword },
        { withCredentials: true }
      );
      dispatch(addTokenAction(res.data.token));
      history.push('/dashboard');
    } catch (error) {
      setLoading(false);
      setRes(error.response.data.error);
    }
  };

  return (
    <section className='forgot-password-container'>
      <header className='forgot-password-title'>Change Password</header>
      {res && (
        <p style={{ marginTop: '2rem' }} className='forgot-password-res err'>
          {res}
        </p>
      )}
      <form onSubmit={(e): false | Promise<void> => !loading && changePass(e)}>
        <label className='forgot-password-label'>New Password</label>
        <input
          type='password'
          placeholder='Pick a secure password...'
          onChange={(e): void => setNewPassword(e.target.value)}
          value={newPassword}
          className='forgot-password-input'
        />
        <label className='forgot-password-label'>Confirm New Password</label>
        <input
          type='password'
          placeholder='Confirm secure password...'
          onChange={(e): void => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          className='forgot-password-input'
        />
        <button
          style={{ outline: 0, border: 0 }}
          className='forgot-password-submit'
        >
          {loading ? (
            <Loader type='ThreeDots' color='white' height={10} width={30} />
          ) : (
            'Change Password'
          )}
        </button>
      </form>
    </section>
  );
};

export default ForgotAndChangePass;
