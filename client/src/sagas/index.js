import socket from '../config/socket';
import { put, takeEvery, fork, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
    registerSuccess, registerError, getMessage,
    loginSuccess, loginError, profileSuccess
} from "../actions";
import { actions } from "../constants";
import { chatService } from '../index';



function* watchRegister() {
    yield takeEvery(actions.REGISTER_REQUEST, register);
}

function* register(action) {
    try {
        const data = yield call(chatService.join, action.payload);
        if(data.message) {
            yield put(registerError(data.message));
        } else {
            yield put(registerSuccess(data.user));
            yield call(localStorage.setItem, data.jwt);
            yield put(push('/users'));
            yield socket.open();
            yield socket.emit('new user', data.user);
        }
    } catch(err) {
        console.error(err);
    }
}

function* watchGetProfile() {
    yield takeEvery(actions.PROFILE_REQUEST, getProfile);
}

function* getProfile(action) {
    try {
        const data = yield call(chatService.getProfile, action.payload);
        yield put(profileSuccess(data.user));
        yield put(push('/users'));
        yield socket.open();
        yield socket.emit('new user', data.user);
    } catch(err) {
        console.error(err);
    }
}

function* watchLogin() {
    yield takeEvery(actions.LOGIN_REQUEST, login);
}

function* login(action) {
    try {
        const data = yield call(chatService.login, action.payload);
        if(data.message) {
            yield put(loginError(data.message));
        } else {
            yield put(loginSuccess(data.user));
            yield localStorage.setItem('token', data.jwt);
            yield put(push('/users'));
            yield socket.open();
            yield socket.emit('new user', data.user);
        }
    } catch(err) {
        yield console.error(err);
    }
}

function* watchLogout() {
    yield takeEvery(actions.LOGOUT, logout);
}

function* logout() {
    try {
        yield localStorage.removeItem('token');
        yield put(push('/login'));
        yield socket.close();
    } catch (err) {
        console.error(err);
    }
}


function* watchSendMessage() {
    yield takeEvery(actions.SEND_MESSAGE, sendMessage);
}

function* sendMessage(action) {
    try {
        yield socket.emit('message', action.payload);
    } catch(err) {
        console.error(err);
    }
}

function* watchStartConversation() {
    yield takeEvery(actions.START_CONVERSATION_REQUEST, startConversation);
}

function* startConversation(action) {
    try {
        yield socket.emit('start conversation', action.payload);
        yield put(push('/chat'));
    } catch(err) {
        console.error(err);
    }
}

function* watchStartConversationResponse() {
    yield takeEvery(actions.START_CONVERSATION_RESPONSE, startConversationResponse);
}

function* startConversationResponse(action) {
    try {
        yield socket.emit('start conversation response', action.payload);
        if(action.payload.success) {
            yield put(push('/chat'));
        }
    } catch(err) {
        console.error(err);
    }
}


// function* watchAddNotificationAsync() {
//     yield takeEvery(actions.ADD_NOTIFICATION, addNotificationAsync);
// }

// function* addNotificationAsync(action) {
//     try {
//         yield put(addNotificationSuccess(action.payload))
//     } catch (err) {
//         console.log(err);
//     }
// }

export default function* rootSaga() {
    yield fork(watchRegister);
    yield fork(watchLogin);
    yield fork(watchGetProfile);
    yield fork(watchLogout);
    yield fork(watchStartConversation);
    yield fork(watchSendMessage);
    yield fork(watchStartConversationResponse);
}