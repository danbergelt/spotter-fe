import React from 'react';
import TagsModal from './tagsmodal/TagsModal';
import { FiTag } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { openTagModalAction } from '../../../../../../actions/tagsActions';

interface Props {
  iconClass: string;
}

const Tags: React.FC<Props> = ({ iconClass }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div
        role='button'
        onClick={(): { type: string } => dispatch(openTagModalAction())}
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
