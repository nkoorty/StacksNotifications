import NotificationSettingsForm from '../components/NotificationSettingsForm';

export default function Profile() {
    const initialPreferences = {
        transaction: true,
        stateChange: false,
    };

    return (
        <div>
            <h1>User Profile</h1>
            <NotificationSettingsForm initialPreferences={initialPreferences} />
        </div>
    );
}
