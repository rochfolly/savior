import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { createUserAccount, setCurrentUser } from '../../redux/actions/actions';
import SaviorHeader from '../SaviorHeader';


class RegisterScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
        name: '',
        email: '',
        password: '',
    };

    this.signIn = this.signIn.bind(this);
  }

  signIn(){
    this.props.createUserAccount(this.state.name, this.state.email, this.state.password)
  }


  render() {
   // Icon.getImageSource('user', 20, 'red').then((source) => console.log(source));
       
    return (
        <View>
            <SaviorHeader/>
            <Text>SIGNUP</Text>
            <Input
                label="First Name"
                name="firstname"
                placeholder="John"
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                // style={styles}
                onChangeText={value => this.setState({ name: value })}
            />
            <Input
                label="Email address"
                name="email"
                placeholder="example@gmail.com"
                autoCapitalize='none'
                leftIcon={{ type: 'font-awesome', name: 'envelope', containerStyle: {paddingRight: 5}  }}
                // style={styles}
                onChangeText={value => this.setState({ email: value })}
            />
            <Input
                label="Password"
                name="password"
                secureTextEntry={true} 
                placeholder=""
                autoCapitalize='none'
                leftIcon={{ type: 'font-awesome', name: 'lock', containerStyle: {paddingRight: 5}  }}
                // style={styles}
                onChangeText={value => this.setState({ password: value })}                      
            />
            <Button
                title="SIGNUP"
                buttonStyle={{ 'borderColor': 'green' }}
                type="solid"
                onPress={this.signIn}
            />
            <Text>Already have an account ? </Text>
            <Button title="Login" type="clear" onPress={() => this.props.navigation.navigate('Login')}/>
        </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createUserAccount: (name, email, password) => {dispatch(createUserAccount(name, email, password))},
})

export default connect(
  null,
  mapDispatchToProps
  )(RegisterScreen)