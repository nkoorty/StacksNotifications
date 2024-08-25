import { useState } from 'react';

const EventFilter = ({ onFilterChange }) => {
  const [eventType, setEventType] = useState('');
  const [sender, setSender] = useState('');

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
    onFilterChange({ eventType: e.target.value, sender });
  };

  const handleSenderChange = (e) => {
    setSender(e.target.value);
    onFilterChange({ eventType, sender: e.target.value });
  };

  return (
    <div className="event-filter">
      <div className="filter-field">
        <label htmlFor="event-type">Event Type:</label>
        <input
          id="event-type"
          type="text"
          value={eventType}
          onChange={handleEventTypeChange}
          placeholder="Enter event type"
        />
      </div>
      <div className="filter-field">
        <label htmlFor="sender">Sender:</label>
        <input
          id="sender"
          type="text"
          value={sender}
          onChange={handleSenderChange}
          placeholder="Enter sender address"
        />
      </div>
    </div>
  );
};

export default EventFilter;
