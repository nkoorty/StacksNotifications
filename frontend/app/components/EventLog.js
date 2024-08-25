import { useState, useEffect } from 'react';
import styles from './eventLog.module.css';

const EventLog = ({ contractAddress }) => {
  const [eventLog, setEventLog] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    fetchEventLog();
  }, []);

  useEffect(() => {
    if (filterType) {
      const events = eventLog.filter(event => event.event === filterType);
      setFilteredEvents(events);
    } else {
      setFilteredEvents(eventLog);
    }
  }, [filterType, eventLog]);

  const fetchEventLog = async () => {
    try {
      const response = await fetch(`/api/get-event-log?contractAddress=${contractAddress}`);
      const data = await response.json();
      setEventLog(data.eventLog);
    } catch (error) {
      console.error('Error fetching event log:', error);
    }
  };

  return (
    <div className={styles.eventLogContainer}>
      <h2>Event Log</h2>
      <div className={styles.filterContainer}>
        <label htmlFor="filterType">Filter by Event Type:</label>
        <input
          id="filterType"
          type="text"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        />
      </div>
      <ul className={styles.eventList}>
        {filteredEvents.map((event, index) => (
          <li key={index} className={styles.eventItem}>
            <p>ID: {event.id}</p>
            <p>Event: {event.event}</p>
            <p>Timestamp: {event.timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventLog;
