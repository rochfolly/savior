import {SET_EXPENSES, ADD_EXPENSE} from '../actions/actionTypes'

const initialState = {
    expenses: [
        {title: "Déjeuner", amount: "12", category: "Food", created: "Feb 18 2020"},
        {title: "Chaussures", amount: "12", category: "Clothing", created: "Feb 12 2020"},
        {title: "Uber", amount: "12", category: "Transport", created: "Jan 31 2020"},
        {title: "Billets d'avion", amount: "12", category: "Travel", created: "Feb 18 2020"},
    ]
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_EXPENSES: {
            console.info('SETTING CATEGORIES')
           // const { categories } = action.payload;
            return {
              ...state,
              categories: action.payload
            };
          }
          case ADD_EXPENSE: {
            console.info('ADD NEW CATEGORY')
           // const { categories } = action.payload;
            return {
              ...state,
              categories: [...state.categories, action.payload]
            };
          }
        default:
            return state;
    }
}