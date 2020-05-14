import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, ScrollView  } from 'react-native';
import { Container, ListItem, Button } from 'react-native-elements';
import { MaterialCommunityIcons, Icon } from 'react-native-vector-icons';

import { capitalize, getNumberOfExpensesByCategory } from '../utils/displayFunctions';
import { getAllExpenses, getAllCategories, getCurrentUserName, getTotalSpendings } from '../redux/selectors';


class CategoryList extends Component {
    render() {
      return (
        <ScrollView accessibilityRole='scrollbar' >
          {
            this.props.categories.map((category, index) => (
              <ListItem
                key={index}
                title={capitalize(category.category_name)}
                subtitle={getNumberOfExpensesByCategory(this.props.expenses, category.category_id).toString() + ' expenses'}
                leftAvatar={<MaterialCommunityIcons name={category.icon} color={'grey'} size={24} /> }
                rightElement={
                  <Button 
                    title={'$' + category.total_expenses.toString()} 
                    type="solid" 
                    buttonStyle={{
                        backgroundColor: 'red',
                        width: 60,
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
                <CategoryRow title={item.title} key={item.key} category={item.category_name} amount={item.amount} />
            }
            keyExtractor={(item, index) => index.toString()}
          /> */}
        </ScrollView >
      );
    }
  }

const mapStateToProps = state => ({
  categories: state.category.categories,
  expenses: getAllExpenses(state),
  totalSpendings: getTotalSpendings(state),
  username: getCurrentUserName(state)
})

export default connect(
  mapStateToProps,
  null
  )(CategoryList)