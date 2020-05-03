import {INIT_CATEGORIES, ADD_CATEGORY} from '../actions/actionTypes'

const initialState = {
    categories: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case INIT_CATEGORIES: {
            console.info('SETTING CATEGORIES')
           // const { categories } = action.payload;
            return {
              ...state,
              categories: action.payload
            };
          }
          case ADD_CATEGORY: {
            console.info('ADD NEW CATEGORY')
           // const { categories } = action.payload;
            return {
              ...state,
              categories: [...state.categories, action.payload]
            };
          }
        default:
            return state
    }
}