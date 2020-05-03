import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import styles from '../style/ExpenseStyle';
import ExpenseRow from './ExpenseRow';


export default class ExpenseList extends Component {
    render() {
      return (
        <View style={styles.listExpense}>
          <FlatList 
            data={this.props.data} 
            renderItem={({item}) => 
                <ExpenseRow title={item.title} key={item.key} category={item.category_name} amount={item.amount} />
            }
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
  }