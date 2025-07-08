
import React from 'react';

const AnnouncementBanner = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-yellow-200 text-yellow-900 p-3 text-center font-semibold shadow-md">
      📢 {message}
    </div>
  );
};

export default AnnouncementBanner;
