import React, { useState, useEffect } from 'react';
import { ReactComponent as Contact } from '../../assets/contact_icon_1.svg';
import { FiX } from 'react-icons/fi';
import useDelayUnmount from './useDelayUnmount';
import { useLocation } from 'react-router-dom';
import 'animate.css';
import ContactForm from './ContactForm';
import ScrollLock from 'react-scrolllock';
import { useWindowSize } from 'react-use';

/*
  Contact pop-up
  Renders a form that allows the user to send an email w/ questions, concerns, etc.
  Displays on all pages in a fixed position in bottom-right corner
  Inspired by services such as Intercom
*/

const Popup: React.FC = () => {
  const [form, setForm] = useState<boolean>(false);
  const customMount: boolean = useDelayUnmount(form, 500);
  const { pathname } = useLocation();

  const close = 'animated rotateIn faster';
  const open = 'animated zoomIn faster';

  useEffect(() => {
    setForm(false);
  }, [pathname]);

  const { width } = useWindowSize();

  return (
    <>
      <ScrollLock isActive={width <= 450 && form && true} />
      {customMount && <ContactForm form={form} />}
      <div
        data-testid='contact-button'
        role='button'
        onClick={(): void => setForm(!form)}
        className='contact-popup-button'
      >
        {form && (
          <FiX
            size='27.5px'
            className={form ? `${close} contact-close` : 'contact-close'}
          />
        )}

        {!form && (
          <Contact
            className={!form ? `${open} contact-open` : 'contact-open'}
          />
        )}
      </div>
    </>
  );
};

export default Popup;
