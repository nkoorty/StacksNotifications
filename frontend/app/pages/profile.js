import { useState } from 'react';
import EmailNotificationPreferences from '../components/EmailNotificationPreferences';

const Profile = () => {
  const [preferences, setPreferences] = useState(null);

  const handleSavePreferences = async (newPreferences) => {
    const response = await fetch('/api/save-preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPreferences),
    });

    if (response.ok) {
      setPreferences(newPreferences);
    }
  };

  return (
    <div className="profile">
      <h1>Profile Settings</h1>
      <EmailNotificationPreferences onSave={handleSavePreferences} />
      {preferences && (
        <div className="current-preferences">
          <h3>Current Preferences:</h3>
          <p><strong>Email:</strong> {preferences.email}</p>
          <p><strong>Frequency:</strong> {preferences.frequency}</p>
          <p><strong>Event Type:</strong> {preferences.eventType}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
