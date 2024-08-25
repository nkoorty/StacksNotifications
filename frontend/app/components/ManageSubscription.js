import { useState, useEffect } from 'react';
import styles from './manageSubscriptions.module.css';

const ManageSubscriptions = ({ contractAddress }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [eventType, setEventType] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('SP9876543210abcdef1234567890abcdef12345678');

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch(`/api/list-user-subscriptions?contractAddress=${contractAddress}&user=${user}`);
      const data = await response.json();
      setSubscriptions(data.subscriptions);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const subscribe = async () => {
    try {
      await fetch(`/api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contractAddress, user, eventType, email }),
      });
      fetchSubscriptions();
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  const unsubscribe = async (eventType) => {
    try {
      await fetch(`/api/unsubscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contractAddress, user, eventType }),
      });
      fetchSubscriptions();
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
  };

  return (
    <div className={styles.manageSubscriptionsContainer}>
      <h2>Manage Subscriptions</h2>
      <div className={styles.subscriptionForm}>
        <input
          type="text"
          placeholder="Event Type"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={subscribe}>Subscribe</button>
      </div>
      <ul className={styles.subscriptionList}>
        {subscriptions.map((subscription, index) => (
          <li key={index} className={styles.subscriptionItem}>
            <p>Event Type: {subscription.eventType}</p>
            <p>Email: {subscription.email}</p>
            <p>Expires At: {subscription.expiresAt}</p>
            <button onClick={() => unsubscribe(subscription.eventType)}>Unsubscribe</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageSubscriptions;
