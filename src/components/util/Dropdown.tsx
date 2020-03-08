import React, { useRef, useEffect, RefObject, useCallback } from 'react';
import styles from './Dropdown.module.scss';

interface Props {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLElement>;
}

const Dropdown: React.FC<Props> = ({ children, setState, triggerRef }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const refCheck = (ref: RefObject<HTMLElement>, e: MouseEvent): boolean => {
    return (ref.current && !ref.current.contains(e.target as Node)) || false;
  };

  const handleClick = useCallback(
    (e: MouseEvent): void => {
      if (refCheck(triggerRef, e) && refCheck(dropdownRef, e)) {
        setState(false);
      }
    },
    [setState, triggerRef]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return (): void => document.removeEventListener('mousedown', handleClick);
  }, [handleClick]);

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      {children}
    </div>
  );
};

export default Dropdown;
