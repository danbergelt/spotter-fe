import * as Yup from 'yup';

export const ValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Enter your old password'),
  newPassword: Yup.string().required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Enter your new password')
    .min(6, 'Six character minimum')
});
