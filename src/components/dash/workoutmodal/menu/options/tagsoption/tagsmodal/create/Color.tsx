import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { colorStyles } from '../localutils/createTagStyles';
import adjust from '../../../../../../../../utils/darkenColorInJS';

interface Props {
  c: string;
  hover: string | null;
  color: string;
  setHover: React.Dispatch<React.SetStateAction<string | null>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const Color: React.FC<Props> = ({ c, hover, color, setHover, setColor }) => {
  return (
    <div
      key={c}
      style={
        c === hover && c !== color
          ? { ...colorStyles, background: adjust(c, -40) }
          : { ...colorStyles, background: c }
      }
      onClick={(): void => setColor(c)}
      onMouseEnter={(): void => setHover(c)}
      onMouseLeave={(): void => setHover(null)}
      data-testid={c === color && 'selected-tag'}
      aria-label='tag-colors'
    >
      {c === color && (
        <div className='active-tag-color'>
          <FiCheck />
        </div>
      )}
    </div>
  );
};

export default Color;
