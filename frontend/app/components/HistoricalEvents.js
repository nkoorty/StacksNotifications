import { useState, useEffect } from 'react';

const HistoricalEvents = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    const response = await fetch(`/api/get-historical-events?contract=${contractAddress}`);
    const data = await response.json();
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    if (contractAddress) {
      fetchEvents();
    }
  }, [contractAddress]);

  return (
    <div className="historical-events">
      <h2>Historical Events</h2>
      <div className="contract-input">
        <label htmlFor="contract">Contract Address:</label>
        <input
          id="contract"
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="Enter contract address"
        />
      </div>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <strong>Type:</strong> {event.eventType} <br />
              <strong>Sender:</strong> {event.sender} <br />
              <strong>Timestamp:</strong> {event.timestamp}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoricalEvents;
