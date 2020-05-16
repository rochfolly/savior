import React, { Component } from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import styles from '../../style/ExpenseStyle';


export default class ExpenseRow extends Component {
    render() {
      return (  
          <TouchableHighlight underlayColor="white">
            <View style={styles.rowExpense}>
              <View style={styles.rowExpenseLeft}>
                <Text style={styles.rowTitle}>{this.props.title}</Text>
                <Text style={styles.rowCategory}>{this.props.category}</Text>
              </View>
              <View style={styles.rowExpenseRight}>
                <Text style={styles.rowAmount}>- {this.props.amount}</Text>
              </View>
            </View>
          </TouchableHighlight>
        
      );
    }
  }