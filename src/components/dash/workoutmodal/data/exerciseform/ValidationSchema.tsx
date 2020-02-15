import * as Yup from 'yup';

// validation schema for exercise form

export const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Enter name')
    .max(25, '25 character max'),
  weight: Yup.number().max(2000, '2000 lb limit'),
  reps: Yup.number().max(2000, '2000 reps limit'),
  sets: Yup.number().max(2000, '2000 sets limit')
});
