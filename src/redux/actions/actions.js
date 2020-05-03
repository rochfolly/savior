import { INIT_CATEGORIES, ADD_CATEGORY, ADD_EXPENSE, INIT_EXPENSES } from './actionTypes'

export const setCategories = _ => ({
    type: INIT_CATEGORIES,
})

export const addCategory = newCategory => ({
    type: ADD_CATEGORY,
    payload: newCategory
})

export const setExpenses = _ => ({
    type: INIT_EXPENSES,
})

export const addExpense = newExpense => ({
    type: ADD_EXPENSE,
    payload: newExpense
})