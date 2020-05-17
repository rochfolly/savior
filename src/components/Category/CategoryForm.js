import moment from 'moment';
import * as firebase from 'firebase';
import { connect } from "react-redux";
import React, { Component } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {  Input, Button, Icon } from 'react-native-elements';
import { TouchableHighlight, Text, View, TextInput, StyleSheet, Picker } from 'react-native';

import { getAllCategories } from '../../redux/selectors';
import expensesReducer from '../../redux/reducers/expensesReducer';
import { capitalize } from '../../utils/displayFunctions';
import { addCategory, addExpense } from '../../redux/actions/actions';


const initialState = { 
  title: '', 
  monthly_limit: '',
  icon: '', 
};

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.createCategory = this.createCategory.bind(this);
  }

  createCategory(){
    let newCategory = {
      title: this.state.title.trim().toLowerCase(),
      amount: parseInt(this.state.amount), 
      category_name: this.state.category, 
      created: this.state.date.toISOString(),
      currency: 'USD'
    };
    this.props.addCategory(newCategory);
    this.props.navigation.navigate("Categories");
    this.setState(initialState);
  }

  render() {
    
     const newCategoryZone = this.state.add == false ? null :
       <View style={styles.container}>
        <TextInput 
          label="New Category" 
          name="new_category"
          style={styles.textInput}
          value={this.state.newCategory}
          onChangeText={(text) => this.setState({newCategory: text})}
        />
        <Button title={'Add'} onPress={this.createCategory} />
      </View>


      // RENDER THE FORM
      return(
        <View style={styles.container}>
          <Text h4>NEW Category</Text>
          <View name="Form" style={styles.container}>
            <Input
                label="Name"
                name="title"
                placeholder=""
                // leftIcon={{ type: 'font-awesome', name: 'envelope', containerStyle: {paddingRight: 5} }}
                // style={styles}
                onChangeText={(text) => this.setState((prevState, props) => {
                    return {title: text}
                })}
            />

            <Input
                label="Monthly limit"
                name="monthly_limit"
                placeholder=""
                // leftIcon={{ type: 'font-awesome', name: 'envelope', containerStyle: {paddingRight: 5} }}
                // style={styles}
                onChangeText={(text) => this.setState((prevState, props) => {
                    return {monthly_limit: text}
                })}
            />

          </View>
          <Button
              title={'Save'}
              onPress={this.createCategory}
            />
        </View>
     );
  }
}

const mapStateToProps = state => ({
  categories: state.category.categories,
})

const mapDispatchToProps = dispatch => ({
  addCategory: (newCategory) => {dispatch(addCategory(newCategory))},
  addExpense: (newExpense) => {dispatch(addExpense(newExpense))}
})
export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});