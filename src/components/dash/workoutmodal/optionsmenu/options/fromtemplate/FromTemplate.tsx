import React, { useState, useCallback } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useFromTemplateStyles } from './styles';
import { setFromTemplateModalAction } from '../../../../../../actions/optionsActions';
import Templates from './Templates';
import FromTemplateHead from './FromTemplateHead';
import GenerateTemplate from './GenerateTemplate';
import { Template } from '../../../../../../types/Template';
import { State } from 'src/types/State';

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

// populate a workout from a template

const FromTemplate: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [active, setActive] = useState<Partial<Template>>({});

  // modal state (open or closed)
  const fromTemplate: boolean = useSelector(
    (state: State) => state.optionsReducer.fromTemplate
  );

  const dispatch = useDispatch();

  // resets state when modal is closed
  const closeHandler: () => void = useCallback(() => {
    dispatch(setFromTemplateModalAction(false));
    setActive({});
    setSearch('');
  }, [dispatch]);

  return (
    <Modal
      style={useFromTemplateStyles()}
      isOpen={fromTemplate}
      onRequestClose={closeHandler}
      contentLabel='Generate Template'
    >
      <section className='from-template-container'>
        <FromTemplateHead
          closeHandler={closeHandler}
          search={search}
          setSearch={setSearch}
        />
        <Templates search={search} active={active} setActive={setActive} />
        <GenerateTemplate active={active} setActive={setActive} />
      </section>
    </Modal>
  );
};

export default FromTemplate;
