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
