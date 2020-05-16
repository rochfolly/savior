import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { FlatList, View, ScrollView  } from 'react-native';
import { Container, ListItem, Button, Text, Icon } from 'react-native-elements';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import ExpenseRow from './ExpenseRow';
//import Modal from './ExpenseModal';
import ExpenseModal from './ExpenseModal';
import modalStyle from '../../style/modalStyle';
import { removeExpense } from '../../redux/actions/actions';
import { capitalize, getCategoryIcon } from '../../utils/displayFunctions';


class ExpenseList extends Component {
   state = {
     activeExpense: null,
     toggleModal: false
   }

    displayModal = (expense) => {

      this.setState({
        activeExpense: expense,
        toggleModal: !this.state.toggleModal
      })
    }

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
                onPress={() => this.displayModal(expense)}
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
          {this.state.activeExpense && 
          <Modal 
          isVisible={this.state.toggleModal}
          onBackdropPress={() => setModalVisible(false)}
          >
            <View style={modalStyle.modalView}>
              <Text h3>{capitalize(this.state.activeExpense.title)}</Text>
              <Text>{this.state.activeExpense.amount.toString()}</Text>
              <Text>{capitalize(this.state.activeExpense.category_name)}</Text>
              <Text>{moment(this.state.activeExpense.created).format('MMMM Do YYYY')}</Text>
              <Button
                title="Edit"
                type="outline" 
                buttonStyle={{
                    borderColor: 'skyblue',
                    width: 60,
                    height: 30
                }}
                onPress={() => {this.props.navigation.navigate("Edit")}}
              />
              <Button
                title="Remove"
                type="solid"
                buttonStyle={modalStyle.removeButton}
                onPress={() => {this.props.removeExpense(this.state.activeExpense)}}
              />
              <Icon
                name="close"
                type="solid"
                color='white'
                containerStyle={modalStyle.closeIcon}
                onPress={() => {this.displayModal(null)}}
              />
            </View>
          </Modal>}
        </ScrollView >
      );
    }
  }

  
const mapStateToProps = state => ({
  categories: state.category.categories,
})

const mapDispatchToProps = dispatch => ({
  addCategory: (newCategory) => {dispatch(addCategory(newCategory))},
  removeExpense: (expenseID) => {dispatch(removeExpense(expenseID))}
})
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseList)