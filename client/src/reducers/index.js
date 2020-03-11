import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import chatReducer from './chat';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    chat: chatReducer
});

export default createRootReducer;