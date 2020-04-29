import * as firebase from 'firebase';

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
  console.log(firebase);

  export const database = store => next => action => {
    switch(action.type){
        
    }
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }





















{/* <script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->

<script>

</script> */}
