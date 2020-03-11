import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import App from '../src/components/app';
import './index.css';

import configureStore, { history } from './store';
import rootSaga from './sagas';
import ChatServiceContext from './chat-service-context';
import ChatService from './services/chat-service';

const store = configureStore();
store.runSaga(rootSaga);

export const chatService = new ChatService();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ChatServiceContext.Provider value={chatService}>
                <App />
            </ChatServiceContext.Provider>
        </ConnectedRouter>
    </Provider>, 
    document.getElementById('root')
);