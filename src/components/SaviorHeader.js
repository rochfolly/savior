import React, { Component } from 'react';
import { Container, Header } from 'react-native-elements';


export default class SaviorHeader extends Component {
    render() {
      return (  
          <Header
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'Savior', style: { color: '#fff', fontFamily: 'sans-serif-medium', fontSize: 24 } }}
            rightComponent={{ icon: 'add', color: '#fff' }} 
          />       
      );
    }
  }