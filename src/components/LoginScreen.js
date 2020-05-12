import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { createUserAccount, setCurrentUser } from '../redux/actions/actions';


class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
        name: '',
        email: '',
        password: '',
        login: false,
    };

    this.authenticate = this.authenticate.bind(this);

  }

  authenticate(){
      if(this.state.login){
          this.props.setCurrentUser(this.state.email, this.state.password)
      }
      else this.props.createUserAccount(this.state.name, this.state.email, this.state.password)
  }
  

  render() {
    let nameInput = this.state.login ? 
    null 
    : 
    <Input
        label="First Name"
        placeholder="John"
        leftIcon={{ type: 'font-awesome', name: 'user' }}
        // style={styles}
        onChangeText={value => this.setState({ name: value })}
    />

    return (
      <View>

        {nameInput}
        <Input
            label="Email address"
            placeholder="example@gmail.com"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            // style={styles}
            onChangeText={value => this.setState({ email: value })}
        />

        <Input
            label="Password"
            secureTextEntry={true} 
            placeholder=""
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            // style={styles}
            onChangeText={value => this.setState({ password: value })}
        />
        <Button
            title="LOGIN"
            buttonStyle={{ 'borderColor': 'green' }}
            type="solid"
        />
        <Button
            title="SIGN IN"
            type="outline"
            onPress={this.authenticate}
        />

      </View>
    );
  }
}

const mapStateToProps = state => ({
  firebase: state.auth.database,
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: (email, password) => {dispatch(setCurrentUser(email, password))},
  createUserAccount: (name, email, password) => {dispatch(createUserAccount(name, email, password))},
})

export default connect(
  null,
  mapDispatchToProps
  )(LoginScreen)