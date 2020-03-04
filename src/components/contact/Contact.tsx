import React from 'react';
import ContactForm from './ContactForm';

interface Props {
  form: boolean;
}

const Contact: React.FC<Props> = ({ form }) => {
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
      <ContactForm />
    </section>
  );
};

export default Contact;
