import { getAllExpenses, getAllCategories } from '../redux/selectors';


export function getCategoryByID(store, categoryID){
    const categories = store.getState().category.categories;
    return categories.find(category => category.category_id === categoryID);
}

export function getCategoryByName(store, categoryName){
    const categories = store.getState().category.categories;
    return categories.find(category => category.category_name === categoryName);
}

export function getExpense(store, expenseID){
    const expenses = store.getState().expense.expenses;
    return expenses.find(expense => expense.expense_id == expenseID)
}

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
    return storedCategory.category_id
}

export function getCategoryIcon(store, categoryName){
    const categories = store.getState().category.categories;
    let storedCategory = categories.find(category => category.category_name == categoryName)
    return storedCategory.icon;
}
