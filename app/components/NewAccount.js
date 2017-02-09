'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';
import {oauth, net} from 'react-native-force';
class NewAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {count:0};

  }
  handleButtonClick() {
    // Explicitly focus the text input using the raw DOM API
    //this.textInput.focus();

    net.create('Account',{Name: "Another account "},
      function(obj) {
        console.log('Success');
      },
      function(err) {
        console.log('Error');
      }
    );
  }
  render() {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop:60
  },
  button: {
    marginTop:60
  }
});


export default NewAccount;
