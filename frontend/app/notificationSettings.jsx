import React from 'react';
import NotificationSettings from './components/NotificationSettings';
import Link from 'next/link';
import styles from './notificationSettings.module.css';

const NotificationSettingsPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1>Manage Your Notifications</h1>
      <p>Customize how you receive notifications about your smart contract interactions.</p>
      <NotificationSettings />
      <div className={styles.backLink}>
        <Link href="/">← Back to Home</Link>
      </div>
    </div>
  );
};

export default NotificationSettingsPage;
