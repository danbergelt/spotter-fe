import React from 'react';
import Form from './Form';

interface Props {
  form: boolean;
}

const ContactForm: React.FC<Props> = ({ form }) => {
  const open = 'animated fadeIn faster contact-popup';
  const close = 'animated fadeOut faster contact-popup';

  return (
    <section data-testid='contact-form' className={form ? open : close}>
      <div>
        <p className='contact-form-title'>
          Hi there!{' '}
          <span role='img' aria-label='hand-wave'>
            👋
          </span>
        </p>
        <p className='contact-form-subtitle'>
          Ask us anything, or share your feedback.
        </p>
      </div>
      <Form />
    </section>
  );
};

export default ContactForm;
