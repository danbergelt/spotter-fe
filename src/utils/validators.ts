import * as Yup from 'yup';

// change password validation (forgotten passwords)
export const ChangeForgottenPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, 'Six char minimum')
    .required('Pick new password'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('newPassword')],
    'Fields must match'
  )
});
