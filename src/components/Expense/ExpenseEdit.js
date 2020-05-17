import moment from 'moment';
import * as firebase from 'firebase';
import { connect } from "react-redux";
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import {  Input, Button } from 'react-native-elements';
import { TouchableHighlight, Text, View, TextInput, StyleSheet, Picker } from 'react-native';

import { getAllCategories } from '../../redux/selectors';
import expensesReducer from '../../redux/reducers/expensesReducer';
import { capitalize } from '../../utils/displayFunctions';
import { addCategory, updateExpense } from '../../redux/actions/actions';



class ExpenseEdit extends Component {
  constructor(props) {
    super(props);
    const { expense } = this.props.route.params;
    // Sat May 16 2020 15:07:43 GMT-0400 (heure d’été de l’Est)
    this.state = {
        add: false,
        expense_id: expense.expense_id, 
        title: expense.title, 
        amount: expense.amount.toString(), 
        category: expense.category_name, 
        date: new Date(expense.created),
        newCategory: '', 
        showDatePicker: false 
    };

    this.showDatepicker = this.showDatepicker.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.editExpense = this.editExpense.bind(this);
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

  editExpense(){
    let editedExpense = {
      expense_id: this.state.expense_id,
      title: this.state.title,
      amount: parseInt(this.state.amount), 
      category_name: this.state.category, 
      created: this.state.date.toISOString(),
      currency: 'USD'
    };
    this.props.updateExpense(editedExpense);
    this.props.navigation.goBack();
  }

  render() {
    const selectChoices = this.props.categories.map((choice, index) => 
         <Picker.Item key={index} label={capitalize(choice.category_name)} value={choice.category_name} />
      )
    
     const newCategoryZone = 
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
            {this.state.add && newCategoryZone}

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
                if(selectedDate !== undefined){
                    this.setState({date: selectedDate, showDatePicker: false});
                }
              }}
            />
            )}
            </View>
            <Button
              title={'Save'}
              color="green"
              onPress={this.editExpense}
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
  updateExpense: (editedExpense) => {dispatch(updateExpense(editedExpense))}
})
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseEdit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});