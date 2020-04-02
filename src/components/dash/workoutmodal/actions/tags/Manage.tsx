import React, { useState, Fragment, useEffect, useRef } from 'react';
import styles from './Manage.module.scss';
import { Tag } from 'src/types';
import Flex from 'src/components/lib/Flex';
import Button from 'src/components/lib/Button';
import { Formik, Form, Field } from 'formik';
import Input from 'src/components/lib/Input';
import useApi from 'src/hooks/useApi';
import { updateTagQuery, deleteTagQuery } from '../../../../../utils/queries';
import useToken from 'src/hooks/useToken';
import produce from 'immer';
import HTTPResponse from 'src/components/lib/HTTPResponse';
import { HS } from 'src/types';
import { useDispatch } from 'react-redux';
import { updateTagAction, deleteTagAction } from 'src/actions/workoutActions';

/*== Manage tags =====================================================

Allows a user to manage their tags, which includes editing and deleting
them. 

If user has no tags, a placeholder message is shown. If user wants
to edit a tag, click on the tag, and an input will pop up below that tag.

If user wants to delete the tag, user will click a delete button to the right
of the tag, which will prompt a confirm message. A confirm message is shown
because this will remove tags from all existing workouts and templates. The 
user can then delete the tag.

Props:
  tags: Array<Tag>
    all of a user's tags
  setTags: React setStateAction
    set the state that hold's a user's tags
  setTab: React setStateAction
    set the tab to 'add' when tag is deleted
  hs: HS
    the managed hover state passed by the parent. used
    to set hover styles in JS

*/

interface Props {
  tags: Array<Tag>;
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  hs: HS;
}

const Manage: React.FC<Props> = ({ tags, setTags, setTab, hs }) => {
  // tag staged for deletion
  const [tagToDelete, setTagToDelete] = useState({} as Tag);

  // tag staged for editing
  const [tagToEdit, setTagToEdit] = useState({} as Tag);

  // auth token
  const token = useToken();

  // ref to autofocus the edit input on render
  const inputRef = useRef<HTMLInputElement>(null);

  // edit tag api utils
  const [editRes, editCall, editReset] = useApi();

  // delete tag api utils
  const [delRes, delCall, delReset] = useApi();

  // state dispatcher
  const dispatch = useDispatch();

  // if user fires the reset function, keep the input focused
  // if user sends successful edit request, amend the tags state
  useEffect(() => {
    // check that the edit state has been reset (all vals are falsy)
    if (Object.keys(editRes).every(k => !editRes[k])) {
      // if reset was fired, focus the edit tag input
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }

    // if successful edit
    if (editRes.data) {
      // update the tags state in the parent with the returned tag
      setTags(state =>
        produce(state, draft => {
          const idx = draft.findIndex(tag => tag._id === editRes.data.tag._id);
          draft[idx] = editRes.data.tag;
        })
      );

      // dispatch the updated tag to the workout in the redux store
      dispatch(updateTagAction(editRes.data.tag));

      // clear the staged tag from local state
      setTagToEdit({} as Tag);
    }
  }, [editRes, setTags, dispatch]);

  // autofocus the edit tag input on render
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [tagToEdit]);

  // if delete tag request successful, remove it from the tags state
  useEffect(() => {
    if (delRes.data) {
      // update the tags state
      setTags(state =>
        produce(state, draft => {
          const idx = draft.findIndex(tag => tag._id === delRes.data.tag._id);
          draft.splice(idx, 1);
        })
      );

      // remove the tag from all workouts in the redux store
      dispatch(deleteTagAction(delRes.data.tag));

      // push user to 'add' tab
      setTab('Add');
    }
  }, [delRes, setTab, setTags, dispatch]);

  // call a delete tag query
  const deleteTag = async (id: string | undefined): Promise<void> => {
    await delCall(deleteTagQuery, [token, id]);
  };

  // if a user has no tags, display a placeholder message
  if (!tags.length) {
    return <p className={styles.empty}>No tags found</p>;
  }

  // if a user is staging a delete request, display confirmation message
  if (Object.keys(tagToDelete).length !== 0) {
    return (
      <>
        <p className={styles.confirm}>
          This tag will be removed from all workouts and templates where it
          exists.
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
                  state._id === tag._id ? ({} as Tag) : tag
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
            // if a user is staging an edit tag request, render the edit form
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
