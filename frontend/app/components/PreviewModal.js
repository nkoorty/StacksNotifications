import React from 'react';

const PreviewModal = ({ preferences, onClose }) => {
  if (!preferences) return null;

  return (
    <div className="preview-modal-overlay">
      <div className="preview-modal">
        <h2>Preview Your Notification Preferences</h2>
        <p><strong>Email:</strong> {preferences.email}</p>
        <p><strong>Frequency:</strong> {preferences.frequency}</p>
        <p><strong>Event Type:</strong> {preferences.eventType}</p>
        <button onClick={onClose}>Close Preview</button>
      </div>
    </div>
  );
};

export default PreviewModal;
