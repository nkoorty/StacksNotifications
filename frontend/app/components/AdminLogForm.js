import { useState } from 'react';
import apiRequest from '../lib/apiRequest';

const AdminLogform = ({ initialPreferences }) => {
    const [preferences, setPreferences] = useState(initialPreferences || {});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        const { name, checked } = event.target;
        setPreferences({
            ...preferences,
            [name]: checked,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const response = await apiRequest('/api/save-preferences', 'POST', {
            user: 'sample-user-id',
            preferences,
        });

        if (response.success) {
            alert('Preferences saved successfully!');
        } else {
            setError('Failed to save preferences. Please try again later.');
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Notification Preferences</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <label>
                <input
                    type="checkbox"
                    name="transaction"
                    checked={preferences.transaction || false}
                    onChange={handleInputChange}
                />
                Notify on Transactions
            </label>
            <label>
                <input
                    type="checkbox"
                    name="stateChange"
                    checked={preferences.stateChange || false}
                    onChange={handleInputChange}
                />
                Notify on State Changes
            </label>
            <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Preferences'}
            </button>
        </form>
    );
};

export default NotificationSettingsForm;
