import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {Component} from 'react';

const screenWidth = Math.round(Dimensions.get('window').width);

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchArea: new Animated.Value(0),
    };
  }
  SearchPressInAnim = () => {
    Animated.timing(this.state.searchArea, {
      toValue: 10,
      duration: 400,
    }).start();
  };

  SearchPressOutAnim = () => {
    Animated.timing(this.state.searchArea, {
      toValue: 0,
      duration: 400,
    }).start();
  };
  render() {
    return (
      <View
        style={{
          height: 70,
          width: '100%',
          marginBottom: 15,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: '33.33333333%',
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'red',
          }}>
          <Text>P</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '33.33333333%',
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'yellow',
          }}>
          <Text>H</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '33.33333333%',
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'green',
          }}>
          <Text>S</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: '100%',
    backgroundColor: '#4F38A6',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    zIndex: 999,
  },
  headerLeft: {
    width: 75,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerMiddle: {
    width: screenWidth - 149,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    width: 75,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
