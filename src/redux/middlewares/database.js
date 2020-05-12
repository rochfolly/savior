import * as firebase from 'firebase';

import { 
  INIT_CATEGORIES, INIT_EXPENSES, INIT_FIREBASE, 
  ADD_CATEGORY, ADD_EXPENSE, UPDATE_CATEGORY,
  CREATE_USER, SET_USER } from '../actions/actionTypes';
import { getCategoryID, getNextCategoryKey, getNextExpenseKey } from '../utils/storeFunctions';
import { updateCategory, setCurrentUser } from '../actions/actions'
import {  getCategoryByID } from '../selectors';
import { getInitialSaviorCategories } from '../../database/utils/firebaseFunctions';


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

  ////// DATABASE MIDDLEWARE //////
  export const database = store => next => action => {
    let uid = '';
    switch(action.type){
        case INIT_FIREBASE: 
          action.payload = firebase;
          next(action);
          break;

        case CREATE_USER:
          let newUserEmail = action.payload.email;
          let newUserPassword = action.payload.password;
          let name = action.payload.name;
          // Create Firebase account
          firebase.auth().createUserWithEmailAndPassword(newUserEmail, newUserPassword).then(userData => {
            let user = userData.user;
            console.log('NEW USER', userData.user);
            const userInfo = {
              username: name,
              created: user.metadata.creationTime,
              lastConnection: user.metadata.lastSignInTime,
              email: newUserEmail,
              uid: user.uid,
            }
            const initialCategories = getInitialSaviorCategories()
            // Create user table
            firebase.database().ref(user.uid + '/user/').set(userInfo, (error) => {
              if(error) console.log(error)
              else {
                firebase.database().ref(user.uid + '/categories/').set(initialCategories, (error) => {
                  if(error) console.log(error)
                  else {
                      next(action)
                      store.dispatch(setCurrentUser(newUserEmail, newUserPassword))              
                  }
                })          
              }
            })
          }).catch(error => {
            console.log(error);
            alert('An error occured', error)
          });  
          break;

        case SET_USER: 
          let email = action.payload.email;
          let password = action.payload.password;
          firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
            console.log('Login USER', user);
            action.payload.user = user;
            next(action);
          }).catch(error => {
            console.log(error);
            alert('An error occured')
            }); 
          break;

        // Categories
        case INIT_CATEGORIES: 
          firebase.database().ref('/categories').once('value', (categoriesData) => {
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
                    action.payload = {
                        category_id: newCategoryKey,
                        category_name: rawCategoryName,
                        primary: true,
                        total_expenses: 0,
                    }
                    next(action)
                    console.log('Category ' + newCategoryKey + ' added');
                }
            })
          break;
        case UPDATE_CATEGORY: 
            const updatedCategory = action.payload;
            const updatedCategoryKey = updatedCategory.category_id
            firebase.database().ref('categories/' + updatedCategoryKey).set(updatedCategory, (error) => {
              if(error) console.log(error)
              else next(action)
              console.log('Category ' + updatedCategoryKey + ' updated');
            })
           break;
       
        // Expenses
        case INIT_EXPENSES:
            firebase.database().ref('/expenses').once('value', (expensesData) => {
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
            console.log('newExpense', newExpense);
            firebase.database().ref('expenses/' + newExpenseKey).set(newExpense, (error) => {
                if(error) console.log(error)
                else {
                    action.payload = newExpense
                    next(action)
                    console.log('Expense ' + newExpenseKey + ' added');
                    let updatedCategory = getCategoryByID(store.getState(), newExpense.category_id);
                    updatedCategory.total_expenses += newExpense.amount;
                    console.log('CATEGORY UPDATED', updatedCategory);
                    store.dispatch(updateCategory(updatedCategory));                
                }
            })
          break;
    }
  }