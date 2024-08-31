import { useState } from 'react';
import apiRequest from '../lib/apiRequest';

const NotificationSettingsForm = ({ initialPreferences }) => {
    const [preferences, setPreferences] = useState(initialPreferences || {});

    const handleInputChange = (event) => {
        const { name, checked } = event.target;
        setPreferences({
            ...preferences,
            [name]: checked,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await apiRequest('/api/save-preferences', 'POST', {
            user: 'sample-user-id',
            preferences,
        });

        if (response.success) {
            alert('Preferences saved successfully!');
        } else {
            alert('Failed to save preferences. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Notification Preferences</h2>
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
            <button type="submit">Save Preferences</button>
        </form>
    );
};

export default NotificationSettingsForm;
