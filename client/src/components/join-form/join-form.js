import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../button';
import './join-form.css';
import { register } from '../../actions'; 


const JoinForm = ({ register, error }) => {



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        register({
            username,
            password
        });
    }

    return(
        <div styleName="form-wrapper">
            <h1>Создание аккаунта</h1>
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
            <p>{error}</p>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        error: state.chat.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        register: (data) => dispatch(register(data))
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(JoinForm);
