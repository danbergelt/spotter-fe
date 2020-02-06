import React, { useState } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { api } from '../../utils/api';

const ForgotPasswordInstructions: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [res, setRes] = useState<{ err?: string; succ?: string }>({});
  const [loading, setLoading] = useState<boolean>(false);

  type T =
    | React.FormEvent<HTMLFormElement>
    | React.MouseEvent<HTMLButtonElement, MouseEvent>;

  const sendInstructions = async (e?: T): Promise<void> => {
    e?.preventDefault();
    setEmail('');
    setLoading(true);
    try {
      await axios.post(`${api()}/api/auth/user/forgotpassword`, { email });
      setLoading(false);
      setRes({ succ: 'Email sent' });
    } catch (error) {
      setLoading(false);
      setRes({ err: error.response.data.error });
    }
  };

  return (
    <section className='forgot-password-container'>
      <header className='forgot-password-title'>Forgot your password?</header>
      {res.err && <p className='forgot-password-res err'>{res.err}</p>}
      {res.succ && <p className='forgot-password-res succ'>{res.succ}</p>}
      <label className='forgot-password-label'>Email</label>
      <form
        onSubmit={(e): false | Promise<void> => !loading && sendInstructions(e)}
      >
        <input
          placeholder='name@email.com'
          onChange={(e): void => setEmail(e.target.value)}
          value={email}
          className='forgot-password-input'
        />
        <button
          style={{ border: 0, outline: 0 }}
          onClick={(e): false | Promise<void> =>
            !loading && sendInstructions(e)
          }
          className='forgot-password-submit'
        >
          {loading ? (
            <Loader type='ThreeDots' color='white' height={10} width={30} />
          ) : (
            'Send Instructions'
          )}
        </button>
      </form>
    </section>
  );
};

export default ForgotPasswordInstructions;
