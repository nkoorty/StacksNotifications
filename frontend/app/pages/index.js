import { useState, useEffect } from 'react';
import EventFilter from '../components/EventFilter';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ eventType: '', sender: '' });

  useEffect(() => {
    const fetchFilteredEvents = async () => {
      let query = `/api/events?`;

      if (filters.eventType) {
        query += `type=${filters.eventType}&`;
      }

      if (filters.sender) {
        query += `sender=${filters.sender}`;
      }

      const response = await fetch(query);
      const data = await response.json();
      setEvents(data);
    };

    fetchFilteredEvents();
  }, [filters]);

  return (
    <div className="home">
      <h1>Event Notifications</h1>
      <EventFilter onFilterChange={setFilters} />
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <strong>Type:</strong> {event.eventType} <br />
            <strong>Sender:</strong> {event.sender} <br />
            <strong>Timestamp:</strong> {event.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
