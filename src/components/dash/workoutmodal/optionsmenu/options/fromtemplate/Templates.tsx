import React, { useCallback } from 'react';
import Template from './Template';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTemplateAction } from '../../../../../../actions/optionsActions';
import { Template as T } from 'src/types/Template';
import { State } from 'src/types/State';
import useToken from '../../../../../../hooks/useToken';

interface Props {
  setActive: React.Dispatch<React.SetStateAction<{} | T>>;
  active: Partial<T>;
  search: string;
}

// templates container

const Templates: React.FC<Props> = ({ setActive, active, search }) => {
  const dispatch = useDispatch();

  const token: string | null = useToken();

  const {
    templatesErr: err,
    templates
  }: { templatesErr: string; templates: Array<T> } = useSelector(
    (state: State) => state.optionsReducer
  );

  const deleteTemplate: (id: string) => void = useCallback(
    id => {
      dispatch(deleteTemplateAction(token, id));
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
