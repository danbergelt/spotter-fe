import React from 'react';
import { isEmpty } from 'lodash';
import { useDispatch } from 'react-redux';
import { generateTemplateAction } from '../../../../../../actions/workoutActions';
import { Template } from 'src/types/Template';
import { setFromTemplateModalAction } from 'src/actions/optionsActions';

interface Props {
  active: Partial<Template>;
  setActive: React.Dispatch<React.SetStateAction<{} | Template>>;
}

// button that does the generating
const GenerateTemplate: React.FC<Props> = ({ active, setActive }) => {
  const dispatch = useDispatch();

  // handles state when new template is generated
  const genHandler = (template: Template | {}): void => {
    // TS does not pick up on Lodash isEmpty, so need to pass in empty object as a union
    dispatch(generateTemplateAction(template));
    dispatch(setFromTemplateModalAction(false));
    setActive({});
  };

  return (
    <div
      role='button'
      onClick={(): void | null =>
        !isEmpty(active) ? genHandler(active) : null
      }
      className='generate-template'
      data-testid='generate-template'
    >
      Generate
    </div>
  );
};

export default GenerateTemplate;
