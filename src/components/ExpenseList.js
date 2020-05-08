import React, { Component } from 'react';
import { FlatList, View, ScrollView  } from 'react-native';
import { Container, ListItem, Button } from 'react-native-elements';
import { MaterialCommunityIcons, Icon } from 'react-native-vector-icons';

import styles from '../style/ExpenseStyle';
import ExpenseRow from './ExpenseRow';



export default class ExpenseList extends Component {
    render() {
      return (
        <ScrollView  accessibilityRole='scrollbar' >
          {
            this.props.data.map((expense, index) => (
              <ListItem
                key={index}
                title={expense.title}
                subtitle={expense.category_name.charAt(0).toUpperCase() + expense.category_name.slice(1)}
                leftIcon={<MaterialCommunityIcons name="food" color={'grey'} size={24} /> }
                rightElement={
                  <Button title={expense.amount.toString()} type="solid" color="red"/>
                }
                bottomDivider
                chevron
              />
            ))
          }
          {/* <FlatList 
            data={this.props.data} 
            renderItem={({item}) => 
                <ExpenseRow title={item.title} key={item.key} category={item.category_name} amount={item.amount} />
            }
            keyExtractor={(item, index) => index.toString()}
          /> */}
        </ScrollView >
      );
    }
  }