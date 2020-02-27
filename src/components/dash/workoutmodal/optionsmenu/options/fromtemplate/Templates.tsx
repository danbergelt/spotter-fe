import React, { useCallback, useEffect } from 'react';
import Template from './Template';
import { useDispatch } from 'react-redux';
import produce from 'immer';
import { remove } from 'lodash';
import { Template as T } from 'src/types/Template';
import useToken from '../../../../../../hooks/useToken';
import useApi from 'src/hooks/useApi';
import { deleteTemplateQuery } from 'src/utils/queries';

interface Props {
  setActive: React.Dispatch<React.SetStateAction<{} | T>>;
  active: Partial<T>;
  search: string;
  err: string;
  templates: Array<T>;
  setTemplates: React.Dispatch<React.SetStateAction<Array<T>>>;
}

// templates container

const Templates: React.FC<Props> = ({
  setActive,
  active,
  search,
  err,
  templates,
  setTemplates
}) => {
  const dispatch = useDispatch();
  const token: string | null = useToken();

  const [res, call] = useApi();

  useEffect(() => {
    if (res.data) {
      setTemplates(s =>
        produce(s, draft => {
          remove(draft, template => template._id === res.data.template._id);
        })
      );
    }

    if (res.error) {
      // handle at later date
    }
  }, [res]);

  // delete a template
  const deleteTemplate: (id: string) => void = useCallback(
    async id => {
      await call(deleteTemplateQuery, [token, id]);
    },
    [dispatch, token]
  );

  // search filter
  const filter: Array<T> = templates.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='templates-container'>
      {/* if there are templates + if there are results from the search filter, display those templates */}
      {templates.length && filter.length ? (
        filter.map(template => (
          <Template
            setActive={setActive}
            deleteTemplate={deleteTemplate}
            key={template._id}
            template={template}
            active={active}
          />
        ))
      ) : (
        <div className='no-templates-found'> No templates found</div>
      )}
      {err && <div className='no-templates-found'>{err}</div>}
    </div>
  );
};

export default Templates;
