import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import socket from '../../config/socket';
import { 
    profileRequest, getMessage, loginRequest, logout,
    addNotification, addUser, startConversationRequest, sendMessage,
    startConversationResponse, removeUser, getUserList
} from '../../actions';

import Header from '../header';
import LoginForm from '../login-form';
import JoinForm from '../join-form';
import Chat from '../chat';
import UserList from '../user-list';
import Notification from '../notification';

import './app.css';
import Modal from '../modal';
import Button from '../button';

const App = ({ 
    isAuth, getProfile, login, 
    logout, sendMessage, getMessage, 
    conversation, username, addNotification,
    notification, addUser, users, 
    startConversation, startConversationResponse,
    error, removeUser, getUserList
}) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            getProfile(token);
        }
    }, []);

    useEffect(() => {
        socket.on('message', (msg) => {
            getMessage(msg);
        });

        socket.on('user join', (data) => {
            addUser(data);
        });

        socket.on('get user list', (users) => {
            getUserList(users);
        });

        socket.on('typing', (data) => {
            addNotification(data);
        });

        socket.on('user left', (data) => {
            removeUser(data.username);
            addNotification(data);
        });

        socket.on('start conversation', (data) => {
            addNotification(data);
            setModalIsOpen(true);
        });

    }, []);

    const startConversationResponseHandler = (success) => {
        startConversationResponse({ 
            success, 
            id: notification.id,
            username: notification.username
        });
        setModalIsOpen(false);
    }

    return(
        <div styleName="app">
            <Header isAuth={isAuth} logout={logout} />
            <div className="container">
            <main>
                <Redirect path="/" to="/login" />
                <Switch>
                    <Route path="/login" render={() => <LoginForm login={login} error={error} />} />
                    <Route path="/join" component={JoinForm} />
                    <Route path="/users" render={() => <UserList users={users} startConversation={startConversation} />} />
                    <Route path="/chat" render={() => <Chat sendMessage={sendMessage} conversation={conversation} username={username} isAuth={isAuth} notification={notification} />} />
                </Switch>
            </main>
            </div>
            <Modal isOpen={modalIsOpen}>
                <Notification notification={notification} />
                <Button variant="contained" onClick={() => startConversationResponseHandler(true)}>Начать</Button>
                <Button onClick={() => startConversationResponseHandler(false)}>Отменить</Button>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.chat.user.isAuth,
        username: state.chat.user.username,
        users: state.chat.users,
        conversation: state.chat.conversation,
        notification: state.chat.notification,
        error: state.chat.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfile: (data) => dispatch(profileRequest(data)),
        login: (data) => dispatch(loginRequest(data)),
        logout: () => dispatch(logout()),
        sendMessage: (msg) => dispatch(sendMessage(msg)),
        getMessage: (msg) => dispatch(getMessage(msg)),
        addNotification: (msg) => dispatch(addNotification(msg)),
        getUserList: (users) => dispatch(getUserList(users)),
        addUser: (user) => dispatch(addUser(user)),
        removeUser: (user) => dispatch(removeUser(user)),
        startConversation: (data) => dispatch(startConversationRequest(data)),
        startConversationResponse: (response) => dispatch(startConversationResponse(response))
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(App);
