import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import PreviewModal from './PreviewModal';

const NotificationSettings = ({ onSave }) => {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [eventType, setEventType] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleSave = async () => {
    if (!email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const preferences = {
      email,
      frequency,
      eventType,
    };

    try {
      await onSave(preferences);
      setSuccessMessage('Preferences saved successfully.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to save preferences. Please try again.');
      setSuccessMessage('');
    }
  };

  const handlePreview = () => {
    if (!email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setShowPreview(true);
  };

  return (
    <div className="notification-settings">
      <h2>Notification Settings</h2>
      <div className="form-group">
        <label htmlFor="email">
          Email Address
          <Tooltip content="We'll send notifications to this email." placement="right" />
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="frequency">
          Notification Frequency
          <Tooltip content="How often you'd like to receive notifications." placement="right" />
        </label>
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
      <div className="form-group">
        <label htmlFor="event-type">
          Event Type
          <Tooltip content="Which types of events you'd like to be notified about." placement="right" />
        </label>
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
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <button onClick={handlePreview}>Preview Preferences</button>
      <button onClick={handleSave}>Save Preferences</button>

      <PreviewModal
        preferences={{ email, frequency, eventType }}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
};

export default NotificationSettings;
