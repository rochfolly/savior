export const getAllCategories = store => store.category.categories;

export const getAllExpenses = store => store.expense.expenses;

export const getExpensesFromCategory = (store, category) => {
    return store.expense.expenses.filter(expense => expense.category_name === category)
};