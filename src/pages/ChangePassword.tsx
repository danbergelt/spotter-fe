/** @jsx jsx */
import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { ChangeForgottenPasswordSchema } from '../utils/validators';
import FormError from 'src/components/util/FormError';
import useApi from 'src/hooks/useApi';
import { changeForgottenPasswordQuery } from 'src/utils/queries';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTokenAction } from 'src/actions/globalActions';
import HTTPResponse from 'src/components/util/HTTPResponse';
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import Box from '../components/ui/HeroBox';
// import styled from '@emotion/styled';
// import { defaultBoxShadow } from 'src/styles/variables';
// import { mq } from 'src/styles/mediaQueries';

// allows a user to change a forgotten password
// accessed via link sent out through mailgun
// param is their reset password token

const ChangePassword: React.FC = () => {
  const { id } = useParams();
  const [res, call] = useApi();
  const dispatch = useDispatch();
  const history = useHistory();
  const { mq, colors } = useTheme();

  // if request is successful, save the token and push user to dashboard
  useEffect(() => {
    if (res.data) {
      dispatch(addTokenAction(res.data.token));
      history.push('/dashboard');
    }
  }, [res, dispatch, history]);

  return (
    <Formik
      initialValues={{ newPassword: '', confirmPassword: '' }}
      validationSchema={ChangeForgottenPasswordSchema}
      onSubmit={async (values): Promise<void> => {
        await call(changeForgottenPasswordQuery, [values, id]);
      }}
    >
      {({ errors, touched }): JSX.Element => (
        <Box>
          <h1
            css={css`
              font-size: 3rem;
              color: ${colors.grays[0]};
              margin-bottom: 4rem;
              text-align: center;
              ${mq.md} {
                font-size: 2.5rem;
              }
              ${mq.sm} {
                font-size: 2rem;
                margin-bottom: 2rem;
              }
            `}
          >
            Change Password
          </h1>
          <HTTPResponse error={res.error} />
          <Form>
            <FormError touched={touched} errors={errors} node='newPassword' />
            <Field
              name='newPassword'
              placeholder='New password'
              type='password'
            />
            <FormError
              touched={touched}
              errors={errors}
              node='confirmPassword'
            />
            <Field
              name='confirmPassword'
              placeholder='Confirm password'
              type='password'
            />
            <button>Submit</button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default ChangePassword;

// const Stale: React.FC = () => {
//   const { id } = useParams();
//   const history = useHistory();
//   const dispatch = useDispatch();

//   const [newPassword, setNewPassword] = useState<string>('');
//   const [confirmPassword, setConfirmPassword] = useState<string>('');
//   const [res, setRes] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);

//   const changePass = async (
//     e?: React.FormEvent<HTMLFormElement>
//   ): Promise<void> => {
//     e?.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.put(
//         endpoint(`user/forgotpassword/${id}`),
//         { newPassword, confirmPassword },
//         { withCredentials: true }
//       );
//       dispatch(addTokenAction(res.data.token));
//       history.push('/dashboard');
//     } catch (error) {
//       setLoading(false);
//       setRes(error.response.data.error);
//     }
//   };

//   return (
//     <section className='forgot-password-container'>
//       <header className='forgot-password-title'>Change Password</header>
//       {res && (
//         <p style={{ marginTop: '2rem' }} className='forgot-password-res err'>
//           {res}
//         </p>
//       )}
//       <form onSubmit={(e): false | Promise<void> => !loading && changePass(e)}>
//         <label className='forgot-password-label'>New Password</label>
//         <input
//           type='password'
//           placeholder='Pick a secure password...'
//           onChange={(e): void => setNewPassword(e.target.value)}
//           value={newPassword}
//           className='forgot-password-input'
//         />
//         <label className='forgot-password-label'>Confirm New Password</label>
//         <input
//           type='password'
//           placeholder='Confirm secure password...'
//           onChange={(e): void => setConfirmPassword(e.target.value)}
//           value={confirmPassword}
//           className='forgot-password-input'
//         />
//         <button
//           style={{ outline: 0, border: 0 }}
//           className='forgot-password-submit'
//         >
//           {loading ? (
//             <Loader type='ThreeDots' color='white' height={10} width={30} />
//           ) : (
//             'Change Password'
//           )}
//         </button>
//       </form>
//     </section>
//   );
// };
