import React, { useState } from 'react';
import Button from '../button';

import './login-form.css';

const LoginForm = ({ login, error }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        login({
            username,
            password
        });
    }   

    return(
        <div styleName="form-wrapper">
            <h1>Вход</h1>
            <form styleName="form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <input type="text" name="username" placeholder="Логин" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" name="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <Button className="contained">Отправить</Button>
                </div>
            </form>
            <p className="error">{error}</p>
        </div>
    )
};

export default LoginForm;
