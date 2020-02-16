export const api = (): string | undefined | false => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.REACT_APP_T_API;
  } else if (
    process.env.NODE_ENV === 'production' &&
    Boolean(process.env.REACT_APP_STAGING)
  ) {
    return process.env.REACT_APP_S_API;
  } else if (
    process.env.NODE_ENV === 'production' &&
    !process.env.REACT_APP_STAGING
  ) {
    return process.env.REACT_APP_API;
  } else {
    return false;
  }
};
