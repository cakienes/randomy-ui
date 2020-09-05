import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';
import TabNavContainer from '../../components/TabNavContainer';

export default class Settings extends Component {
  render() {
    return (
      <TabNavContainer>
       <Text>Settings</Text>
      </TabNavContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
