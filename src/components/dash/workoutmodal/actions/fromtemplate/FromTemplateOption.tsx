import React, { useEffect, useState } from 'react';
import FromTemplate from './FromTemplate';
import { useDispatch } from 'react-redux';
import { FiPackage } from 'react-icons/fi';
import useToken from '../../../../../hooks/useToken';
import useApi from 'src/hooks/useApi';
import { fetchTemplatesQuery } from 'src/utils/queries';
import { Template } from 'src/types/Template';

interface Props {
  iconClass: string;
}

// menu option to open from-template modal, triggers an API call to fetch all templates

const FromTemplateOption: React.FC<Props> = ({ iconClass }) => {
  const dispatch = useDispatch();
  const token = useToken();
  const [err, setErr] = useState('');
  const [templates, setTemplates] = useState<Array<Template>>([]);
  const [modal, setModal] = useState(false);
  const [res, call] = useApi();

  // if templates, pass to children. otherwise, pass error to children
  useEffect(() => {
    if (res.data) {
      setTemplates(res.data.templates);
    }

    if (res.error) {
      setErr(res.error);
    }
  }, [res, dispatch]);

  // fetch user's templates on modal open
  const openFromTemplateModal = async (): Promise<void> => {
    await call(fetchTemplatesQuery, [token]);
    setModal(true);
  };

  return (
    <>
      <div
        role='button'
        onClick={openFromTemplateModal}
        className='add-workout-options-button'
      >
        <FiPackage className={iconClass} /> Load Template
      </div>
      <FromTemplate
        setTemplates={setTemplates}
        modal={modal}
        setModal={setModal}
        templates={templates}
        err={err}
      />
    </>
  );
};

export default FromTemplateOption;
