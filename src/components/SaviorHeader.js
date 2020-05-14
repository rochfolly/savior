import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View,  } from 'react-native';
import { Container, Header, Text } from 'react-native-elements';
import { getTotalSpendings } from '../redux/selectors';


class SaviorHeader extends Component {
  
    render() {
      let textBand = this.props.username ?
      <Text h4 style={{ backgroundColor: 'rgb(32, 116,220)', color: 'white' }}>
        {this.props.username}
      </Text> 
      :
      null

      return ( 
        <View>
          <Header
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'Savior', style: { color: '#fff', fontFamily: 'sans-serif-medium', fontSize: 24 } }}
            rightComponent={{ icon: 'add', color: '#fff' }} 
            
          /> 
          {textBand}
        </View> 
             
      );
    }
  }

const mapStateToProps = state => ({
  username: state.auth.username,
  totalSpendins: getTotalSpendings(state)
})

const mapDispatchToProps = dispatch => ({
  setFirebase: () => {dispatch(setFirebase())},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaviorHeader)