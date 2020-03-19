import React, { useState, useEffect } from 'react';
import Err from './Err';
import {
  deleteTagAction,
  setActiveTabAction
} from '../../../../../../../actions/tagsActions';
import { useDispatch } from 'react-redux';
import { TagOnWorkout as Tag } from 'src/types/TagOnWorkout';
import useToken from '../../../../../../../hooks/useToken';
import useApi from 'src/hooks/useApi';
import { deleteTagQuery } from 'src/utils/queries';

interface Props {
  toDelete: Tag;
}

const TagsModalDelete: React.FC<Props> = ({ toDelete }) => {
  const [err, setErr] = useState<string>('');
  const dispatch = useDispatch();
  const t: string | null = useToken();
  const [res, call] = useApi();

  // on the api response, either error out or dispatch the delete tag action to store
  useEffect(() => {
    if (res.data) {
      dispatch(deleteTagAction(toDelete));
      dispatch(setActiveTabAction(0));
    }

    if (res.error) {
      setErr(res.error);
    }
  }, [res, dispatch, toDelete]);

  // delete a tag
  const deleteTag = async (): Promise<void> => {
    await call(deleteTagQuery, [t, toDelete._id]);
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
