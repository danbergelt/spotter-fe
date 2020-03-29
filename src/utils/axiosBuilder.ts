import axios, { AxiosInstance } from 'axios';
import apiLinkBuilder from './apiLinkBuilder';

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

/*== api instance generator =====================================================

This helper function generates an instance of an axios function to use for api calls.

It accepts an optional token, which if present, will be passed in as an authorization
header according to OAuth standards. Otherwise, it will pass in undefined. The instance
also sends cookies with every requst (could look into including a param that limits this)
and builds a base URL with a helper function that reads the context (dev, staging, prod)

*/

const axiosBuilder = (token?: string | null | undefined): AxiosInstance => {
  // token is either a string or null --> can't just evaluate truthy/falsy values
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true,
    baseURL: `${apiLinkBuilder()}/api/auth/`
  });
};

export default axiosBuilder;
