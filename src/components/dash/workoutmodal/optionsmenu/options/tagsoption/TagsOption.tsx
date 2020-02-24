import React from 'react';
import TagsModal from './tagsmodal/TagsModal';
import { FiTag } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  fetchTags,
  openTagModalAction
} from '../../../../../../actions/tagsActions';
import useToken from '../../../../../../hooks/useToken';

interface Props {
  iconClass: string;
}

const Tags: React.FC<Props> = ({ iconClass }) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const t: string | null = useToken();

  const openTagsModal: () => void = () => {
    dispatch(openTagModalAction());
    dispatch(fetchTags(history, t));
  };

  return (
    <>
      <div
        role='button'
        onClick={openTagsModal}
        className='add-workout-options-button'
        data-testid='tags-modal'
      >
        <FiTag className={iconClass} /> Tags
      </div>
      <TagsModal />
    </>
  );
};

export default Tags;
