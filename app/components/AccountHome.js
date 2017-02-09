

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  NavigatorIOS
} from 'react-native';

import {oauth, net} from 'react-native-force';
import AccountList from './AccountList';
import NewAccount from './NewAccount';
export default class AccountHome extends Component {
  constructor(props) {
    super(props);
    this.state = {authenticated: false};
  }
  componentDidMount() {
    var that = this;
      oauth.authenticate(
        function() {
            that.setState({authenticated:true});
        },
        function(error) {
            console.log('Failed to authenticate:' + error);
        }
      );
  }
  render() {
    if (!this.state.authenticated)
        return (<View/>); // Show splash screen if you have one
    var self = this;
    return (
      <NavigatorIOS
          ref="nav"
          style={styles.container}
          initialRoute={{
              title: 'Accounts',
              component: AccountList,
              initialProps: {navigator: navigator},
              rightButtonTitle: 'Logout',
              onRightButtonPress: () => {
                oauth.logout();
              },
              leftButtonTitle: 'Add',
              onLeftButtonPress: () => {
                this.refs.nav.navigator.push({
                 title: "New Account",
                 component: NewAccount,
                 rightButtonTitle: 'Cancel',
                 onRightButtonPress: () => {this.refs.nav.navigator.pop();}
               });}
          }}

      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20

  },
});
