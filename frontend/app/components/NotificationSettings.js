import React, { useState } from 'react';
import styles from './notificationsettings.module.css';

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailChange = () => setEmailNotifications(!emailNotifications);
  const handleSmsChange = () => setSmsNotifications(!smsNotifications);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    setTimeout(() => {
      setLoading(false);
      setMessage('Notification settings updated successfully.');
    }, 1000);
  };

  return (
    <div className={styles.settingsContainer}>
      <h2>Notification Settings</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default NotificationSettings;
