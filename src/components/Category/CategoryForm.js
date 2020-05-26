import moment from 'moment';
import * as firebase from 'firebase';
import { connect } from "react-redux";
import React, { Component } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {  Input, Button, Icon, CheckBox, Text  } from 'react-native-elements';
import { TouchableHighlight, View, TextInput, StyleSheet, Picker } from 'react-native';

import { capitalize } from '../../utils/displayFunctions';
import { addCategory, addExpense } from '../../redux/actions/actions';


const initialState = { 
  title: '', 
  monthly_limit: '',
  weekly_limit: '',
  icon: null,
  primary: true
};

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.createCategory = this.createCategory.bind(this);
  }

  createCategory(){
    let newCategory = {
      category_name: this.state.title.trim().toLowerCase(),
      primary: this.state.primary,
      icon: this.state.icon, 
      weekly_limit: this.state.weekly_limit ? parseInt(this.state.weekly_limit) : null,
      monthly_limit: this.state.monthly_limit ? parseInt(this.state.monthly_limit) : null
    };
    this.props.addCategory(newCategory);
    this.props.navigation.navigate("Categories");
    this.setState(initialState);
  }


  render() {

      // RENDER THE FORM
      return(
        <View style={styles.container}>
          <Text h4>New Category</Text>
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

            <CheckBox
                center
                title='Primary'
                checked={this.state.primary}
                disabled
            />

            <Input
                label="Monthly limit (optional)"
                name="monthly_limit"
                keyboardType="numeric"
                placeholder=""
                // leftIcon={{ type: 'font-awesome', name: 'envelope', containerStyle: {paddingRight: 5} }}
                // style={styles}
                onChangeText={(text) => this.setState((prevState, props) => {
                    return {weekly_limit: text}
                })}
            />

            <Input
                label="Weekly limit (optional)"
                name="weekly"
                keyboardType="numeric"
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