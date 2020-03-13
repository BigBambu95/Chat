import React from 'react';

import './user-list.css';
import Button from '../button';

const UserList = ({ users, startConversation }) => {

    if(users.length < 1) return <div styleName="user-list no-users">Не найдено ни одного пользователя онлайн</div>;

    return(
        <div styleName="user-list">
            {
                users.map(({ id, username }) => {
                    return (
                        <div key={id} styleName="user">
                            <div>{username}</div>
                            <Button variant="text" onClick={() => startConversation({ id, username })}>Начать диалог</Button>
                        </div>

                    );
                })
            }
        </div>
    )
}


export default UserList;