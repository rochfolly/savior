import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import store from './src/redux/store'
import ExpenseForm from './src/components/ExpenseForm'
import HomeScreen from './src/components/HomeScreen'
import SaviorHeader from './src/components/SaviorHeader';

const Tab = createBottomTabNavigator();

export default function App() {
  
  return (
    <Provider store={store}>
      <SaviorHeader />
      <NavigationContainer>
        <Tab.Navigator 
          initialRouteName="Home" 
          backBehavior="history"
          tabBarOptions={{
            activeBackgroundColor: 'grey',
          }}
        >
          <Tab.Screen 
            name="Expenses" 
            component={HomeScreen} 
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen 
            name="New"  
            component={ExpenseForm} 
            options={{
              tabBarLabel: 'New',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="plus" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
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
