import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';

import ExpenseList from './ExpenseList';
import { setCategories, setExpenses, setFirebase } from '../redux/actions/actions';
import { getExpensesFromCategory, getAllExpenses, getTotalSpendings } from '../redux/selectors';
import LoginScreen from './LoginScreen';

class HomeScreen extends Component {

  componentDidMount(){
    this.props.setExpenses();
    this.props.setCategories();
  }


  render() {
    return (
      <View>
        <Text>Total Spendings: {this.props.totalSpendings}</Text>
        <ExpenseList data={this.props.expenses} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.category.categories,
  expenses: getAllExpenses(state),
  totalSpendings: getTotalSpendings(state)
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