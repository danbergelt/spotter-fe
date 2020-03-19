import React, { useState, useRef } from 'react';
import Dropdown from 'src/components/lib/Dropdown';
import { State } from 'src/types/State';
import { useSelector, useDispatch } from 'react-redux';
import styles from './SubNav.module.scss';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Flex from 'src/components/lib/Flex';
import { setScopeAction } from 'src/actions/globalActions';
import { useWindowSize } from 'react-use';

/*== Subnav =====================================================

Subnav dropdown that sits below the site logo. Allows a user (once
logged in) to change the scope of their dashboard to either a weekly
view or a monthly view.

*/

const SubNav: React.FC = () => {
  // dropdown state
  const [isOpen, setIsOpen] = useState(false);

  // window width to dynamically adjust dropdown position
  const { width } = useWindowSize();

  // the dashboard scope (either month or week)
  const scope = useSelector((state: State) => state.globalReducer.scope);

  // state dispatcher
  const dispatch = useDispatch();

  // dropdown trigger ref
  const ref = useRef<HTMLDivElement>(null);

  // set the dashboard scope. called when dropdown option clicked
  const setScope = (option: string): void => {
    setIsOpen(false);
    dispatch(setScopeAction(option));
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
            onClick={(): void => setScope('week')}
            className={styles.option}
          >
            week
          </p>
          <p
            data-testid='opt2'
            onClick={(): void => setScope('month')}
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
