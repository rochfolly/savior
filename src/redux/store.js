import { createStore, combineReducers, applyMiddleware } from 'redux';

import categoriesReducer from './reducers/categoriesReducer';
import expensesReducer from './reducers/expensesReducer';
import authReducer from './reducers/authReducer';
import { database } from './middlewares/database';
import { logger } from './middlewares/logger'



const rootReducer = combineReducers({
    category: categoriesReducer,
    expense: expensesReducer,
    auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(database, logger));

export default store;