///////////////////////////////////////////////////////
//
// single source of truth for all api queries
// allows for easy re-use, and co-located storage
// also, when using the useApi custom hook,
// allows us to define our queries outside the component
//
////////////////////////////////////////////////////////

import axios, { AxiosResponse } from 'axios';
import endpoint from './endpoint';
import axiosWithAuth from './axiosWithAuth';

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
