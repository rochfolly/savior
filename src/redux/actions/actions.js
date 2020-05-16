import { 
    INIT_CATEGORIES, INIT_EXPENSES, INIT_FIREBASE,
    ADD_CATEGORY, ADD_EXPENSE, 
    UPDATE_CATEGORY,
    REMOVE_EXPENSE,
    CREATE_USER, SET_USER,
} from './actionTypes'

export const setCategories = _ => ({
    type: INIT_CATEGORIES,
})

export const addCategory = newCategory => ({
    type: ADD_CATEGORY,
    payload: newCategory
})

export const updateCategory = updatedCategory => ({
    type: UPDATE_CATEGORY,
    payload: updatedCategory
})

export const setExpenses = _ => ({
    type: INIT_EXPENSES,
})

export const addExpense = newExpense => ({
    type: ADD_EXPENSE,
    payload: newExpense
})

export const removeExpense = removedExpense => ({
    type: REMOVE_EXPENSE,
    payload: removedExpense
})

export const setFirebase = _ => ({
    type: INIT_FIREBASE,
})

export const createUserAccount = (name, email, password) => ({
    type: CREATE_USER,
    payload: {name, email, password}
})

export const setCurrentUser = (email, password) => ({
    type: SET_USER,
    payload: {email, password}
})