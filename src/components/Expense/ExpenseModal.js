import React, { Component } from 'react';
import moment from 'moment';
import { connect } from "react-redux";
import Modal from 'react-native-modal';
import {  Input, Button } from 'react-native-elements';
import { TouchableHighlight, Text, View } from 'react-native';

import styles from '../../style/ExpenseStyle';
import { removeExpense } from '../../redux/actions/actions';


class ExpenseModal extends Component {
    render() {
      let expense = this.props.expense;
      return (  
          <Modal isVisible={this.props.visible}>
            <View>
              <Text>{expense.title}</Text>
              <Text>{expense.amount.toString()}</Text>
              <Text>{expense.category_name}</Text>
              <Text>{moment(expense.created).format('MMMM Do YYYY')}</Text>
              <Button
                title="Edit"
                type="outline" 
                buttonStyle={{
                    backgroundColor: 'skyblue',
                    width: 60,
                    height: 30
                }}
              />
              <Button
                title="Remove"
                type="solid" 
                buttonStyle={{
                    backgroundColor: 'red',
                    width: 60,
                    height: 30
                }}
                onPress={() => {this.props.removeExpense(expense)}}
              />
            </View>
          </Modal>
        
      );
    }
  }

const mapStateToProps = state => ({
  categories: state.category.categories,
})

const mapDispatchToProps = dispatch => ({
  removeExpense: (expenseID) => {dispatch(removeExpense(expenseID))},
  addExpense: (newExpense) => {dispatch(addExpense(newExpense))}
})
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseModal)
