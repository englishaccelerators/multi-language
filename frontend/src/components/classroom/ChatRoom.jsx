
import React, { useState } from 'react';

const ChatRoom = ({ messages, onSend }) => {
  const [msg, setMsg] = useState('');

  const handleSend = () => {
    if (msg.trim()) {
      onSend(msg);
      setMsg('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Classroom Chat</h2>
      <div className="h-48 overflow-y-auto border mb-2 p-2 bg-white">
        {messages.map((m, i) => (
          <div key={i} className="mb-1"><strong>{m.sender}:</strong> {m.text}</div>
        ))}
      </div>
      <input
        type="text"
        className="border p-2 w-full"
        value={msg}
        onChange={e => setMsg(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
        placeholder="Type a message..."
      />
    </div>
  );
};

export default ChatRoom;
