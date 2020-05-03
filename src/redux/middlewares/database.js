import * as firebase from 'firebase';

import { INIT_CATEGORIES, INIT_EXPENSES, ADD_CATEGORY, ADD_EXPENSE } from '../actions/actionTypes';
import { getCategoryID, getNextCategoryKey, getNextExpenseKey } from '../../database/utils/storeFunctions';


var firebaseConfig = {
    apiKey: "AIzaSyDPZaXtO9hYIrvyGO-ACFwmwClesprGt6Y",
    authDomain: "savior-database.firebaseapp.com",
    databaseURL: "https://savior-database.firebaseio.com",
    projectId: "savior-database",
    storageBucket: "savior-database.appspot.com",
    messagingSenderId: "165579264658",
    appId: "1:165579264658:web:e61250132a47555e238c4b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase.database());

  export const database = store => next => action => {
    switch(action.type){
        // Categories
        case INIT_CATEGORIES: 
          firebase.database().ref('/categories').once('value', (categoriesData) => {
              console.log(categoriesData.val())
              action.payload = Object.values(categoriesData.val())
              next(action)
            }, (error) => {
            console.log(error)
          })
          break;
        case ADD_CATEGORY:
            const rawCategoryName = action.payload;
            const newCategoryKey = getNextCategoryKey(store);
            console.log('newKey', newCategoryKey);
            let newCategory = {
                category_id: newCategoryKey,
                category_name: rawCategoryName,
                primary: true,
                last_expense : null,
                daily_limit: null,
                monthly_limit: null,
                total_expenses: 0,
                master_category_id: null,
                child_categories: []
              }
            firebase.database().ref('categories/' + newCategoryKey).set(newCategory, (error) => {
                if(error) console.log(error)
                else {
                    console.log('Category ' + newCategoryKey + ' added');
                    action.payload = {
                        category_name: rawCategoryName,
                        primary: true,
                        total_expenses: 0,
                    }
                    next(action)
                }
            })
          break;
        
        // Expenses
        case INIT_EXPENSES:
            firebase.database().ref('/expenses').once('value', (expensesData) => {
                console.log(expensesData.val())
                action.payload = Object.values(expensesData.val())
                next(action)
              }, (error) => {
              console.log(error)
            })
          break;
          case ADD_EXPENSE:
            const newExpense = action.payload;
            const newExpenseKey = getNextExpenseKey(store);
            newExpense.expense_id = newExpenseKey
            newExpense.category_id = getCategoryID(store, newExpense.category_name)
            firebase.database().ref('expenses/' + newExpenseKey).set(newExpense, (error) => {
                if(error) console.log(error)
                else {
                    console.log('Expense ' + newExpenseKey + ' added');
                    action.payload = newExpense
                    next(action)
                }
            })
          break;
    }
  }





















{/* <script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->

<script>

</script> */}
