import React, { useState, useEffect } from 'react';
import { ReactComponent as Chat } from '../../assets/contact_icon_1.svg';
import { FiX } from 'react-icons/fi';
import useDelayUnmount from '../../hooks/useDelayUnmount';
import { useLocation } from 'react-router-dom';
import 'animate.css';
import ContactForm from './ContactForm';
import ScrollLock from 'react-scrolllock';
import { useWindowSize } from 'react-use';
import styles from './ContactForm.module.scss';

/*== Contact popup =====================================================

The popup component that renders the contact form. Appears as a small
circle on bottom right hand side of all pages, allows users (auth'd or
not) to send a contact message to the service team at spotter. 

The design is inspired by enterprise chat support systems such as Intercom:
https://www.intercom.com/

*/

const Popup: React.FC = () => {
  // form state, determines if contact form is shown
  const [form, setForm] = useState<boolean>(false);

  // a custom hook that delay's the unmounting of a component,
  // allowing us to run unmount transition animations
  const customMount: boolean = useDelayUnmount(form, 500);

  // grab the pathname, close the form
  // whenever we travel to a new page
  const { pathname } = useLocation();

  // if mounting, animate in, else animate out
  // animations from https://github.com/daneden/animate.css/
  const animatePopup = (): string => {
    if (form) {
      return 'animated rotateIn faster';
    } else {
      return 'animated zoomIn faster';
    }
  };

  // close the form when the page changes
  useEffect(() => {
    setForm(false);
  }, [pathname]);

  // grab the page width for scroll locking
  const { width } = useWindowSize();

  return (
    <>
      {/* lock scrolling when contact form is open on mobile */}
      <ScrollLock isActive={width <= 450 && form} />

      {/* run the transitions, then toggle the form */}
      {customMount && <ContactForm form={form} />}
      <div
        data-testid='contact-button'
        role='button'
        onClick={(): void => setForm(!form)}
        className={styles.popup}
      >
        {/* render X icon if form is open */}
        {form && <FiX color='white' size='27.5px' className={animatePopup()} />}

        {/* render chat icon if form is closed */}
        {!form && <Chat className={animatePopup()} />}
      </div>
    </>
  );
};

export default Popup;
