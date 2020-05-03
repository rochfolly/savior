import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import ExpenseList from './ExpenseList';
import { connect } from 'react-redux';
import { setCategories, setExpenses } from '../redux/actions/actions';

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
  expenses: state.expense.expenses
})

const mapDispatchToProps = dispatch => ({
  setCategories: () => {dispatch(setCategories())},
  setExpenses: () => {dispatch(setExpenses())},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(HomeScreen)