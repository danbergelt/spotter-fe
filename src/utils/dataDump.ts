import { SetStateAction } from 'react';
import { download } from './queries';

/*== data dump =====================================================

A helper function that allows a user to download some data as a CSV.
Currently only used to export a user's workouts, but plans to expand
this to templates, PRs, analytics, etc.

TODO --> test this file in isolation? might not be necessary given
that I'm testing it in the context of a component already

*/

export const downloadData = async (
  setError: React.Dispatch<SetStateAction<string>>,
  t: string | null,
  data: string
): Promise<void> => {
  // initialize/clear state destination
  setError('');
  try {
    // request a blob from server
    const res = await download(t, data);
    // create a URL that represents the Blob
    const url: string = window.URL.createObjectURL(new Blob([res.data]));
    // create a phantom link
    const link: HTMLAnchorElement = document.createElement('a');
    link.setAttribute('data-testid', 'link');
    // attach the Blob to the link
    link.href = url;
    // name the file
    link.setAttribute('download', `download-${Date.now()}-${data}.csv`);
    // "click" the link, download the response
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (_) {
    // opting to not display the caught error --> if this breaks, it won't spit back a very informative
    // error for the user. Would rather they receive a generic error message
    // TODO --> find a way to quietly notify me (the author) of error instance
    setError('Could not download, an error occurred');
  }
};
