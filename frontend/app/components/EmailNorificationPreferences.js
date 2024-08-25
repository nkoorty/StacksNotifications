import { useState } from 'react';

const EmailNotificationPreferences = ({ onSave }) => {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [eventType, setEventType] = useState('all');

  const handleSave = () => {
    const preferences = {
      email,
      frequency,
      eventType,
    };
    onSave(preferences);
  };

  return (
    <div className="email-notification-preferences">
      <h2>Email Notification Preferences</h2>
      <div className="preference-field">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
        />
      </div>
      <div className="preference-field">
        <label htmlFor="frequency">Notification Frequency:</label>
        <select
          id="frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="immediate">Immediate</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
      <div className="preference-field">
        <label htmlFor="event-type">Event Type:</label>
        <select
          id="event-type"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="all">All Events</option>
          <option value="transaction">Transactions</option>
          <option value="state-change">State Changes</option>
          <option value="custom-trigger">Custom Triggers</option>
        </select>
      </div>
      <button onClick={handleSave}>Save Preferences</button>
    </div>
  );
};

export default EmailNotificationPreferences;
