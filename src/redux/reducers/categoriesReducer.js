import {INIT_CATEGORIES, ADD_CATEGORY, UPDATE_CATEGORY} from '../actions/actionTypes'

const initialState = {
    categories: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case INIT_CATEGORIES: {
            const currentCategories = action.payload;
            return {
              ...state,
              categories: currentCategories
            };
          }
          break;

        case ADD_CATEGORY: {
            const newCategory = action.payload;
            return {
              ...state,
              categories: [...state.categories, newCategory]
            };
          }
          break;

        case UPDATE_CATEGORY: {
             const { category_id } = action.payload;
             const categoryToUpdate = state.categories.find(category => category.category_id === category_id);
             const indexInCurrentState = state.categories.indexOf(categoryToUpdate);
             console.log(indexInCurrentState, categoryToUpdate);
             return {
               ...state,
               categories: state.categories.map((categ, index) => {
                 if(index === indexInCurrentState){
                   return action.payload
                 }
                 return categ
               })
             };
           }
           break;
        default:
            return state
    }
}