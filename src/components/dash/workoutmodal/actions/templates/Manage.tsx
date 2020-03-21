import React, { useState, useEffect } from 'react';
import Input from 'src/components/lib/Input';
import styles from './Manage.module.scss';
import { Template } from 'src/types/Template';
import Flex from 'src/components/lib/Flex';
import { FiX } from 'react-icons/fi';
import useApi from 'src/hooks/useApi';
import { deleteTemplateQuery } from 'src/utils/queries';
import useToken from 'src/hooks/useToken';
import HTTPResponse from 'src/components/lib/HTTPResponse';
import produce from 'immer';
import { remove } from 'lodash';
import Button from 'src/components/lib/Button';
import { useDispatch } from 'react-redux';
import { generateTemplateAction } from 'src/actions/workoutActions';
import { Action } from 'redux';

interface Props {
  templates: Array<Template>;
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>;
}

const Manage: React.FC<Props> = ({ templates, setTemplates }) => {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState({} as Template);
  const [res, call, reset] = useApi();
  const token = useToken();
  const dispatch = useDispatch();

  const filter = templates.filter(template => {
    return template.name.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    if (res.data) {
      setTemplates(s =>
        produce(s, draft => {
          remove(draft, template => template._id === res.data.template._id);
        })
      );
    }
  }, [res, setTemplates]);

  const deleteTemplate = async (id: string): Promise<void> => {
    await call(deleteTemplateQuery, [token, id]);
  };

  const renderTemplates = (): JSX.Element => {
    if (templates.length && filter.length) {
      return (
        <section className={styles.container}>
          {filter.map(template => (
            <Flex justify='space-between' align='center' key={template._id}>
              <p
                onClick={(): void => setActive(template)}
                className={
                  active._id === template._id ? styles.active : styles.template
                }
              >
                {template.name}
              </p>
              <FiX
                onClick={(): Promise<void> => deleteTemplate(template._id)}
                className={styles.delete}
                data-testid='template-delete'
              />
            </Flex>
          ))}
          <Button
            func={(): Action => dispatch(generateTemplateAction(active))}
            css={styles.button}
            content='Generate'
          />
        </section>
      );
    }
    // otherwise, render a message that there are no exercises for this user
    return <p className={styles.empty}>No templates found</p>;
  };

  return (
    <>
      <Input
        type='text'
        name='search'
        css={styles.input}
        value={search}
        onChange={(e): void => setSearch(e.target.value)}
        placeholder='Search templates'
      />
      <HTTPResponse reset={reset} css={styles.err} error={res.error} />
      {renderTemplates()}
    </>
  );
};

export default Manage;
