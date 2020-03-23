import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import Button from 'src/components/lib/Button';
import styles from './Create.module.scss';
import Flex from 'src/components/lib/Flex';
import Input from 'src/components/lib/Input';
import { FiCheck } from 'react-icons/fi';
import useApi from 'src/hooks/useApi';
import HTTPResponse from 'src/components/lib/HTTPResponse';
import { createTagQuery } from 'src/utils/queries';
import useToken from 'src/hooks/useToken';
import { TagOnWorkout } from 'src/types/TagOnWorkout';
import produce from 'immer';
import { HS } from 'src/types/Types';
import { colors } from 'src/utils/colors';

/*== Create tag =====================================================

This component allows a user to create a new tag. They have the option to
pick a name, and a color from a pre-selected palette of 10 brand colors

Props:
  setTags: React setStateAction
    when a new tag is created, push the new tag to the tags state in parent
    using this setState function
  hs: HS
    hover state properties. handles hovering of colors in JS

*/

interface Props {
  setTags: React.Dispatch<React.SetStateAction<TagOnWorkout[]>>;
  hs: HS;
}

const Create: React.FC<Props> = ({ setTags, hs }) => {
  // selected color --> defaults to primary brand color
  const [active, setActive] = useState(colors[0]);

  // auth token
  const token = useToken();

  // api utils
  const [res, call, reset] = useApi();

  // if successful creation, push the new tag to the tag popup state
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
            {colors.map(color => (
              <div
                data-testid='color'
                onPointerEnter={(): void => hs.setHovered(color)}
                onPointerLeave={(): void => hs.setHovered('')}
                onClick={(): void => setActive(color)}
                style={{
                  background: hs.darken([hs.hovered, color], color)
                }}
                className={styles.color}
                key={color}
              >
                {active === color && (
                  <FiCheck data-testid='check' size={20} color='white' />
                )}
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
