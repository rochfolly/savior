import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { createUserAccount, setCurrentUser } from '../redux/actions/actions';
import SaviorHeader from './SaviorHeader';


class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
        name: '',
        email: '',
        password: '',
        login: true,
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
   // Icon.getImageSource('user', 20, 'red').then((source) => console.log(source));
   let nameInput = this.state.login == true ?
   <Text></Text> :         
   <Input
        label="First Name"
        name="firstname"
        placeholder="John"
        leftIcon={{ type: 'font-awesome', name: 'user' }}
        // style={styles}
        onChangeText={value => this.setState({ name: value })}
    />


    return (
        <View>
            <SaviorHeader/>
            <Text>{this.state.login ? "LOG IN" : "SIGNUP"}</Text>
            {nameInput}
            <Input
                label="Email address"
                name="email"
                placeholder="example@gmail.com"
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                // style={styles}
                onChangeText={value => this.setState({ email: value })}
            />
            <Input
                label="Password"
                name="password"
                secureTextEntry={true} 
                placeholder=""
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                // style={styles}
                onChangeText={value => this.setState({ password: value })}                      
            />
            <Button
                title={this.state.login ? "LOG IN" : "SIGNUP"}
                buttonStyle={{ 'borderColor': 'green' }}
                type="solid"
                onPress={this.authenticate}
            />
            <Button
                title={this.state.login ? "Sign up" : "Log in"}
                type="outline"
                onPress={() => this.setState({login: !this.state.login})}
            />
        </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: (email, password) => {dispatch(setCurrentUser(email, password))},
  createUserAccount: (name, email, password) => {dispatch(createUserAccount(name, email, password))},
})

export default connect(
  null,
  mapDispatchToProps
  )(LoginScreen)