import React, { useState, Fragment, useEffect, useRef } from 'react';
import styles from './Manage.module.scss';
import { TagOnWorkout } from 'src/types/TagOnWorkout';
import Flex from 'src/components/lib/Flex';
import Button from 'src/components/lib/Button';
import { Formik, Form, Field } from 'formik';
import Input from 'src/components/lib/Input';
import useApi from 'src/hooks/useApi';
import { updateTagQuery, deleteTagQuery } from '../../../../../utils/queries';
import useToken from 'src/hooks/useToken';
import produce from 'immer';
import HTTPResponse from 'src/components/lib/HTTPResponse';
import { remove } from 'lodash';
import { HS } from 'src/types/Types';

interface Props {
  tags: Array<TagOnWorkout>;
  setTags: React.Dispatch<React.SetStateAction<TagOnWorkout[]>>;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  hs: HS;
}

const Manage: React.FC<Props> = ({ tags, setTags, setTab, hs }) => {
  const [tagToDelete, setTagToDelete] = useState({} as TagOnWorkout);
  const [tagToEdit, setTagToEdit] = useState({} as TagOnWorkout);
  const token = useToken();
  const inputRef = useRef<HTMLInputElement>(null);
  const [editRes, editCall, editReset] = useApi();
  const [delRes, delCall, delReset] = useApi();

  useEffect(() => {
    if (Object.keys(editRes).every(k => !editRes[k])) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }

    if (editRes.data) {
      setTags(state =>
        produce(state, draft => {
          const idx = draft.findIndex(tag => tag._id === editRes.data.tag._id);
          draft[idx] = editRes.data.tag;
        })
      );
      setTagToEdit({} as TagOnWorkout);
    }
  }, [editRes, setTags]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [tagToEdit]);

  useEffect(() => {
    if (delRes.data) {
      setTags(state =>
        produce(state, draft => {
          remove(draft, tag => tag._id === delRes.data.tag._id);
        })
      );
      setTab('Add');
    }
  }, [delRes, setTab, setTags]);

  const deleteTag = async (id: string): Promise<void> => {
    await delCall(deleteTagQuery, [token, id]);
  };

  if (!tags.length) {
    return <p className={styles.empty}>No tags found</p>;
  }

  if (Object.keys(tagToDelete).length !== 0) {
    return (
      <>
        <p className={styles.confirm}>
          Are you sure you want to delete this tag? There is no undoing this
          action.
        </p>
        <Button
          loading={delRes.isLoading}
          func={(): Promise<void> => deleteTag(tagToDelete._id)}
          css={styles.callDelete}
          content='Delete'
        />
        <HTTPResponse
          css={styles.delRes}
          error={delRes.error}
          reset={delReset}
        />
      </>
    );
  }

  return (
    <>
      {tags.map(tag => (
        <Fragment key={tag._id}>
          <Flex align='center'>
            <div
              onClick={(): void =>
                setTagToEdit(state =>
                  state._id === tag._id ? ({} as TagOnWorkout) : tag
                )
              }
              onPointerEnter={(): void => hs.setHovered(tag._id)}
              onPointerLeave={(): void => hs.setHovered('')}
              className={styles.tag}
              style={{
                background: hs.darken([hs.hovered, tag._id], tag.color)
              }}
            >
              {tag.content}
            </div>
            <button
              onClick={(): void => setTagToDelete(tag)}
              className={styles.delete}
            >
              Delete
            </button>
          </Flex>
          {tagToEdit._id === tag._id && (
            <>
              <Formik
                initialValues={{ tag: tag.content }}
                onSubmit={async (values): Promise<void> => {
                  await editCall(updateTagQuery, [token, tag._id, values.tag]);
                }}
              >
                {(): JSX.Element => (
                  <Form className={styles.form}>
                    <Field
                      innerRef={inputRef}
                      css={styles.input}
                      as={Input}
                      placeholder='Edit tag name'
                      type='text'
                      name='tag'
                    />
                    <Button
                      loading={editRes.isLoading}
                      css={styles.edit}
                      content='Edit'
                    />
                  </Form>
                )}
              </Formik>
              <HTTPResponse
                css={styles.err}
                error={editRes.error}
                reset={editReset}
              />
            </>
          )}
        </Fragment>
      ))}
    </>
  );
};

export default Manage;
