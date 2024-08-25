import { useState, useEffect } from 'react';
import styles from './adminDashboard.module.css';

const AdminDashboard = ({ contractAddress }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [eventType, setEventType] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch(`/api/list-all-subscribers?contractAddress=${contractAddress}&eventType=${eventType}`);
      const data = await response.json();
      setSubscriptions(data.subscriptions);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const cleanupExpiredSubscriptions = async () => {
    try {
      await fetch(`/api/cleanup-expired-subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contractAddress }),
      });
      fetchSubscriptions();
    } catch (error) {
      console.error('Error cleaning up expired subscriptions:', error);
    }
  };

  return (
    <div className={styles.adminDashboardContainer}>
      <h2>Admin Dashboard</h2>
      <div className={styles.subscriptionFilters}>
        <input
          type="text"
          placeholder="Event Type"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />
        <button onClick={fetchSubscriptions}>Fetch Subscriptions</button>
      </div>
      <button onClick={cleanupExpiredSubscriptions}>Cleanup Expired Subscriptions</button>
      <ul className={styles.subscriptionList}>
        {subscriptions.map((subscription, index) => (
          <li key={index} className={styles.subscriptionItem}>
            <p>User: {subscription.user}</p>
            <p>Event Type: {subscription.eventType}</p>
            <p>Email: {subscription.email}</p>
            <p>Expires At: {subscription.expiresAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
