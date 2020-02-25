export default (): string | undefined | false => {
  const ENV: string = process.env.NODE_ENV;
  const STAGING: string | undefined = process.env.REACT_APP_STAGING;

  if (ENV === 'development') {
    return process.env.REACT_APP_T_API;
  }

  if (ENV === 'production' && STAGING) {
    return process.env.REACT_APP_S_API;
  }

  if (ENV === 'production' && !STAGING) {
    return process.env.REACT_APP_API;
  }

  return false;
};
