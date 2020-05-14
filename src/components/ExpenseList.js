import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, ScrollView  } from 'react-native';
import { Container, ListItem, Button } from 'react-native-elements';
import { MaterialCommunityIcons, Icon } from 'react-native-vector-icons';

import styles from '../style/ExpenseStyle';
import ExpenseRow from './ExpenseRow';
import { capitalize, getCategoryIcon } from '../utils/displayFunctions';


class ExpenseList extends Component {
    render() {
      return (
        <ScrollView  accessibilityRole='scrollbar' >
          {
            this.props.data.map((expense, index) => (
              <ListItem
                key={index}
                title={expense.title}
                subtitle={capitalize(expense.category_name)}
                leftIcon={<MaterialCommunityIcons name="food" color={'grey'} size={24} /> }
                rightElement={
                  <Button 
                    title={'- ' + expense.amount.toString()} 
                    type="solid"
                    buttonStyle={{
                      backgroundColor: 'red',
                      width: 55,
                      height: 30
                    }}
                  />
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

  const mapStateToProps = state => ({
    categories: state.category.categories,
  })
  
  export default connect(
    mapStateToProps,
    null
    )(ExpenseList)