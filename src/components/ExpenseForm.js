import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux'

import { setCategories } from '../redux/actions/actions'
import { getAllCategories } from '../redux/selectors'

const categories = [
        {label:"Food", value:"food"},
        {label:"Clothing", value:"clothing"},
        {label:"Transport", value:"transport"},
        {label:"Travel", value:"travel"},
    ]

class ExpenseForm extends Component {
  componentDidMount(){
    console.info('MOUNT')
    this.props.setCategories(categories)
  }

  render() {
      return(
        <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <View style={{flexDirection: 'row'}}>
            <FlatList></FlatList>
        </View>
        </View>
     );
  }
}

const mapStateToProps = state => ({
    categories: state.categories

})

const  mapDispatchToProps = dispatch => {
    return {
        setCategories
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});