import React, { useState, useRef, useEffect } from 'react';
import { FiPackage } from 'react-icons/fi';
import styles from './Templates.module.scss';
import Dropdown from 'src/components/lib/Dropdown';
import Flex from 'src/components/lib/Flex';
import Head from 'src/components/lib/Head';
import useTabs from 'src/hooks/useTabs';
import Tabs from 'src/components/lib/Tabs';
import Manage from './Manage';
import useApi from 'src/hooks/useApi';
import { fetchTemplatesQuery } from 'src/utils/queries';
import useToken from 'src/hooks/useToken';
import { Template } from 'src/types/Template';
import Create from './Create';

/*== Templates =====================================================

Popup in workout modal to manage + create templates. Templates are 
workouts that a user performs repeatedly. Instead of filling in the
workouts manually each time, a user can save that workout once as a
template and load it automatically, then change details as they wish.

Props:
  nudgeBottom: function
    nudge the popup from the bottom at tablet and below
  nudgeLeft: function
    nudge the popup left at tablet and below

*/

interface Props {
  nudgeBottom: () => string | undefined;
  nudgeLeft: () => string | undefined;
}

const Templates: React.FC<Props> = ({ nudgeBottom, nudgeLeft }) => {
  // state to manage popup
  const [isOpen, setIsOpen] = useState(false);

  // trigger ref for popup
  const ref = useRef<HTMLDivElement>(null);

  // api utils
  const [res, call] = useApi();

  // auth token
  const token = useToken();

  // tab component custom hook
  const tabState = useTabs('Manage');

  // current active tab
  const [active] = tabState;

  // templates for this user
  const [templates, setTemplates] = useState<Array<Template>>([]);

  // if sucessful get request, load the templates into state
  useEffect(() => {
    if (res.data) {
      setTemplates(res.data.templates);
    }

    if (res.error) {
      // handle error later
    }
  }, [res]);

  // render content based on active tab
  const renderTabs = (): JSX.Element => {
    if (active === 'Manage') {
      return (
        <Manage
          setIsOpen={setIsOpen}
          setTemplates={setTemplates}
          templates={templates}
        />
      );
    }

    if (active === 'Create') {
      return <Create setTemplates={setTemplates} />;
    }

    // fallback, should not occur
    return <div>An error occurred</div>;
  };

  // toggle popup. if opening, call the template get query
  const toggle = async (): Promise<void> => {
    if (!isOpen) {
      await call(fetchTemplatesQuery, [token]);
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        ref={ref}
        role='button'
        onClick={toggle}
        className={styles.templates}
      >
        <FiPackage className={styles.icon} /> Templates
      </div>
      {isOpen && (
        <Dropdown
          bottom={nudgeBottom()}
          left={nudgeLeft()}
          css={styles.dropdown}
          refs={[ref]}
          setState={setIsOpen}
        >
          <Flex justify='space-between' align='center'>
            <Tabs resetOnUnmount state={tabState} tabs={['Manage', 'Create']} />
            <Head size={13} setState={setIsOpen} />
          </Flex>
          {renderTabs()}
        </Dropdown>
      )}
    </>
  );
};

export default Templates;
