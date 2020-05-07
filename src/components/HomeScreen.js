import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';

import ExpenseList from './ExpenseList';
import { setCategories, setExpenses } from '../redux/actions/actions';
import { getExpensesFromCategory, getAllExpenses, getTotalSpendings } from '../redux/selectors';

class HomeScreen extends Component {
  componentDidMount(){
    this.props.setCategories();
    this.props.setExpenses();
  }

  render() {
    console.log('TOTAL', this.props.totalSpendings)
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
  setCategories: () => {dispatch(setCategories())},
  setExpenses: () => {dispatch(setExpenses())},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(HomeScreen)