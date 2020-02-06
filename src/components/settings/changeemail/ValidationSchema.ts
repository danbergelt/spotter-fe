import * as Yup from 'yup';

export const ValidationSchema = Yup.object().shape({
  oldEmail: Yup.string()
    .email('Invalid email')
    .required('Enter your old email'),
  newEmail: Yup.string()
    .email('Invalid email')
    .required(),
  confirmEmail: Yup.string()
    .email('Invalid email')
    .oneOf([Yup.ref('newEmail'), null], 'Emails must match')
    .required('Enter your new email')
});
