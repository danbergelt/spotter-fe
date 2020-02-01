import axiosWithAuth from './axiosWithAuth';
import { AxiosResponse } from 'axios';
import { SetStateAction } from 'react';

type TDownloadWorkoutData = (
  setDataDump: React.Dispatch<SetStateAction<string>>,
  t: string | null,
  data: string
) => Promise<void>;

// download data as a blob from server, set errors to some sort of local state

export const downloadData: TDownloadWorkoutData = async (
  setDataDump,
  t,
  data
) => {
  // initialize/clear state destination
  setDataDump('');
  try {
    // request a blob from server
    const res: AxiosResponse = await axiosWithAuth(t).get(
      `${process.env.REACT_APP_T_API}/api/auth/${data}/download`,
      {
        responseType: 'blob'
      }
    );
    // create a phantom link
    // assign the response as a URL at that link
    const url: string = window.URL.createObjectURL(new Blob([res.data]));
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `download-${Date.now()}-${data}.csv`);
    document.body.appendChild(link);
    // "click" the link, download the response
    link.click();
  } catch (blob) {
    // if the data type is a blob, continue
    if (
      blob.request.responseType === 'blob' &&
      blob.response.data instanceof Blob &&
      blob.response.data.type &&
      blob.response.data.type.toLowerCase().indexOf('json') !== -1
    ) {
      // create a file reader
      // read the blob as text
      // once the text is read, extract the error from the result (parsed as JSON) and set state
      const fr: FileReader = new FileReader();
      fr.onload = function(): void {
        try {
          const { error } = JSON.parse(this.result as string);
          setDataDump(error);
        } catch (error) {
          setDataDump('An error occurred');
        }
      };
      fr.readAsText(blob.response.data);
      // if the data type is not a blob, assign a generic error
    } else {
      setDataDump('Could not download, an error occurred');
    }
  }
};
