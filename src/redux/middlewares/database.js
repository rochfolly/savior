import firebase  from '../../database/firebaseInit';
import { 
  INIT_CATEGORIES, INIT_EXPENSES, INIT_FIREBASE, 
  ADD_CATEGORY, ADD_EXPENSE, UPDATE_CATEGORY, UPDATE_EXPENSE,
  CREATE_USER, SET_USER, REMOVE_EXPENSE } from '../actions/actionTypes';
import { getCategoryID, getCategoryByID, getCategoryIcon, getNextCategoryKey, getNextExpenseKey, getExpense } from '../../utils/storeFunctions';
import { updateCategory, setCurrentUser } from '../actions/actions'
import {  getCurrentUserID } from '../selectors';
import { getInitialSaviorCategories } from '../../utils/firebaseFunctions';



  ////// DATABASE MIDDLEWARE //////
  export const database = store => next => action => {
    let userID = getCurrentUserID(store.getState());
    switch(action.type){
      
        case INIT_FIREBASE: 
          action.payload = firebase;
          next(action);
        //   firebase.database().ref('DGxx1LOWyldPGQjctOggwZFXMdB3' + '/expenses').once('value', (expensesData) => {
        //     if(expensesData.exists()){
        //       let expenses = expensesData.val();
        //       firebase.database().ref('/expenses/').set(expenses, (error) => {
        //        if(error) console.log(error)
        //        else {
        //            console.log("Roch's expenses reinitialized");              
        //        }
        //    })
        //     }
        //   }, (error) => {
        //   console.log(error)
        // })
          break;

        case CREATE_USER:
          let newUserEmail = action.payload.email;
          let newUserPassword = action.payload.password;
          let name = action.payload.name;
          // Create Firebase account
          firebase.auth().createUserWithEmailAndPassword(newUserEmail, newUserPassword).then(userData => {
            let newUser = userData.user;
            console.log('NEW USER', userData.user);
            const userInfo = {
              username: name,
              created: newUser.metadata.creationTime,
              lastConnection: newUser.metadata.lastSignInTime,
              email: newUserEmail,
              uid: newUser.uid,
            }
            const initialCategories = getInitialSaviorCategories()
            // Create user table
            firebase.database().ref(newUser.uid + '/user/').set(userInfo, (error) => {
              if(error) console.log(error)
              else {
                firebase.database().ref(newUser.uid + '/categories/').set(initialCategories, (error) => {
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
            alert(error.message)
          });  
          break;

        case SET_USER: 
          let email = action.payload.email;
          let password = action.payload.password;
          firebase.auth().signInWithEmailAndPassword(email, password).then(userData => {
            console.log('Login USER', userData.user);
            let loggedInUser = userData.user;
            action.payload.user = loggedInUser;
            action.payload.uid = loggedInUser.uid;
            firebase.database().ref(loggedInUser.uid + '/user/username').once('value', (nameData) => {
              action.payload.name = nameData.val();
              next(action)
            }, (error) => {
              alert(error.message);
              console.log(error)
            })
          }).catch(error => {
            console.log(error);
            alert(error.message);
            }); 
          break;

        ////////////////////////////////////// CATEGORIES /////////////////////////////////////////////
        case INIT_CATEGORIES:
          firebase.database().ref(userID + '/categories').once('value', (categoriesData) => {
              action.payload = Object.values(categoriesData.val())
              next(action)
            }, (error) => {
            console.log(error)
          })
          break;

        case ADD_CATEGORY:
            const rawCategory = action.payload;
            const newCategoryKey = getNextCategoryKey(store);
            let newCategory = {
                category_id: newCategoryKey,
                category_name: rawCategory.category_name,
                icon: rawCategory.icon ?? 'lock-question',
                primary: rawCategory.primary ?? true,
                weekly_limit: rawCategory.weekly_limit ?? null,
                monthly_limit: rawCategory.monthly_limit ?? null,
                total_expenses: 0
              }
            firebase.database().ref(userID + '/categories/' + newCategoryKey).set(newCategory, (error) => {
                if(error) console.log(error)
                else {
                    action.payload = newCategory
                    next(action)
                    console.log('Category ' + newCategoryKey + ' added');
                }
            })
          break;
        case UPDATE_CATEGORY: 
            const updatedCategory = action.payload;
            const updatedCategoryKey = updatedCategory.category_id
            firebase.database().ref(userID + '/categories/' + updatedCategoryKey).set(updatedCategory, (error) => {
              if(error) console.log(error)
              else next(action)
              console.log('Category ' + updatedCategoryKey + ' updated');
            })
           break;
       

        ///////////////////////////////////// EXPENSES ////////////////////////////////////////////
        case INIT_EXPENSES:
            firebase.database().ref(userID + '/expenses').once('value', (expensesData) => {
                if(expensesData.exists()){
                  action.payload = Object.values(expensesData.val())
                  next(action)
                }
              }, (error) => {
              console.log(error)
            })
          break;

        case ADD_EXPENSE:
            const newExpense = action.payload;
            const newExpenseKey = getNextExpenseKey(store);
            newExpense.expense_id = newExpenseKey
            newExpense.category_id = getCategoryID(store, newExpense.category_name)
            newExpense.icon = getCategoryIcon(store, newExpense.category_name);
            firebase.database().ref(userID + '/expenses/' + newExpenseKey).set(newExpense, (error) => {
                if(error) console.log(error)
                else {
                    action.payload = newExpense
                    next(action)
                    console.log('Expense ' + newExpenseKey + ' added');
                    let updatedCategory = getCategoryByID(store, newExpense.category_id);
                    updatedCategory.total_expenses += newExpense.amount;
                    store.dispatch(updateCategory(updatedCategory));                
                }
            })
            firebase.database().ref('DGxx1LOWyldPGQjctOggwZFXMdB3' + '/expenses').once('value', (expensesData) => {
              if(expensesData.exists()){
                let expenses = Object.values(expensesData.val());
                let expensesKeys = Object.keys(expensesData.val());
                expenses.forEach((expense, index) => {
                  const icon = getCategoryIcon(store, expense.category_name);
                  firebase.database().ref('DGxx1LOWyldPGQjctOggwZFXMdB3' + '/expenses/' + expense.expense_id + '/icon').set(icon, (error) => {
                    if(error) console.log(error)
                    else {
                        console.log("Roch's icon set");              
                    }
                  })
                })
              }
            }, (error) => {
            console.log(error)
            })
          break;

        case UPDATE_EXPENSE:
            let editedExpense = action.payload;
            let editedExpenseKey = editedExpense.expense_id;
            let initialExpense = getExpense(store, editedExpenseKey);
            editedExpense.category_id = getCategoryID(store, editedExpense.category_name)
            firebase.database().ref(userID + '/expenses/' + editedExpenseKey).set(editedExpense, (error) => {
                if(error) console.log(error)
                else {
                    action.payload = editedExpense
                    next(action)
                    console.log('Expense ' + editedExpenseKey + ' updated');
                    if(initialExpense.amount != editedExpense.amount){
                      let updatedCategory = getCategoryByID(store, editedExpense.category_id);
                      updatedCategory.total_expenses += editedExpense.amount;
                      updatedCategory.total_expenses -= initialExpense.amount;
                      store.dispatch(updateCategory(updatedCategory));    
                    }
                    if(initialExpense.category_name !== editedExpense.category_name){
                      let initialCategory = getCategoryByID(store, initialExpense.category_id);
                      let updatedCategory = getCategoryByID(store, editedExpense.category_id);
                      updatedCategory.total_expenses += editedExpense.amount;
                      store.dispatch(updateCategory(updatedCategory));
                      initialCategory.total_expenses -= initialExpense.amount;
                      store.dispatch(updateCategory(initialCategory));    
                    }
                                
                }
            })
          break;
        case REMOVE_EXPENSE:
            const removedExpense = action.payload;
            firebase.database().ref(userID + '/expenses/' + removedExpense.expense_id).remove((error) => {
              if(error) console.log(error)
              else {
                  next(action)
                  console.log('Expense ' + removedExpense.title + '  removed');
                  let updatedCategory = getCategoryByID(store, removedExpense.category_id);
                  updatedCategory.total_expenses -= removedExpense.amount;
                  store.dispatch(updateCategory(updatedCategory));                
              }
            }) 
          break;
    }
  }


  // let newCategory = {
  //   category_id: newCategoryKey,
  //   category_name: rawCategoryName,
  //   primary: true,
  //   last_expense : null,
  //   daily_limit: null,
  //   monthly_limit: null,
  //   total_expenses: 0,
  //   master_category_id: null,
  //   child_categories: []
  // }