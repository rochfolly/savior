import moment from 'moment';
import * as firebase from 'firebase';
import { connect } from "react-redux";
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import {  Input, Button } from 'react-native-elements';
import { TouchableHighlight, Text, View, TextInput, StyleSheet, Picker } from 'react-native';

import { setCategories, addCategory, addExpense } from '../redux/actions/actions'
import { getAllCategories } from '../redux/selectors'
import expensesReducer from '../redux/reducers/expensesReducer';
import { capitalize } from '../utils/displayFunctions';


class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        add: false,
        test: '', 
        title: '', 
        amount: '', 
        category: '', 
        date: new Date(),
        newCategory: '', 
        showDatePicker: false
    };

    this.showDatepicker = this.showDatepicker.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.createExpense = this.createExpense.bind(this);
  }

  showDatepicker(){
    this.setState({showDatePicker: true})
  }

  createCategory(){
    let newCategory = this.state.newCategory
    this.props.addCategory(newCategory.trim().toLowerCase())

    this.setState((prevState, props) => {
      return {
        category: newCategory,
        add: false
      }
    })
  }

  createExpense(){
    let newExpense = {
      title: this.state.title,
      amount: parseInt(this.state.amount), 
      category_name: this.state.category, 
      created: this.state.date.toISOString(),
      currency: 'USD'
    }
    this.props.addExpense(newExpense)
  }

  render() {
    const selectChoices = this.props.categories.map((choice, index) => 
         <Picker.Item key={index} label={capitalize(choice.category_name)} value={choice.category_name} />
      )
    
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
          <Text>NEW EXPENSE</Text>
          <View name="Form" style={styles.form}>
            <Text>Title</Text>
            <TextInput 
              label="Title" 
              name="title" 
              style={styles.textInput}
              value={this.state.title} 
              onChangeText={(text) => this.setState((prevState, props) => {
                return {title: text}
              })}
            />

            <Text>Amount</Text>
            <TextInput 
              label="Amount" 
              name="amount" 
              keyboardType="numeric"
              style={styles.textInput}
              value={this.state.amount} 
              onChangeText={(text) => this.setState({amount: text})}
            />

            <Text>Category</Text>
            <Picker
                selectedValue={this.state.category}
                style={{height: 50, width: 200}}
                onValueChange={(itemValue, itemIndex) => {
                  if(itemValue == 'new'){
                    this.setState({add: true, category:''})
                  }
                  else this.setState({category: itemValue, add: false})
                }
            }>
                <Picker.Item key={null} label="Select a Category" value="" />
                {selectChoices}
                <Picker.Item key={selectChoices.length} label="Create new category" value="new" />
            </Picker>
            {newCategoryZone}

            <Text>Date</Text>
            <Text>{moment(this.state.date).format('LL')}</Text>
            <Icon name="edit-2" size={30} color="#900" onPress={this.showDatepicker} />
            {this.state.showDatePicker && (
            <DateTimePicker
              testID="DatePicker"
              timeZoneOffsetInMinutes={0}
              value={this.state.date}
              mode="date"
              is24Hour={true}
              display="calendar"
              onChange={(event, selectedDate) => {
                this.setState({date: selectedDate, showDatePicker: false})
                console.info(selectedDate)
              }}
            />
            )}
            </View>
            <Button
              title={'Save'}
              onPress={this.createExpense}
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
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});