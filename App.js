import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Provider } from 'react-redux';

import store from './src/redux/store'
import ExpenseForm from './src/components/ExpenseForm'

export default function App() {
  return (
    <Provider store={store}>
      <ExpenseForm />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
