import * as Yup from 'yup';

// auth form (log in/sign up)
export const AuthSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Six char minimum')
    .required('Password is required')
});

// change password (forgotten passwords)
export const ChangeForgottenPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, 'Six char minimum')
    .required('Pick new password'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('newPassword')],
    'Fields must match'
  )
});

// send change password link (forgotten passwords)
export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Enter your email')
});

// contact form
export const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required')
});

// change email
export const ChangeEmailSchema = Yup.object().shape({
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

// change passwords
export const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Enter your old password'),
  newPassword: Yup.string().required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Enter your new password')
    .min(6, 'Six character minimum')
});
