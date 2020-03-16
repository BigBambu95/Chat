import React, { useState, useEffect } from "react";
import MessageList from "../message-list";
import Notification from "../notification";
import Button from "../button";

import './chat.css';

const Chat = ({
    conversation, notification, sendMessage, 
    username, isAuth, setConversationStatus,
    leaveConversation
}) => {

    useEffect(() => {
        if(conversation.status === 'typing') {
            setTimeout(() => {
                setConversationStatus('');
            }, 2000);
        }
    }, [conversation.status]);

    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        sendMessage({
            id: conversation.id,
            username,
            message
        });
        setMessage('');
    }

    const handleChange = (e) => {
        setMessage(e.target.value);
        if(conversation.status !== 'typing') {
            setConversationStatus('typing');
        }
    }

    if(!isAuth) return <div styleName="no-auth-message">Авторизуйтесь чтобы воспользоваться чатом</div>;

    return(
        <div styleName="chat">
            <header styleName="header">
                <div>
                    <Button onClick={leaveConversation}>Покинуть чат</Button>
                </div>
                <div>{conversation.username}</div>
            </header>
            <MessageList conversation={conversation} username={username} />
            <Notification notification={notification} />
            <form styleName="form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    styleName="input" 
                    name="message" 
                    placeholder="Напишите сообщение..." 
                    value={message} 
                    onChange={(e) => handleChange(e)} 
                />
                <Button variant="outlined">Отправить</Button>
            </form>
        </div>
    )
};

export default Chat;
