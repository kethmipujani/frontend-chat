
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './chat.css';

const socket = io('http://localhost:4000'); 

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      const messageData = {
        username,
        message: message.trim(),
        sender: true, 
      };
      setMessages((prevMessages) => [...prevMessages, messageData]);
      socket.emit('message', messageData);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Forest Connect Chat</h2>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="username-input"
        />
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender ? 'chat-message-sender' : 'chat-message-receiver'}`}
          >
            <span className="chat-username">{msg.username}:</span> {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <form onSubmit={sendMessage} className="chat-form">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          type="text"
          className="chat-input"
        />
        <button type="submit" className="chat-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
