import React, { useState } from 'react';
import { colors } from '../localutils/createTagStyles';
import Loader from 'react-loader-spinner';
import Message from './Message';
import { saveTagAction } from '../../../../../../../../actions/tagsActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Color from './Color';
import { fetchToken } from 'src/types/State';

// tab - create tag
const TagsModalCreate: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState<string>('');
  const [hover, setHover] = useState<null | string>(null);
  const [color, setColor] = useState<string>(colors[0]);
  const [message, setMessage] = useState<{ success?: string; error?: string }>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(false);

  const t: string | null = useSelector(fetchToken);

  const paramsHelper = {
    setLoading,
    t,
    color,
    history,
    setMessage,
    setName,
    name
  };

  const submitTag: () => void = () => {
    dispatch(saveTagAction(paramsHelper));
  };

  return (
    <section className='tags-modal-create'>
      <input
        value={name}
        onChange={(e): void => setName(e.target.value)}
        placeholder='Set tag name...'
        className='tags-modal-create-name'
      />
      <section className='tags-modal-colors'>
        {colors.map(c => (
          <Color
            key={c}
            color={color}
            c={c}
            hover={hover}
            setHover={setHover}
            setColor={setColor}
          />
        ))}
      </section>
      {message.error && (
        <Message message={message.error} setMessage={setMessage} />
      )}
      {message.success && (
        <Message message={message.success} setMessage={setMessage} />
      )}
      <div
        role='button'
        onClick={submitTag}
        className='tags-modal-create-submit'
      >
        {loading ? (
          <Loader color='white' height={10} width={50} type='ThreeDots' />
        ) : (
          'Create Tag'
        )}
      </div>
    </section>
  );
};

export default TagsModalCreate;
