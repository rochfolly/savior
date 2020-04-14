import { createStore, combineReducers } from 'redux'
import categoriesReducer from './reducers/categoriesReducer'

const rootReducer = combineReducers({categoriesReducer})

const store = createStore(rootReducer)

export default store;