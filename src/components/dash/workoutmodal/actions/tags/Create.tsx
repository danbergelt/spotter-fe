import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import Button from 'src/components/lib/Button';
import * as colors from '../../../../../styles/variables.scss';
import styles from './Create.module.scss';
import Flex from 'src/components/lib/Flex';
import Input from 'src/components/lib/Input';
import adjust from 'src/utils/darkenColorInJS';
import { FiCheck } from 'react-icons/fi';
import useApi from 'src/hooks/useApi';
import HTTPResponse from 'src/components/lib/HTTPResponse';
import { createTagQuery } from 'src/utils/queries';
import useToken from 'src/hooks/useToken';
import { TagOnWorkout } from 'src/types/TagOnWorkout';
import produce from 'immer';

interface Props {
  setTags: React.Dispatch<React.SetStateAction<TagOnWorkout[]>>;
}

const Create: React.FC<Props> = ({ setTags }) => {
  const [hover, setHover] = useState('');
  const [active, setActive] = useState(colors.primary);
  const token = useToken();
  const [res, call, reset] = useApi();

  useEffect(() => {
    if (res.data) {
      setTags(state =>
        produce(state, draft => {
          draft.push(res.data.tag);
        })
      );
    }
  }, [res, setTags]);

  return (
    <Formik
      initialValues={{ tag: '' }}
      onSubmit={async (values, { resetForm }): Promise<void> => {
        resetForm();
        await call(createTagQuery, [token, active, values.tag]);
      }}
    >
      {(): JSX.Element => (
        <Form>
          <Field
            css={styles.input}
            placeholder='Tag name'
            type='text'
            as={Input}
            name='tag'
          />
          <Flex
            css={styles.container}
            fw='wrap'
            align='center'
            justify='center'
          >
            {Object.keys(colors).map(k => (
              <div
                onPointerEnter={(): void => setHover(colors[k])}
                onPointerLeave={(): void => setHover('')}
                onClick={(): void => setActive(colors[k])}
                style={{
                  background:
                    hover === colors[k] ? adjust(colors[k], -40) : colors[k]
                }}
                className={styles.color}
                key={colors[k]}
              >
                {active === colors[k] && <FiCheck size={20} color='white' />}
              </div>
            ))}
          </Flex>
          <Button
            loading={res.isLoading}
            css={styles.button}
            content='Create'
          />
          <HTTPResponse
            css={styles.res}
            error={res.error}
            success={res.data && 'Tag created'}
            reset={reset}
          />
        </Form>
      )}
    </Formik>
  );
};

export default Create;
