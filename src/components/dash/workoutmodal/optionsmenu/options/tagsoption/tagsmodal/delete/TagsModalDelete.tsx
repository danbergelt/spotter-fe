import React, { useState } from 'react';
import Err from './Err';
import { deleteTagAction } from '../../../../../../../../actions/tagsActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TagOnWorkout as Tag } from 'src/types/TagOnWorkout';
import { fetchToken, State } from 'src/types/State';
import reFetch from 'src/utils/reFetch';

interface Props {
  toDelete: Partial<Tag>;
}

const TagsModalDelete: React.FC<Props> = ({ toDelete }) => {
  const [err, setErr] = useState<string>('');
  const history = useHistory();
  const dispatch = useDispatch();

  const t: string | null = useSelector(fetchToken);
  const scope: { value: string; label: string } = useSelector(
    (state: State) => state.globalReducer.scope
  );
  const timeSpan: number = useSelector(
    (state: State) => state.globalReducer.timeSpan
  );

  const paramsHelper = {
    t,
    toDelete,
    history,
    reFetch,
    timeSpan,
    scope,
    setErr
  };

  const deleteTag: () => void = () => {
    dispatch(deleteTagAction(paramsHelper));
  };

  return (
    <section className='tag-delete-container'>
      <p className='tag-delete'>
        Are you sure you want to delete this tag? There is no undoing this
        action.
      </p>
      {err.length ? <Err err={err} setErr={setErr} /> : null}
      <div role='button' onClick={deleteTag} className='tag-delete-submit'>
        Delete Tag
      </div>
    </section>
  );
};

export default TagsModalDelete;
