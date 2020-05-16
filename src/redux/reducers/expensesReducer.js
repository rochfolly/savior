import {INIT_EXPENSES, ADD_EXPENSE, REMOVE_EXPENSE} from '../actions/actionTypes'

const initialState = {
    expenses: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case INIT_EXPENSES: {
           // const { expenses } = action.payload;
            return {
              ...state,
              expenses: action.payload
            };
          }
          case ADD_EXPENSE: {
           // const { expenses } = action.payload;
            return {
              ...state,
              expenses: [...state.expenses, action.payload]
            };
          }
          case REMOVE_EXPENSE: {
            const { expense_id } = action.payload;
            return {
              ...state,
              expenses: state.expenses.filter(expense => expense.expense_id !== expense_id)
            }
          }
        default:
            return state;
    }
}