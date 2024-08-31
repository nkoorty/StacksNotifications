import { useState, useEffect } from 'react';
import apiRequest from '../lib/apiRequest';
import { formatDateTime } from '../lib/dateUtils';

const NotificationCenter = () => {
    const [notifications, setNotifications] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await apiRequest('/api/get-event-api');
            if (response.success) {
                setNotifications(response.events);
            } else {
                console.error('Failed to fetch notifications');
            }
        };

        fetchNotifications();
    }, []);

    const filteredNotifications = notifications.filter((notification) => {
        if (filter === 'all') return true;
        return notification.type === filter;
    });

    return (
        <div>
            <h2>Notification Center</h2>
            <div>
                <label>Filter by type: </label>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="transaction">Transaction</option>
                    <option value="state-change">State Change</option>
                </select>
            </div>
            <ul>
                {filteredNotifications.map((notification) => (
                    <li key={notification.id}>
                        <strong>{notification.type}</strong>: {notification.description}
                        <br />
                        <small>{formatDateTime(notification.timestamp)}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationCenter;
