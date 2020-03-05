import axiosWithAuth from './axiosWithAuth';
import { SetStateAction } from 'react';
import endpoint from './endpoint';

type TDownloadWorkoutData = (
  setError: React.Dispatch<SetStateAction<string>>,
  t: string | null,
  data: string
) => Promise<void>;

// download data as a blob from server, set errors to some sort of local state

export const downloadData: TDownloadWorkoutData = async (setError, t, data) => {
  // initialize/clear state destination
  setError('');
  try {
    // request a blob from server
    const res = await axiosWithAuth(t).get(endpoint(`${data}/download`), {
      responseType: 'blob'
    });
    // create a phantom link
    // assign the response as a URL at that link
    const url: string = window.URL.createObjectURL(new Blob([res.data]));
    const link: HTMLAnchorElement = document.createElement('a');
    link.setAttribute('data-testid', 'link');
    link.href = url;
    link.setAttribute('download', `download-${Date.now()}-${data}.csv`);
    document.body.appendChild(link);
    // "click" the link, download the response
    link.click();
    link.remove();
  } catch (blob) {
    // if the data type is a blob, continue
    if (
      blob.request?.responseType === 'blob' &&
      blob.response?.data instanceof Blob &&
      blob.response?.data.type &&
      blob.response?.data.type.toLowerCase().indexOf('json') !== -1
    ) {
      // create a file reader
      // read the blob as text
      // once the text is read, extract the error from the result (parsed as JSON) and set state
      const fr: FileReader = new FileReader();
      fr.onload = function(): void {
        try {
          const { error } = JSON.parse(this.result as string);
          setError(error);
        } catch (error) {
          setError('Could not download, an error occurred');
        }
      };
      fr.readAsText(blob.response.data);
      // if the data type is not a blob, assign a generic error
    } else {
      setError('Could not download, an error occurred');
    }
  }
};
