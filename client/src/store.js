import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';

import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';

import createRootReducer from './reducers';


export const history = createBrowserHistory();

const stringMiddleware = () => next => action => {
    if(typeof action === 'string') {
      return next({
        type: action
      });
    }
  
    return next(action);
  };

export default function configureStore () {
    const sagaMiddleware = createSagaMiddleware();

    const store = {
        ...createStore(
            createRootReducer(history),
            composeWithDevTools(
                applyMiddleware(
                    routerMiddleware(history), 
                    stringMiddleware,
                    sagaMiddleware
                )
            )
        ),
        runSaga: sagaMiddleware.run
    }


    return store;
}

