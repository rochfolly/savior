import { createStore, combineReducers, applyMiddleware } from 'redux';

import categoriesReducer from './reducers/categoriesReducer';
import expensesReducer from './reducers/expensesReducer';
import { database } from './middlewares/database';
import { logger } from './middlewares/logger'


const rootReducer = combineReducers({category: categoriesReducer, expense: expensesReducer});

const store = createStore(rootReducer, applyMiddleware(logger, database));

export default store;