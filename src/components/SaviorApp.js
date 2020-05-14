import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { YellowBox } from 'react-native';
import _ from 'lodash';

import ExpenseList from './ExpenseList';
import CategoryList from './CategoryList';
import { setCategories, setExpenses, setFirebase } from '../redux/actions/actions';
import { getExpensesFromCategory, getAllExpenses, getTotalSpendings } from '../redux/selectors';
import LoginScreen from './LoginScreen';
import ExpenseForm from './ExpenseForm';
import HomeScreen from './HomeScreen';
import SaviorHeader from './SaviorHeader';

const Tab = createBottomTabNavigator();

class SaviorApp extends Component {


  componentDidMount(){
    this.props.setFirebase();
  }

  render() {
    
    if(!this.props.userID){
        return(<LoginScreen />)
    }
    else{
        return (
            <NavigationContainer>
                <SaviorHeader />
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
                        name="Categories"  
                        component={CategoryList} 
                        options={{
                        tabBarLabel: 'Categories',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="cards" color={color} size={size} />
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
        );
    }
    
  }
}

const mapStateToProps = state => ({
  userID: state.auth.userID,
})

const mapDispatchToProps = dispatch => ({
  setFirebase: () => {dispatch(setFirebase())},
})


YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaviorApp)