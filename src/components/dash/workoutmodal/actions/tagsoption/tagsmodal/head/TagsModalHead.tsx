import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FiX } from 'react-icons/fi';
import Tab from './Tab';
import { setActiveTabAction } from 'src/actions/tagsActions';

interface Props {
  active: number;
  closeTagModal: () => void;
}

const TagsModalHead: React.FC<Props> = ({ active, closeTagModal }) => {
  const dispatch = useDispatch();

  const setActive: (id: number) => void = useCallback(
    id => {
      dispatch(setActiveTabAction(id));
    },
    [dispatch]
  );

  return (
    <section
      data-testid='tags-modal-head'
      className='tags-modal-head-container'
    >
      <nav className='tags-modal-head-tabs'>
        <Tab active={active} setActive={setActive} text={'Add'} id={0} />
        <Tab active={active} setActive={setActive} text={'Manage'} id={1} />
        <Tab active={active} setActive={setActive} text={'Create'} id={2} />
      </nav>
      <div
        role='button'
        data-testid='close-tag-modal'
        onClick={closeTagModal}
        className='tags-modal-head-exit'
      >
        <FiX />
      </div>
    </section>
  );
};

export default TagsModalHead;
