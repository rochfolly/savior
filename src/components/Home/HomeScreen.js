import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';

import ExpenseList from '../Expense/ExpenseList';
import { setCategories, setExpenses, setFirebase } from '../../redux/actions/actions';
import { getExpensesFromCategory, getAllExpenses, getTotalSpendings, getCurrentUserName } from '../../redux/selectors';
import LoginScreen from '../Auth/LoginScreen';

class HomeScreen extends Component {

  componentDidMount(){
    this.props.setExpenses();
    this.props.setCategories();
  }


  render() {
    return (
      <View>
        <Text>Total Spendings: {this.props.totalSpendings}</Text>
        {this.props.expenses.length > 0 ? 
          <ExpenseList data={this.props.expenses} navigation={this.props.navigation} />
          :
          <Text>You don't have any expenses.</Text>
        }
        
      </View>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.category.categories,
  expenses: getAllExpenses(state),
  totalSpendings: getTotalSpendings(state),
  username: getCurrentUserName(state)
})

const mapDispatchToProps = dispatch => ({
  setFirebase: () => {dispatch(setFirebase())},
  setCategories: () => {dispatch(setCategories())},
  setExpenses: () => {dispatch(setExpenses())},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(HomeScreen)