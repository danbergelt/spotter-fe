import React, { useState, useRef } from 'react';
import Dropdown from 'src/components/lib/Dropdown';
import styles from './SubNav.module.scss';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Flex from 'src/components/lib/Flex';
import { useWindowSize } from 'react-use';
import { Scope } from 'src/types';

/*== Subnav =====================================================

Subnav dropdown that sits below the site logo. Allows a user (once
logged in) to change the scope of their dashboard to either a weekly
view or a monthly view.

*/

interface Props {
  scope: Scope;
  setScope: React.Dispatch<React.SetStateAction<Scope>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const SubNav: React.FC<Props> = ({ scope, setScope, setTime }) => {
  // dropdown state
  const [isOpen, setIsOpen] = useState(false);

  // window width to dynamically adjust dropdown position
  const { width } = useWindowSize();

  // dropdown trigger ref
  const ref = useRef<HTMLDivElement>(null);

  // set the dashboard scope. called when dropdown option clicked
  const handleScope = (option: Scope): void => {
    setTime(0);
    setIsOpen(false);
    setScope(option);
  };

  // dynamically adjust dropdown position
  const setTop = (): string => {
    if (width > 800) {
      return '100px';
    } else if (width > 500) {
      return '95px';
    } else {
      return '85px';
    }
  };

  return (
    <Flex css={styles.container}>
      <Flex css={styles.dropdown} click={(): void => setIsOpen(!isOpen)}>
        <div className={styles.selected} ref={ref}>
          {scope}
        </div>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </Flex>
      {isOpen && (
        <Dropdown top={setTop()} refs={[ref]} setState={setIsOpen}>
          <p
            data-testid='opt'
            onClick={(): void => handleScope('week')}
            className={styles.option}
          >
            week
          </p>
          <p
            data-testid='opt2'
            onClick={(): void => handleScope('month')}
            className={styles.option}
          >
            month
          </p>
        </Dropdown>
      )}
    </Flex>
  );
};

export default SubNav;
