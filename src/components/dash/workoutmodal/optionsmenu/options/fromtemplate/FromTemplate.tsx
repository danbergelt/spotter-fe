import React, { useState, useCallback, SetStateAction } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { useFromTemplateStyles } from './styles';
import Templates from './Templates';
import FromTemplateHead from './FromTemplateHead';
import GenerateTemplate from './GenerateTemplate';
import { Template } from '../../../../../../types/Template';

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

// populate a workout from a template

interface Props {
  err: string;
  templates: Array<Template>;
  modal: boolean;
  setModal: React.Dispatch<SetStateAction<boolean>>;
  setTemplates: React.Dispatch<SetStateAction<Array<Template>>>;
}

const FromTemplate: React.FC<Props> = ({
  err,
  templates,
  modal,
  setModal,
  setTemplates
}) => {
  const [search, setSearch] = useState<string>('');
  const [active, setActive] = useState<Partial<Template>>({});

  const dispatch = useDispatch();

  // resets state when modal is closed
  const closeHandler: () => void = useCallback(() => {
    setModal(false);
    setActive({});
    setSearch('');
  }, [dispatch]);

  return (
    <Modal
      style={useFromTemplateStyles()}
      isOpen={modal}
      onRequestClose={closeHandler}
      contentLabel='Generate Template'
    >
      <section className='from-template-container'>
        <FromTemplateHead
          closeHandler={closeHandler}
          search={search}
          setSearch={setSearch}
        />
        <Templates
          setTemplates={setTemplates}
          templates={templates}
          err={err}
          search={search}
          active={active}
          setActive={setActive}
        />
        <GenerateTemplate
          setModal={setModal}
          active={active}
          setActive={setActive}
        />
      </section>
    </Modal>
  );
};

export default FromTemplate;
