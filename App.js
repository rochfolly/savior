import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';


import store from './src/redux/store'
import SaviorApp from './src/components/SaviorApp';

export default function App() {
  
  return (
    <Provider store={store}>
      <SaviorApp />
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
