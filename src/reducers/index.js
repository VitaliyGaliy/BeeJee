import { createStore, applyMiddleware } from 'redux';
import loogger from 'redux-logger';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import main from './main';

const reducers = combineReducers({
    main,
});

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
    middleware.push(loogger);
}

const store = createStore(reducers, applyMiddleware(...middleware));

export default store;




