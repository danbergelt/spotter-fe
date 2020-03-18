import React, { memo } from 'react';

interface Props {
  active: number;
  setActive: (id: number) => void;
  text: string;
  id: number;
}

const Tab: React.FC<Props> = ({ active, setActive, text, id }) => {
  return (
    <div
      role='button'
      className={
        active === id ? 'tags-modal-tab-active' : 'tags-modal-tab-not-active'
      }
      onClick={(): void => setActive(id)}
    >
      {text}
    </div>
  );
};

export default memo(Tab);
