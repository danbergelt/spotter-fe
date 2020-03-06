import React, { useState } from 'react';
import ChangePassword from '../components/settings/ChangePassword';
import ChangeEmail from '../components/settings/ChangeEmail';
import ExportWorkouts from 'src/components/settings/ExportWorkouts';
import CloseAccount from 'src/components/settings/CloseAccount';
import { Helmet } from 'react-helmet-async';
import useToken from '../hooks/useToken';

const Settings: React.FC = () => {
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [changeEmail, setChangeEmail] = useState<boolean>(false);

  const t: string | null = useToken();

  return (
    // account settings
    // e.g. change password, change email
    <>
      <Helmet>
        <title>Settings | Spotter</title>
      </Helmet>
      <div className='settings-container spacer'>
        <section className='settings-section'>
          <p className='settings-head'>Account Settings</p>
          <ChangePassword
            changePassword={changePassword}
            setChangePassword={setChangePassword}
          />
          <ChangeEmail
            changeEmail={changeEmail}
            setChangeEmail={setChangeEmail}
          />
        </section>

        {/* export workout data as a CSV file */}
        <section className='settings-section'>
          <div className='settings-head'>Exports</div>
          <ExportWorkouts t={t} />
        </section>

        {/* delete account permanently
      will wipe all account-related details and send user to signup */}
        <section className='settings-section'>
          <p className='settings-head'>Close Account</p>
          <CloseAccount />
        </section>
      </div>
    </>
  );
};

export default Settings;
