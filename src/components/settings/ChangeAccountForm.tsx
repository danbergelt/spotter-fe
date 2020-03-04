import React, { SetStateAction } from 'react';
import { Formik, Form, Field } from 'formik';
import useToken from '../../hooks/useToken';
import Head from '../util/Head';
import * as Yup from 'yup';
import useApi from 'src/hooks/useApi';

interface Props {
  setState: React.Dispatch<SetStateAction<boolean>>;
  schema: Yup.ObjectSchema<Yup.Shape<object, Record<string, string>>>;
  api: Function;
  labels: { [key: string]: string };
}

const ChangeAccountForm: React.FC<Props> = ({
  setState,
  schema,
  api,
  labels
}) => {
  const t: string | null = useToken();

  const [res, call] = useApi();

  return (
    <article>
      <Head setState={setState} />
      <section className='change-form'>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            old: '',
            new: '',
            confirm: ''
          }}
          validationSchema={schema}
          onSubmit={async (values, { resetForm }): Promise<void> => {
            resetForm();
            await call(api, [t, values]);
          }}
        >
          {({ errors, touched }): JSX.Element => (
            <Form>
              <div className='change-inp'>
                <label className='change-label'>{labels.old}</label>
                <Field data-testid='old' className='inp-component' name='old' />
              </div>
              <div className='change-inp'>
                <label className='change-label'>{labels.new}</label>
                <Field data-testid='new' className='inp-component' name='new' />
              </div>
              <div className='change-inp'>
                <label className='change-label'>{labels.confirm}</label>
                <Field
                  data-testid='confirm'
                  className='inp-component'
                  name='confirm'
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <button
                  data-testid='save'
                  className='change-button'
                  type='submit'
                >
                  Save
                </button>
                {errors.confirm && touched.confirm && (
                  <p className='change-err'>{errors.confirm}</p>
                )}
                {res.error && <p className='change-err'>{res.error}</p>}
                {res.data && <p className='change-succ'>{res.data}</p>}
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </article>
  );
};

export default ChangeAccountForm;
