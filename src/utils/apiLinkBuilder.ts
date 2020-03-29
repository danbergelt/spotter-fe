/*== api base url helper =====================================================

This function programmatically sets the base URL for the spotter API according
to the current context

if the env is development, return the local API (something like local host)

if env is production and staging is true, return the staging API

if env is production and staging is false, return the production API

*/

export default (): string | undefined | false => {
  const ENV: string = process.env.NODE_ENV;
  const STAGING: string | undefined = process.env.REACT_APP_STAGING;

  if (ENV === 'development') return process.env.REACT_APP_T_API;

  if (ENV === 'production' && STAGING) return process.env.REACT_APP_S_API;

  if (ENV === 'production' && !STAGING) return process.env.REACT_APP_API;

  return false;
};
