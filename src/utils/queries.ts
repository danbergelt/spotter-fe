///////////////////////////////////////////////////////
//
// single source of truth for all api queries
// allows for easy re-use, and co-located storage
//
////////////////////////////////////////////////////////

import axiosBuilder from './axiosBuilder';
import { Workout } from 'src/types/Workout';
import { Moment } from 'moment';
import { momentHelpers, prefetchMonths, prefetchWeeks } from './momentUtils';
import { AxiosResponse } from 'axios';

type Token = string | null;

// submit a contact form
export const contactQuery = async (
  values: Record<string, string>
): Promise<AxiosResponse> => {
  return await axiosBuilder().post('contact', values);
};

// log out
export const logoutQuery = async (): Promise<AxiosResponse> => {
  return await axiosBuilder().get('logout');
};

// update a tag
export const updateTagQuery = async (
  token: Token,
  id: string,
  updateInput: string
): Promise<AxiosResponse> => {
  return await axiosBuilder(token).put(`tags/${id}`, { content: updateInput });
};

// fetch user's tags
export const fetchTagsQuery = async (token: Token): Promise<AxiosResponse> => {
  return await axiosBuilder(token).get('tags');
};

// create a tag
export const createTagQuery = async (
  token: Token,
  color: string,
  content: string
): Promise<AxiosResponse> => {
  return await axiosBuilder(token).post('tags', { color, content });
};

// delete a tag
export const deleteTagQuery = async (
  token: Token,
  id: string
): Promise<AxiosResponse> => {
  return await axiosBuilder(token).delete(`tags/${id}`);
};

// fetch user's templates
export const fetchTemplatesQuery = async (
  token: Token
): Promise<AxiosResponse> => {
  return await axiosBuilder(token).get('templates');
};

// delete template
export const deleteTemplateQuery = async (
  token: Token,
  id: string
): Promise<AxiosResponse> => {
  return await axiosBuilder(token).delete(`templates/${id}`);
};

// save a template
export const saveTemplateQuery = async (
  token: Token,
  name: string,
  workout: Workout
): Promise<AxiosResponse> => {
  return await axiosBuilder(token).post('templates', {
    name,
    ...workout
  });
};

// save a workout
export const saveWorkoutQuery = async (
  token: Token,
  date: Moment | null,
  workout: Workout
): Promise<AxiosResponse> => {
  const { title, tags, notes, exercises } = workout;
  const { FORMAT_FULL } = momentHelpers;
  return await axiosBuilder(token).post('workouts', {
    date: date?.format(FORMAT_FULL),
    title,
    notes,
    exercises,
    tags
  });
};

// edit a workout
export const editWorkoutQuery = async (
  token: Token,
  id: string,
  workout: Workout
): Promise<AxiosResponse> => {
  const { title, notes, exercises, tags } = workout;
  return await axiosBuilder(token).put(`workouts/${id}`, {
    title,
    notes,
    exercises,
    tags
  });
};

// delete account
export const deleteAccountQuery = async (
  token: Token
): Promise<AxiosResponse> => {
  return await axiosBuilder(token).delete('user/delete');
};

// delete workout
export const deleteWorkoutQuery = async (
  token: Token,
  id: string
): Promise<AxiosResponse> => {
  return await axiosBuilder(token).delete(`workouts/${id}`);
};

// fetch workouts
export const fetchWorkoutsQuery = async (
  token: Token,
  time: number,
  scope: string
): Promise<AxiosResponse> => {
  // prefetch all workouts for previous 1 month/week, current month/week, next month/week
  // prefetching allows workouts to render immediately when moving across dates
  return await axiosBuilder(token).post('workouts/range', {
    range: scope === 'month' ? prefetchMonths(time) : prefetchWeeks(time)
  });
};

// delete an exercise
export const deleteExerciseQuery = async (
  token: Token,
  id: string
): Promise<AxiosResponse> => {
  return await axiosBuilder(token).delete(`exercises/${id}`);
};

// fetch user's exercises
export const fetchExercisesQuery = async (
  token: Token
): Promise<AxiosResponse> => {
  return axiosBuilder(token).get('exercises');
};

// create an exercise
export const createExerciseQuery = async (
  token: Token,
  name: string
): Promise<AxiosResponse> => {
  return await axiosBuilder(token).post('exercises', {
    name
  });
};

// change a forgotten password
export const changeForgottenPasswordQuery = async (
  values: Record<string, string>,
  id: string
): Promise<AxiosResponse> => {
  const { newPassword, confirmPassword } = values;

  return await axiosBuilder().put(`user/forgotpassword/${id}`, {
    newPassword,
    confirmPassword
  });
};

// send forgot password instructions
export const forgotPasswordQuery = async (
  email: string
): Promise<AxiosResponse> => {
  return await axiosBuilder().post('user/forgotpassword', { email });
};

// log in
export const logInQuery = async (values: {
  email: string;
  password: string;
}): Promise<AxiosResponse> => {
  return await axiosBuilder().post('login', values);
};

// sign up
export const signUpQuery = async (values: {
  email: string;
  password: string;
}): Promise<AxiosResponse> => {
  return await axiosBuilder().post('register', values);
};

// change email
export const changeEmailQuery = async (
  token: string,
  values: Record<string, string>
): Promise<AxiosResponse> => {
  return await axiosBuilder(token).put('user/email', values);
};

// change password
export const changePasswordQuery = async (
  token: string,
  values: Record<string, string>
): Promise<AxiosResponse> => {
  return await axiosBuilder(token).put('user/password', values);
};

// refresh query (fetch a new token)
export const refreshQuery = async (): Promise<AxiosResponse> => {
  return await axiosBuilder().get('refresh');
};

// data download
export const download = async (
  token: string | null,
  data: string
): Promise<AxiosResponse> => {
  return await axiosBuilder(token).get(`${data}/download`, {
    responseType: 'blob'
  });
};
