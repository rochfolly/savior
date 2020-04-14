import {SET_CATEGORIES} from '../actions/actionTypes'

const initialState = {
    categories: ['test']
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CATEGORIES: {
            console.info('SETTING CATEGORIES')
            const { content } = action.payload;
            return {
              ...state,
              categories: content
            };
          }
        default:
            return state
    }
}