export function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getNumberOfExpensesByCategory = (expenses, categoryID) => {
    return expenses.reduce((total, expense) => {
        if(expense.category_id == categoryID){
            return total + 1
        }
        return total
    }, 0)
};

export const getCategoryIcon = (categories, categoryName) => {
    let category = categories.find(category => category.category_name === categoryName);
    return category.icon
};