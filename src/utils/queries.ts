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
import { generateWeek, generateMonth } from './momentUtils';

type Token = string | null;

// submit a contact form
export const contact = async (
  values: Record<string, string>
): Promise<AxiosResponse> => await axios.post(endpoint('contact'), values);

// log out
export const logout = async (): Promise<AxiosResponse> =>
  await axios.get(endpoint('logout'), { withCredentials: true });

// update a tag
export const updateTag = async (
  t: Token,
  id: string,
  updateInput: string
): Promise<AxiosResponse> =>
  await axiosWithAuth(t).put(endpoint(`tags/${id}`), { content: updateInput });

// fetch user's tags
export const fetchTags = async (t: Token): Promise<AxiosResponse> =>
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
  let range: Array<Moment> = [];

  // identify the scope, and generate an array of dates within that scope
  if (scope === 'Week') {
    range = generateWeek(time);
  }

  if (scope === 'Month') {
    range = generateMonth(time);
  }

  // format the days
  const formattedRange: Array<string> = range.map(day =>
    day.format('MMM DD YYYY')
  );

  // call the server, passing in a range of dates to match workouts
  return await axiosWithAuth(t).post(endpoint('workouts/range'), {
    range: formattedRange
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
