import React, { useRef, useEffect, RefObject, useCallback } from 'react';
import styles from './Dropdown.module.scss';

/*== Dropdown =====================================================

Reusable dropdown component. Can be used for a burger menu, a normal
dropdown, or even as a general popup.

State is handled outside of component to allow for flexibility, custom
triggering, and side effects. User needs to shortcircuit the 
dropdown themselves, otherwise it will render by default

Props:
  setState: react setStateAction
    the state setter that controls whether dropdown renders or not
  triggerRef: HTMLElement ref
    a ref attached to the dropdown trigger. makes it so that clicking
    the trigger once dropdown is open closes the dropdown without
    bugs (without this there's a race condition bug)

*/

interface Props {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLElement>;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

const Dropdown: React.FC<Props> = ({
  children,
  setState,
  triggerRef,
  top,
  right,
  bottom,
  left
}) => {
  // a ref attached to the dropdown. used to close dropdown when
  // clicking outside of the component
  const dropdownRef = useRef<HTMLDivElement>(null);

  // checks if the mouseevent occurred in passed in component (passed via ref)
  const refCheck = (ref: RefObject<HTMLElement>, e: MouseEvent): boolean => {
    return (ref.current && !ref.current.contains(e.target as Node)) || false;
  };

  // calls a ref check on the trigger and the dropdown
  // if mouse event did not occur in either of those components,
  // close the dropdown
  const handleClick = useCallback(
    (e: MouseEvent): void => {
      if (refCheck(triggerRef, e) && refCheck(dropdownRef, e)) {
        setState(false);
      }
    },
    [setState, triggerRef]
  );

  // attach an event listener to mousedown events on mount
  // remove on unmount
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return (): void => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  return (
    // wraps the dropdown contents via the children prop
    <div
      style={{ top, right, bottom, left }}
      ref={dropdownRef}
      className={styles.dropdown}
    >
      {children}
    </div>
  );
};

export default Dropdown;
