import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setActiveTabAction,
  editTagAction
  // editTagAction
} from '../../../../../../../actions/tagsActions';
import Err from './Err';
import Tag from './Tag';
import { TagOnWorkout as T } from '../../../../../../../types/TagOnWorkout';
import { State } from 'src/types/State';
import useToken from '../../../../../../../hooks/useToken';
import useApi from 'src/hooks/useApi';
import { updateTag } from 'src/utils/queries';

interface Props {
  setToDelete: React.Dispatch<React.SetStateAction<T>>;
}

const TagsModalManage: React.FC<Props> = ({ setToDelete }) => {
  const tags: Array<T> = useSelector((state: State) => state.tagsReducer.tags);
  const t: string | null = useToken();
  const dispatch = useDispatch();
  const [hover, setHover] = useState<null | string>(null);
  const [update, setUpdate] = useState<Partial<T>>({});
  const [updateInput, setUpdateInput] = useState<string>('');
  const [err, setErr] = useState<string>('');
  const [res, call] = useApi();

  // delete a tag
  const handleDelete: (tag: T) => void = useCallback(
    tag => {
      dispatch(setActiveTabAction(3));
      setToDelete(tag);
    },
    [dispatch, setToDelete]
  );

  // when the api call returns, either load an error or dispatch to the store
  useEffect(() => {
    if (res.data) {
      setUpdate({});
      setUpdateInput('');
      dispatch(editTagAction(res.data.tag));
    }

    if (res.error) {
      setErr(res.error);
    }
  }, [res, dispatch]);

  // call the api
  const handleSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = useCallback(
    async e => {
      e.preventDefault();
      await call(updateTag, [t, update._id, updateInput]);
    },
    [call, t, update._id, updateInput]
  );

  if (!tags.length) {
    return <p className='no-tags-found'>No tags found</p>;
  }

  return (
    <>
      <p className='tag-manage-head'>Manage</p>
      {err.length ? <Err err={err} setErr={setErr} /> : null}
      {tags.map(tag => (
        <Tag
          key={tag._id}
          tag={tag}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          hover={hover}
          setHover={setHover}
          update={update}
          setUpdate={setUpdate}
          updateInput={updateInput}
          setUpdateInput={setUpdateInput}
        />
      ))}
    </>
  );
};

export default TagsModalManage;
