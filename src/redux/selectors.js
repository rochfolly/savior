export const getCurrentUserID = state => state.auth.userID;

export const getCurrentUserName = state => state.auth.username;

export const getAllCategories = state => state.category.categories;

export const getAllExpenses = state => state.expense.expenses;

export const getExpensesFromCategory = (state, category) => {
    return state.expense.expenses.filter(expense => expense.category_name === category)
};

export const getTotalSpendings = state => {
    return state.expense.expenses.reduce((total, expense) => {return total + expense.amount}, 0)
};

export const getCategoryTotalSpendingsByName = (state, categoryName) => {
    let category = getCategoryByName(state, categoryName);
    return category.total_expenses
};

export const getCategoryTotalSpendingsByID = (state, categoryID) => {
    let category = getCategoryByID(state, categoryID);
    return category.total_expenses
};

