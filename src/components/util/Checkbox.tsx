import React from 'react';
import { FiSquare, FiCheckSquare } from 'react-icons/fi';
import styles from './Checkbox.module.scss';

/*== Checkbox =====================================================

Custom checkbox component using icons from Feather icons: 
https://feathericons.com/

Using Feather through project, so matches branding more than the default
browser checkbox. Allows for unified styling cross-browser, and
removes any baked-in functionality that may come with the input element

If required in a form, consider using the native input element.
However, if just being used to toggle a state, this component
provides a smoother, less intrusive experience

Props
  state: boolean
    the checkbox state (checked or unchecked)
  setState: React setStateAction
    set the checkbox state (checked or unchecked)


*/

interface Props {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Checkbox: React.FC<Props> = ({ state, setState }) => {
  return state ? (
    <span
      className={styles.box}
      data-testid='checked'
      onClick={(): void => setState(false)}
    >
      <FiCheckSquare size={15} strokeWidth='3px' />
    </span>
  ) : (
    <span
      className={styles.box}
      data-testid='unchecked'
      onClick={(): void => setState(true)}
    >
      <FiSquare size={15} strokeWidth='3px' />
    </span>
  );
};

export default Checkbox;
