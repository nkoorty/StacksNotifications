import React, { useState } from 'react';
import styles from './notificationSettings.module.css'; // For styling

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleEmailChange = () => setEmailNotifications(!emailNotifications);
  const handleSmsChange = () => setSmsNotifications(!smsNotifications);

  return (
    <div className={styles.settingsContainer}>
      <h2>Notification Settings</h2>
      <div className={styles.settingItem}>
        <label>
          <input type="checkbox" checked={emailNotifications} onChange={handleEmailChange} />
          Email Notifications
        </label>
      </div>
      <div className={styles.settingItem}>
        <label>
          <input type="checkbox" checked={smsNotifications} onChange={handleSmsChange} />
          SMS Notifications
        </label>
      </div>
    </div>
  );
};

export default NotificationSettings;
