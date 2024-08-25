import NotificationSettings from '../components/NotificationSettings';

const Profile = () => {
  const handleSavePreferences = async (newPreferences) => {
    const response = await fetch('/api/save-preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPreferences),
    });

    if (response.ok) {
      // Handle success, e.g., show a success message or update state
    }
  };

  return (
    <div className="profile-page">
      <h1>Profile Settings</h1>
      <NotificationSettings onSave={handleSavePreferences} />
    </div>
  );
};

export default Profile;
