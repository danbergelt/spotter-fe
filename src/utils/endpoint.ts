import api from './api';

export default (path: string): string => {
  return `${api()}/api/auth/${path}`;
};
