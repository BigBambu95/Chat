import React from 'react';

import './user-list.css';
import Button from '../button';
import Preloader from '../preloader';

const UserList = ({ users, startConversation, loading }) => {

    if(loading) return <Preloader />;

    if(users.length < 1) return <div styleName="user-list no-users">Не найдено ни одного пользователя онлайн</div>;

    return(
        <div styleName="user-list">
            {
                users.map(({ chatId, username }) => {
                    return (
                        <div key={chatId} styleName="user">
                            <div>{username}</div>
                            <Button variant="text" onClick={() => startConversation({ chatId, username })}>Начать диалог</Button>
                        </div>

                    );
                })
            }
        </div>
    )
}


export default UserList;