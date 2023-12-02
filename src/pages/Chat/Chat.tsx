import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../layout/Layout';
import ChatFooter from './ChatFooter';
import ChatMessages from './ChatMessages';
import { Socket } from 'socket.io-client';

type Props = {
  socket: Socket;
};

type Message = {
  id: number;
  text: string;
  name: string;
};

const Chat = ({ socket }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef<any>(null);

  useEffect(() => {
    console.log(messages);
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    setTypingStatus('');
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Layout>
      <div className="chat__main">
        <ChatMessages
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter socket={socket} />
      </div>
    </Layout>
  );
};

export default Chat;
