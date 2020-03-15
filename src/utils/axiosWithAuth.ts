import axios, { AxiosInstance } from 'axios';

// TO-DO --> implement caching
// function cacheGet(get: AxiosInstance): any {
//   const cache = new Map();

//   return function cachedGet(url: string): any {
//     const key = url;

//     if (cache.has(key)) {
//       return cache.get(key);
//     } else {
//       const request = get(url);
//       cache.set(key, request);
//       return request;
//     }
//   };
// }

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
