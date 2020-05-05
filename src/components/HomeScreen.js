import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';

import ExpenseList from './ExpenseList';
import { setCategories, setExpenses } from '../redux/actions/actions';
import { getExpensesFromCategory, getAllExpenses } from '../redux/selectors';

class HomeScreen extends Component {
  componentDidMount(){
    this.props.setCategories();
    this.props.setExpenses();
  }

  render() {
    return (
      <View>
        <ExpenseList data={this.props.expenses} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.category.categories,
  expenses: getAllExpenses(state),
  foodExpenses: getExpensesFromCategory(state, 'food')
})

const mapDispatchToProps = dispatch => ({
  setCategories: () => {dispatch(setCategories())},
  setExpenses: () => {dispatch(setExpenses())},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(HomeScreen)