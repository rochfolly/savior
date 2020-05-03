
import { StyleSheet } from 'react-native';

export default {
    // Single Expense Row
    rowExpense: {
        backgroundColor: 'green',
        margin: 1,
        padding: 2,
      //  fontSize: 20,
        flexDirection: 'row',
        borderRadius: 5,
    },

    rowExpenseLeft: {
        flexDirection: 'column',
    },
    rowTitle: {
      fontWeight: 'bold',
      fontSize: 20,
      color: 'white',
    },
    rowCategory: {
      fontSize: 15,
      color: 'white',
    },

    rowExpenseRight: {
        
    },
    rowAmount: {
        fontSize: 20,
     //   fontWeight: 'bold',
        color: 'red',
        marginRight: 0,
    },

    // Expense List
    listExpense: {
        margin: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '80%',
    }
  };