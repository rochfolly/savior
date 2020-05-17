import {INIT_EXPENSES, ADD_EXPENSE, REMOVE_EXPENSE, UPDATE_EXPENSE} from '../actions/actionTypes'

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
          break;

        case ADD_EXPENSE: {
           // const expense = action.payload;
            return {
              ...state,
              expenses: [...state.expenses, action.payload]
            };
          }
          break;

        case UPDATE_EXPENSE: {
            const { expense_id } = action.payload;
            const expenseToUpdate = state.expenses.find(expense => expense.expense_id === expense_id);
            const indexInCurrentState = state.expenses.indexOf(expenseToUpdate);
            console.log(indexInCurrentState, expenseToUpdate);
            return {
              ...state,
              expenses: state.expenses.map((exp, index) => {
                if(index === indexInCurrentState){
                  return action.payload
                }
                return exp
              })
            };
          }
          break;

        case REMOVE_EXPENSE: {
            const { expense_id } = action.payload;
            return {
              ...state,
              expenses: state.expenses.filter(expense => expense.expense_id !== expense_id)
            }
          }
          break;
        default:
            return state;
    }
}