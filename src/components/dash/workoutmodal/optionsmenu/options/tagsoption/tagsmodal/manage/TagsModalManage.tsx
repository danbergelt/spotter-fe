import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setActiveTabAction,
  editTagAction
} from '../../../../../../../../actions/tagsActions';
import { useHistory } from 'react-router-dom';
import Err from './Err';
import Tag from './Tag';
import { TagOnWorkout as T } from '../../../../../../../../types/TagOnWorkout';
import { State } from 'src/types/State';
import useToken from '../../../../../../../../hooks/useToken';

interface Props {
  setToDelete: React.Dispatch<React.SetStateAction<Partial<T>>>;
}

const TagsModalManage: React.FC<Props> = ({ setToDelete }) => {
  const tags: Array<T> = useSelector((state: State) => state.tagsReducer.tags);

  const t: string | null = useToken();

  const dispatch = useDispatch();

  const [hover, setHover] = useState<null | string>(null);
  const [update, setUpdate] = useState<Partial<T>>({});
  const [updateInput, setUpdateInput] = useState<string>('');
  const [err, setErr] = useState<string>('');

  const history = useHistory();

  const handleDelete: (tag: T) => void = useCallback(
    tag => {
      dispatch(setActiveTabAction(3));
      setToDelete(tag);
    },
    [dispatch, setToDelete]
  );

  const paramsHelper = { t, update, updateInput, setUpdate, history, setErr };

  const handleSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => void = useCallback(
    e => {
      e.preventDefault();
      setUpdateInput('');
      dispatch(editTagAction(paramsHelper));
    },
    [dispatch, paramsHelper]
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
