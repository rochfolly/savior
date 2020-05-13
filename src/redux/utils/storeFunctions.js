import { getAllExpenses, getAllCategories } from '../selectors';

export function getNextCategoryKey(store){
    const categories = getAllCategories(store.getState());
    const lastCategory = categories[categories.length - 1];
    const lastCategoryID = parseInt(lastCategory.category_id);
    let newCategoryKey = (lastCategoryID + 1).toString();
    if(newCategoryKey < 10){
        return '00' + newCategoryKey
    }
    else{
        return '0' + newCategoryKey
    }
}

export function getNextExpenseKey(store){
    const expenses = getAllExpenses(store.getState());
    if(expenses.length > 0){
        const lastExpense = expenses[expenses.length - 1];
        const lastExpenseID = parseInt(lastExpense.expense_id);
        let newExpenseKey = (lastExpenseID + 1).toString();
        if(newExpenseKey < 10){
            return '00' + newExpenseKey
        }
        else if(newExpenseKey > 99){
            return newExpenseKey
        }
        else{
            return '0' + newExpenseKey
        }
    }
    return '001'
}

export function getCategoryID(store, categoryName){
    const categories = store.getState().category.categories;
    let storedCategory = categories.find(category => category.category_name == categoryName)
    console.log('storedCategory', storedCategory)
    return storedCategory.category_id
}
