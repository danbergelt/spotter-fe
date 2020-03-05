import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import axios from 'axios';
import ExportWorkouts from 'src/components/settings/ExportWorkouts';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('export workouts', () => {
  test('can download workouts', async () => {
    const { getByText } = render(<ExportWorkouts t='token' />);
    mockAxios.get.mockResolvedValue({ data: 'foo' });

    // create a mock link, and spy on the click property
    // this avoids trying to actually download a file
    const link = document.createElement('a');
    jest.spyOn(link, 'click').mockImplementation(() => 'clicked');

    // use our mocked link element and inject it into the function
    jest.spyOn(document, 'createElement').mockImplementation(() => link);

    // spy on Date.now() to get a predictable file name
    jest.spyOn(Date, 'now').mockImplementation(() => 1);

    // mock download source URL, since we are not actually downloading
    window.URL.createObjectURL = jest.fn(() => 'foobar.com');

    // fire the event, check the results
    fireEvent.click(getByText(/export workout data.../i));
    await wait(() => expect(link.click).toHaveBeenCalledTimes(1));
    expect(link.href).toEqual('http://localhost/foobar.com');
    expect(link.download).toEqual('download-1-workouts.csv');
    await wait(() => link.remove());
  });
});
