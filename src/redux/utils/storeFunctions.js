export function getNextCategoryKey(store){
    const newCategoryKey = store.getState().category.categories.length + 1;
    if(newCategoryKey < 10){
        return '00' + newCategoryKey
    }
    else{
        return '0' + newCategoryKey
    }
}

export function getNextExpenseKey(store){
    const newExpenseKey = store.getState().expense.expenses.length + 1;
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

export function getCategoryID(store, categoryName){
    const categories = store.getState().category.categories;
    let storedCategory = categories.find(category => category.category_name == categoryName)
    console.log('storedCategory', storedCategory)
    return storedCategory.category_id
}
