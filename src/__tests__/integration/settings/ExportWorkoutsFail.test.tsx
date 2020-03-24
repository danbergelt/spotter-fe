import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import axios from 'axios';
import ExportWorkouts from 'src/components/settings/ExportWorkouts';
import { act } from 'react-dom/test-utils';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

/*== Context =====================================================

This test needs it's own separate file because we are appending
an element to the JSDom in the successful test, and need a clean environment for the
rejection tests. Clearing the JSDom via document.body.innerHTML
was not working, so solution is to isolate in fresh env

See here for more details --> https://github.com/facebook/jest/issues/1224

*/

describe('failing export workouts request', () => {
  test('displays error message', async () => {
    const { getByText } = render(<ExportWorkouts t='token' />);
    mockAxios.get.mockRejectedValue({ data: 'foo' });

    act(() => {
      fireEvent.click(getByText(/export workout data.../i));
    });

    await wait(() => expect(getByText(/Could not download/i)).toBeTruthy());
  });
});
