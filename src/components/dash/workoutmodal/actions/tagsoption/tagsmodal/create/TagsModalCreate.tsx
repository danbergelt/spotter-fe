import React, { useState, useEffect } from 'react';
import { colors } from '../localutils/createTagStyles';
import Loader from 'react-loader-spinner';
import Message from './Message';
import { createTagAction } from '../../../../../../../actions/tagsActions';
import { useDispatch } from 'react-redux';
import Color from './Color';
import useToken from '../../../../../../../hooks/useToken';
import useApi from 'src/hooks/useApi';
import { createTagQuery } from 'src/utils/queries';

// tab - create tag
const TagsModalCreate: React.FC = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState<string>('');
  const [hover, setHover] = useState<null | string>(null);
  const [color, setColor] = useState<string>(colors[0]);
  const [message, setMessage] = useState<{ success?: string; error?: string }>(
    {}
  );

  const token: string | null = useToken();

  const [res, call] = useApi();

  useEffect(() => {
    setMessage({});
    if (res.data) {
      setMessage({ success: 'New tag created' });
      dispatch(createTagAction(res.data.tag));
    }

    if (res.error) {
      setMessage({ error: res.error });
    }
  }, [res, dispatch]);

  const createTag = async (): Promise<void> => {
    await call(createTagQuery, [token, color, name]);
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
        onClick={createTag}
        className='tags-modal-create-submit'
      >
        {res.isLoading ? (
          <Loader color='white' height={10} width={50} type='ThreeDots' />
        ) : (
          'Create Tag'
        )}
      </div>
    </section>
  );
};

export default TagsModalCreate;
