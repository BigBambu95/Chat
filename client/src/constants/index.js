export const actions = {
    REGISTER_REQUEST : 'REGISTER_REQUEST',
    REGISTER_SUCCESS : 'REGISTER_SUCCESS',
    REGISTER_FAILURE : 'REGISTER_FAILURE',
    PROFILE_REQUEST : 'PROFILE_REQUEST',
    PROFILE_SUCCESS : 'PROFILE_SUCCESS',
    LOGIN_REQUEST : 'LOGIN_REQUEST',
    LOGIN_SUCCESS : 'LOGIN_SUCCESS',
    LOGIN_FAILURE : 'LOGIN_FAILURE',
    LOGOUT : 'LOGOUT',
    FETCHED_USER : 'FETCHED_USER',
    REQUESTED_USER : 'REQUESTED_USER',
    REQUESTED_USER_SUCCESS : 'REQUESTED_USER_SUCCESS',
    REQUESTED_USER_FAILURE : 'REQUESTED_USER_FAILURE',
    FETCHED_MESSAGES : 'FETCHED_MESSAGES',
    REQUESTED_MESSAGES : 'REQUESTED_MESSAGES',
    REQUESTED_MESSAGES_SUCCESS : 'REQUESTED_MESSAGES_SUCCESS',
    REQUESTED_MESSAGES_FAILURE : 'REQUESTED_MESSAGES_FAILURE',
    GET_USERLIST : 'GET_USERLIST',
    ADD_USER : 'ADD_USER',
    REMOVE_USER : 'REMOVE_USER',
    SEND_MESSAGE : 'SEND_MESSAGE',
    GET_MESSAGE : 'GET_MESSAGE',
    GET_MESSAGE_SUCCESS : 'GET_MESSAGE_SUCCESS',
    ADD_NOTIFICATION : 'ADD_NOTIFICATION',
    ADD_NOTIFICATION_SUCCESS: 'ADD_NOTIFICATION_SUCCESS',
    REMOVE_NOTIFICATION : 'REMOVE_NOTIFICATION',
    START_CONVERSATION_REQUEST : 'START_CONVERSATION_REQUEST',
    START_CONVERSATION_RESPONSE : 'START_CONVERSATION_RESPONSE',
    SET_CONVERSTAION_STATUS : 'SET_CONVERSTAION_STATUS',
    LEAVE_CONVERSATION : 'LEAVE_CONVERSATION'
};

export const notificationEvents = {
    'connect': 'вошел в чат',
    'disconnect': 'покинул(а) чат',
    'typing': 'печатает сообщение...',
    'start conversation': 'хочет начать с вами диалог'
};