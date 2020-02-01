import React from 'react';
import FromTemplate from './FromTemplate';
import { useDispatch, useSelector } from 'react-redux';
import { FiPackage } from 'react-icons/fi';
import {
  setFromTemplateModalAction,
  fetchTemplatesAction
} from '../../../../../../actions/optionsActions';
import { fetchToken } from 'src/types/State';

interface Props {
  iconClass: string;
}

// menu option to open from-template modal, triggers an API call to fetch all templates

const FromTemplateOption: React.FC<Props> = ({ iconClass }) => {
  const dispatch = useDispatch();

  const t: string | null = useSelector(fetchToken);

  // API call that provides a selection of templates to choose from
  const openFromTemplateModal: () => void = () => {
    dispatch(fetchTemplatesAction(t));
    dispatch(setFromTemplateModalAction(true));
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
      <FromTemplate />
    </>
  );
};

export default FromTemplateOption;
