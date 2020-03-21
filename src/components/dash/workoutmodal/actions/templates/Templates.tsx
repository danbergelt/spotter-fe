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

interface Props {
  nudgeBottom: () => string | undefined;
  nudgeLeft: () => string | undefined;
}

const Templates: React.FC<Props> = ({ nudgeBottom, nudgeLeft }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [res, call] = useApi();
  const token = useToken();
  const tabState = useTabs('Manage');
  const [active] = tabState;
  const [templates, setTemplates] = useState<Array<Template>>([]);

  useEffect(() => {
    if (res.data) {
      setTemplates(res.data.templates);
    }

    if (res.error) {
      // handle error later
    }
  }, [res]);

  const renderTabs = (): JSX.Element => {
    if (active === 'Manage') {
      return <Manage setTemplates={setTemplates} templates={templates} />;
    }

    if (active === 'Create') {
      return <Create setTemplates={setTemplates} />;
    }

    return <div>An error occurred</div>;
  };

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
