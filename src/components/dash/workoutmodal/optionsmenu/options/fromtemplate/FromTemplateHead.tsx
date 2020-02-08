import React, { memo } from 'react';
import { FiX } from 'react-icons/fi';

interface Props {
  closeHandler: () => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const FromTemplateHead: React.FC<Props> = ({
  closeHandler,
  search,
  setSearch
}) => {
  return (
    <>
      <section className='from-template-header'>
        <p className='from-template-title'>Load Template</p>
        <div
          role='button'
          onClick={closeHandler}
          className='from-template-exit'
        >
          <FiX
            data-testid='quit-from'
            style={{ display: 'flex', alignItems: 'center' }}
          />
        </div>
      </section>
      <input
        value={search}
        onChange={(e): void => setSearch(e.target.value)}
        placeholder='Search...'
        className='from-template-search'
      />
    </>
  );
};

export default memo(FromTemplateHead);
