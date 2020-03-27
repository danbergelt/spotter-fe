///////////////////////////////////////////////////////
//
// single source of truth for all api queries
// allows for easy re-use, and co-located storage
//
////////////////////////////////////////////////////////

import axios, { AxiosResponse } from 'axios';
import endpoint from './endpoint';
import axiosWithAuth from './axiosWithAuth';
import { Workout } from 'src/types/Workout';
import { Moment } from 'moment';
import { prefetch } from './momentUtils';

type Token = string | null;

// submit a contact form
export const contactQuery = async (
  values: Record<string, string>
): Promise<AxiosResponse> => await axios.post(endpoint('contact'), values);

// log out
export const logoutQuery = async (): Promise<AxiosResponse> => {
  const res = await axios.get(endpoint('logout'), { withCredentials: true });
  return res;
};

// update a tag
export const updateTagQuery = async (
  t: Token,
  id: string,
  updateInput: string
): Promise<AxiosResponse> =>
  await axiosWithAuth(t).put(endpoint(`tags/${id}`), { content: updateInput });

// fetch user's tags
export const fetchTagsQuery = async (t: Token): Promise<AxiosResponse> =>
  await axiosWithAuth(t).get(endpoint('tags'));

// create a tag
export const createTagQuery = async (
  t: Token,
  color: string,
  content: string
): Promise<AxiosResponse> => {
  return await axiosWithAuth(t).post(endpoint('tags'), { color, content });
};

// delete a tag
export const deleteTagQuery = async (
  t: Token,
  id: string
): Promise<AxiosResponse> => {
  return await axiosWithAuth(t).delete(endpoint(`tags/${id}`));
};

// fetch user's templates
export const fetchTemplatesQuery = async (t: Token): Promise<AxiosResponse> => {
  return await axiosWithAuth(t).get(endpoint('templates'));
};

// delete template
export const deleteTemplateQuery = async (
  t: Token,
  id: string
): Promise<AxiosResponse> => {
  return await axiosWithAuth(t).delete(endpoint(`templates/${id}`));
};

// save a template
export const saveTemplateQuery = async (
  t: Token,
  name: string,
  workout: Workout
): Promise<AxiosResponse> => {
  const { title, tags, notes, exercises } = workout;
  return await axiosWithAuth(t).post(endpoint('templates'), {
    name,
    title,
    tags,
    notes,
    exercises
  });
};

// save a workout
export const saveWorkoutQuery = async (
  t: Token,
  date: Moment | null,
  workout: Workout
): Promise<AxiosResponse> => {
  const { title, tags, notes, exercises } = workout;
  return await axiosWithAuth(t).post(endpoint('workouts'), {
    date: date?.format('MMM DD YYYY'),
    title,
    notes,
    exercises,
    tags
  });
};

// edit a workout
export const editWorkoutQuery = async (
  t: Token,
  id: string,
  workout: Workout
): Promise<AxiosResponse> => {
  const { title, notes, exercises, tags } = workout;
  return await axiosWithAuth(t).put(endpoint(`workouts/${id}`), {
    title,
    notes,
    exercises,
    tags
  });
};

// delete account
export const deleteAccountQuery = async (t: Token): Promise<AxiosResponse> => {
  return await axiosWithAuth(t).delete(endpoint('user/delete'));
};

// delete workout
export const deleteWorkoutQuery = async (
  t: Token,
  id: string
): Promise<AxiosResponse> => {
  return await axiosWithAuth(t).delete(endpoint(`workouts/${id}`));
};

// fetch workouts
export const fetchWorkoutsQuery = async (
  t: Token,
  time: number,
  scope: string
): Promise<AxiosResponse> => {
  // prefetch all workouts for previous 1 month/week, current month/week, next month/week
  // prefetching allows workouts to render immediately when moving across dates
  const range: Array<string> = prefetch(time, scope).map(day =>
    day.format('MMM DD YYYY')
  );

  // call the server, passing in a range of dates to match workouts
  return await axiosWithAuth(t).post(endpoint('workouts/range'), {
    range
  });
};

// delete an exercise
export const deleteExerciseQuery = async (
  t: Token,
  id: string
): Promise<AxiosResponse> => {
  return await axiosWithAuth(t).delete(endpoint(`exercises/${id}`));
};

// fetch user's exercises
export const fetchExercisesQuery = async (t: Token): Promise<AxiosResponse> => {
  return axiosWithAuth(t).get(endpoint('exercises'));
};

// create an exercise
export const createExerciseQuery = async (
  t: Token,
  name: string
): Promise<AxiosResponse> => {
  return await axiosWithAuth(t).post(endpoint('exercises'), {
    name
  });
};

// change a forgotten password
export const changeForgottenPasswordQuery = async (
  values: Record<string, string>,
  id: string
): Promise<AxiosResponse> => {
  const { newPassword, confirmPassword } = values;

  return await axios.put(
    endpoint(`user/forgotpassword/${id}`),
    { newPassword, confirmPassword },
    { withCredentials: true }
  );
};

// send forgot password instructions
export const forgotPasswordQuery = async (
  email: string
): Promise<AxiosResponse> => {
  return await axios.post(endpoint('user/forgotpassword'), { email });
};

// log in
export const logInQuery = async (values: {
  email: string;
  password: string;
}): Promise<AxiosResponse> => {
  return await axios.post(endpoint('login'), values, { withCredentials: true });
};

// sign up
export const signUpQuery = async (values: {
  email: string;
  password: string;
}): Promise<AxiosResponse> => {
  return await axios.post(endpoint('register'), values, {
    withCredentials: true
  });
};

// change email
export const changeEmailQuery = async (
  t: string,
  values: Record<string, string>
): Promise<AxiosResponse> => {
  return await axiosWithAuth(t).put(endpoint('user/email'), values);
};

// change password
export const changePasswordQuery = async (
  t: string,
  values: Record<string, string>
): Promise<AxiosResponse> => {
  return await axiosWithAuth(t).put(endpoint('user/password'), values);
};

// refresh query (fetch a new token)
export const refreshQuery = async (): Promise<void> => {
  return await axios.get(endpoint('refresh'), { withCredentials: true });
};
