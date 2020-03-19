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
  old: Yup.string()
    .email('Invalid email')
    .required('Enter old email'),
  new: Yup.string()
    .email('Invalid email')
    .required('Enter new email'),
  confirm: Yup.string().oneOf([Yup.ref('new'), null], 'Match new email')
});

// change passwords
export const ChangePasswordSchema = Yup.object().shape({
  old: Yup.string().required('Enter old password'),
  new: Yup.string()
    .min(6, 'Six char minimum')
    .required('Enter new password'),
  confirm: Yup.string().oneOf([Yup.ref('new'), null], 'Match new password')
});

// exercise form
export const ExerciseSchema = Yup.object().shape({
  name: Yup.string()
    .required('Enter name')
    .max(25, '25 character max'),
  weight: Yup.number().max(2000, '2000 lb limit'),
  reps: Yup.number().max(2000, '2000 reps limit'),
  sets: Yup.number().max(2000, '2000 sets limit')
});

// create an exercise (used to track PRs)
export const CreateExerciseSchema = Yup.object().shape({
  exercise: Yup.string()
    .required('Enter name')
    .max(25, '25 character max')
});
