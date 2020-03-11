import React from 'react';

import './message-list.css';

const MessageList = ({ conversation, username }) => {

    const messageList = conversation.messages.map((item, idx) => {

        const clazz = item.username === username ? 'message-out' : 'message-in';

        return (
            <div key={idx} styleName={`message ${clazz}`}>
                <div styleName="body">
                    <div>{item.message}</div>
                    <div styleName="time">{item.time}</div>
                </div>
            </div>
        );
    });

    const content = conversation.messages.length < 1 ? <div styleName="no-message-label">В этом чате еще нет сообщений</div> : messageList;

    return(
        <div styleName="message-list">
            {content}
        </div>
    )
};

MessageList.defaultProps = {
    conversation: {}
}

export default MessageList;