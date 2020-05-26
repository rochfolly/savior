import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { YellowBox } from 'react-native';
import _ from 'lodash';

import ExpenseList from './Expense/ExpenseList';
import CategoryList from './Category/CategoryList';
import { setCategories, setExpenses, setFirebase } from '../redux/actions/actions';
import { getExpensesFromCategory, getAllExpenses, getTotalSpendings } from '../redux/selectors';
import LoginScreen from './Auth/LoginScreen';
import ExpenseForm from './Expense/ExpenseForm';
import HomeScreen from './Home/HomeScreen';
import SaviorHeader from './SaviorHeader';
import RegisterScreen from './Auth/RegisterScreen';
import ExpenseEdit from './Expense/ExpenseEdit';
import CategoryForm from './Category/CategoryForm';


const AuthStack = createStackNavigator();

function AuthStackNavigator(){
  return(
    <AuthStack.Navigator
      initialRouteName="Login"
      headerMode="none"
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  )
}

const HomeStack = createStackNavigator();

function HomeStackRenderer(){
  return(
    <HomeStack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        title:"Savior",
        headerTitleAlign: "center",
        headerStyle: {backgroundColor: 'skyblue'},
        headerTitleStyle: {color: 'white'}
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen}/>
      <HomeStack.Screen name="Edit" component={ExpenseEdit} options={{}}/>
    </HomeStack.Navigator>
  )
}

const CategoryStack = createStackNavigator();

function CategoryStackRenderer(){
  return(
    <CategoryStack.Navigator
      initialRouteName="Categories"
      headerMode="screen"
      screenOptions={{
        title:"Savior",
        headerTitleAlign: "center",
        headerStyle: {backgroundColor: 'skyblue'},
        headerTitleStyle: {color: 'white'}
      }}
    >
      <CategoryStack.Screen name="Categories" component={CategoryList}/>
      <CategoryStack.Screen name="Add" component={CategoryForm} options={{}}/>
    </CategoryStack.Navigator>
  )
}

// Global App
const AppStack = createBottomTabNavigator();

function AppStackRenderer(){
  
  return (
    <AppStack.Navigator 
      initialRouteName="Home" 
      backBehavior="history"
      tabBarOptions={{
        activeBackgroundColor: 'grey',
      }}
      // headerTitleAlign="center"
      headerMode="screen"
      // screenOptions={({ route }) => ({
      //     title:"Savior",
      //     headerTitleAlign: "center",
      //     headerStyle: {backgroundColor: 'skyblue'},
      //     headerTitleStyle: {color: 'white'}
      //   }
      // )}
      screenptions={{
        title:"Savior",
        headerTitleAlign: "center",
        headerStyle: {backgroundColor: 'skyblue'},
        headerTitleStyle: {color: 'white'}
      }}
      
    >
          <AppStack.Screen 
              name="Home" 
              component={HomeStackRenderer} 
              options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
              }}
          />
          <AppStack.Screen 
              name="Categories"  
              component={CategoryStackRenderer} 
              options={{
              tabBarLabel: 'Categories',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="cards" color={color} size={size} />
              ),
              }}
          />
          <AppStack.Screen 
              name="New"  
              component={ExpenseForm} 
              options={{
              tabBarLabel: 'New',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons 
                    name="plus-circle" 
                    color="red" 
                    size={size}             
                  />
              ),
              }}
          />
          <AppStack.Screen 
              name="Stats"  
              component={ExpenseForm} 
              options={{
              tabBarLabel: 'Stats',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="graphql" color={color} size={size} />
              ),
              }}
          />
          <AppStack.Screen 
              name="Settings"  
              component={ExpenseForm} 
              options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="settings" color={color} size={size} />
              ),
              }}
          />
  </AppStack.Navigator>
  )
}

class SaviorApp extends Component {


  componentDidMount(){
    this.props.setFirebase();
  }

  render() {

    return (
      <NavigationContainer>
        {!this.props.userID ? (
           <AuthStackNavigator />
          )
          :
          (
          <AppStackRenderer />
          )}
      </NavigationContainer>
        );
    
    
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