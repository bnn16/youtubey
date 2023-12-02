import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthProvider';

interface Message {
  id: number;
  text: string;
  name: string;
}

interface ChatProps {
  messages: Message[];
  typingStatus: string;
  lastMessageRef: any;
}

const ChatMessages: React.FC<ChatProps> = ({
  messages,
  typingStatus,
  lastMessageRef,
}) => {
  const navigate = useNavigate();
  const { userId } = useAuth();

  const handleLeaveChat = () => {
    navigate('/dashboard');
    window.location.reload();
  };
  return (
    <>
      <header className="chat__mainHeader">
        <p></p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message) =>
          message.name === userId ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatMessages;
