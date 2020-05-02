import * as firebase from 'firebase';

import { SET_CATEGORIES } from '../actions/actionTypes';

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
  console.log(firebase.database);

  export const database = store => next => action => {
    switch(action.type){
        case SET_CATEGORIES: 
          firebase.database().ref('categories/001').set({
            category_name: 'travel',
            primary: true,
            last_expense : null,
            daily_limit: null,
            monthly_limit: null,
            total_expenses: 0,
            master_category_id: null,
            child_categories: []
          }).then((category) => {
            console.log(category)
          }).catch(error => console.log(error));
    }
    console.log('dispatching', action)
    return result
  }





















{/* <script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->

<script>

</script> */}
