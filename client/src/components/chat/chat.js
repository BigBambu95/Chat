import React, { useState } from "react";
import MessageList from "../message-list";
import Notification from "../notification";
import Button from "../button";

import './chat.css';

const Chat = ({
    conversation, notification, sendMessage, 
    username, isAuth
}) => {

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

    if(!isAuth) return <div styleName="no-auth-message">Авторизуйтесь чтобы воспользоваться чатом</div>;

    return(
        <div styleName="chat">
            <header styleName="header">{conversation.username}</header>
            <MessageList conversation={conversation} username={username} />
            <Notification notification={notification} />
            <form styleName="form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    styleName="input" 
                    name="message" 
                    placeholder="Напишите сообщение..." 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                />
                <Button variant="outlined">Отправить</Button>
            </form>
        </div>
    )
};

export default Chat;
