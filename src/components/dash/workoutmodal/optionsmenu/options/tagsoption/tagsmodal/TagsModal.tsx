import React, { useState, useCallback, useEffect } from 'react';
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
import { fetchTagsAction } from 'src/actions/tagsActions';
import { fetchTags } from 'src/utils/queries';
import useToken from 'src/hooks/useToken';
import useApi from 'src/hooks/useApi';

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

interface OptionsReducer {
  active: number;
  tagModal: boolean;
}

// modal for tags manager
const TagsModal: React.FC = () => {
  // sets the selected tag to be queued for deletion
  const [toDelete, setToDelete] = useState<Tag>({
    _id: '',
    color: '',
    content: ''
  });
  const { active, tagModal: modal }: OptionsReducer = useSelector(
    (state: State) => state.optionsReducer
  );
  const styles = useTagModalStyles();
  const dispatch = useDispatch();
  const t = useToken();
  const [res, call] = useApi();

  // close the tag modal
  const closeTagModal: () => void = useCallback(() => {
    dispatch(closeTagModalAction());
  }, [dispatch]);

  // dispatch fetched tags to store
  useEffect(() => {
    if (res.data) {
      dispatch(fetchTagsAction(res.data.tags));
    }
    if (res.error) {
      // no-op - handle at later point
    }
  }, [res, dispatch]);

  // fetch tags on render
  useEffect(() => {
    const fetch = async (): Promise<void> => {
      await call(fetchTags, [t]);
    };

    if (modal) fetch();
  }, [call, t, modal]);

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
      {!res.isLoading && active === 0 && (
        <TagsModalAdd loading={res.isLoading} />
      )}
    </Modal>
  );
};

export default TagsModal;
