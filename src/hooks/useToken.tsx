import { useSelector } from 'react-redux';
import { State } from 'src/types/State';

export default (): string | null => {
  return useSelector((state: State) => state.globalReducer.token);
};
