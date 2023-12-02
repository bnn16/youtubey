// ChatFooter.tsx
import React, { useState } from 'react';
import { useAuth } from '../../utils/AuthProvider';
import { Socket } from 'socket.io-client';

interface ChatFooterProps {
  socket: Socket;
}

const ChatFooter: React.FC<ChatFooterProps> = ({ socket }) => {
  const [message, setMessage] = useState('');
  const { userId } = useAuth();
  const handleTyping = () => socket.emit('typing', `${userId} is typing`);

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (message.trim() && userId) {
      socket.emit('message', {
        text: message,
        name: userId,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
