import { SET_CATEGORIES } from './actionTypes'

export const setCategories = categories => ({
    type: SET_CATEGORIES,
    payload: {
        content: categories
    }
})