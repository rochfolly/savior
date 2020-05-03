import {INIT_EXPENSES, ADD_EXPENSE} from '../actions/actionTypes'

const initialState = {
    expenses: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case INIT_EXPENSES: {
            console.info('SETTING EXPENSES')
           // const { expenses } = action.payload;
            return {
              ...state,
              expenses: action.payload
            };
          }
          case ADD_EXPENSE: {
            console.info('ADD NEW EXPENSE')
           // const { expenses } = action.payload;
            return {
              ...state,
              expenses: [...state.expenses, action.payload]
            };
          }
        default:
            return state;
    }
}