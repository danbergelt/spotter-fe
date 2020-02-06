import axios, { AxiosInstance } from 'axios';

// gets token from memory, creates an axios instance sending the token, enables cookies

interface Params {
  (t: string | null): AxiosInstance;
}

const axiosWithAuth: Params = t => {
  return axios.create({
    headers: {
      Authorization: `Bearer ${t}`
    },
    withCredentials: true
  });
};

export default axiosWithAuth;
