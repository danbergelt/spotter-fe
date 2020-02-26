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

// submit a contact form
export const contact = async (
  values: Record<string, string>
): Promise<AxiosResponse> => await axios.post(endpoint('contact'), values);

// log out
export const logout = async (): Promise<AxiosResponse> =>
  await axios.get(endpoint('logout'), { withCredentials: true });
