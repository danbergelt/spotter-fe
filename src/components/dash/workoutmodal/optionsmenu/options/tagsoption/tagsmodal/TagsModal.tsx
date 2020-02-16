import React, { useState, useCallback } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import TagsModalHead from './head/TagsModalHead';
import TagsModalCreate from './create/TagsModalCreate';
import TagsModalManage from './manage/TagsModalManage';
import TagsModalDelete from './delete/TagsModalDelete';
import TagsModalAdd from './add/TagsModalAdd';
import { useTagModalStyles } from './localutils/tagsModalStyles';
import { TagOnWorkout as Tag } from '../../../../../../../types/TagOnWorkout';
import { State } from 'src/types/State';
import { closeTagModalAction } from 'src/actions/tagsActions';

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

interface OptionsReducer {
  active: number;
  tagModal: boolean;
}

// modal for tags manager
const TagsModal: React.FC = () => {
  // sets the selected tag to be queued for deletion
  const [toDelete, setToDelete] = useState<Partial<Tag>>({});

  const { active, tagModal: modal }: OptionsReducer = useSelector(
    (state: State) => state.optionsReducer
  );

  const styles = useTagModalStyles();

  const dispatch = useDispatch();
  const closeTagModal: () => void = useCallback(() => {
    dispatch(closeTagModalAction());
  }, [dispatch]);

  return (
    <Modal
      style={
        // modifies styles for delete message
        active === 3
          ? { ...styles, content: { ...styles.content, height: '190px' } }
          : styles
      }
      onRequestClose={closeTagModal}
      contentLabel='Tags Modal'
      isOpen={modal}
    >
      <TagsModalHead active={active} closeTagModal={closeTagModal} />
      {active === 3 && <TagsModalDelete toDelete={toDelete} />}
      {active === 2 && <TagsModalCreate />}
      {active === 1 && <TagsModalManage setToDelete={setToDelete} />}
      {active === 0 && <TagsModalAdd />}
    </Modal>
  );
};

export default TagsModal;
