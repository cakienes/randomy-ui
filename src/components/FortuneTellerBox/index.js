import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import {Transition} from 'react-navigation-fluid-transitions';
export default class FortuneTellerBox extends Component {
  constructor(props) {
    super(props);
    // Burada this.setState()'i çağırmayınız!
    this.state = {
      clickAnimation: new Animated.Value(0),
    };
  }
  PressInAnim = () => {
    Animated.timing(this.state.clickAnimation, {
      toValue: 10,
      duration: 30,
      useNativeDriver: true,
    }).start();
  };

  PressOutAnim = () => {
    Animated.timing(this.state.clickAnimation, {
      toValue: 0,
      duration: 30,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {
      isLastItem,
      onPress,
      title,
      desc,
      waitTime,
      image,
      status,
      key,
    } = this.props;
    const {clickAnimation} = this.state;
    const elevationValue = clickAnimation.interpolate({
      inputRange: [0, 10],
      outputRange: [0, 0],
    });
    const scaleBoxValue = clickAnimation.interpolate({
      inputRange: [0, 10],
      outputRange: [1, 0.95],
    });
    return (
      <TouchableOpacity
        style={{marginBottom: isLastItem ? 60 : 0}}
        key={key}
        onPressIn={this.PressInAnim}
        onPressOut={this.PressOutAnim}
        onPress={onPress}
        activeOpacity={1}>
        <Animated.View
          style={[
            styles.fortuneTellerBox,
            {
              elevation: elevationValue,
              transform: [{scaleX: scaleBoxValue, scaleY: scaleBoxValue}],
            },
          ]}>
          <View style={styles.fortuneTellerBoxImage}>
            <View style={styles.fortuneTellerBoxImageItem}>
              <Image
                style={{height: 60, width: 60, borderRadius: 30}}
                source={{
                  uri: image,
                }}
              />
            </View>
          </View>
          <View style={styles.fortuneTellerBoxInfo}>
            <Text style={styles.fortuneTellerBoxInfoTitle}>{title}</Text>
            <Text style={styles.fortuneTellerBoxInfoDesc}>{desc}</Text>
          </View>
          <View style={styles.fortuneTellerBoxInfo2}>
            {waitTime != '' && (
              <Text style={styles.fortuneTellerBoxInfoTitle}>
                {waitTime} dk
              </Text>
            )}
            <Text
              style={[
                styles.fortuneTellerBoxStatus,
                {color: status == 'Online' ? '#33E783' : '#fb0066'},
              ]}>
              {status}
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  fortuneTellerBox: {
    backgroundColor: 'rgba(227,227,227,0.1)',
    height: 100,
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 15,
    paddingHorizontal: 20,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  fortuneTellerBoxImage: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  fortuneTellerBoxInfo: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    padding: 15,
  },
  fortuneTellerBoxInfo2: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
  },
  fortuneTellerBoxImageItem: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  fortuneTellerBoxInfoTitle: {
    color: 'white',
    fontSize: 16,
  },
  fortuneTellerBoxInfoDesc: {
    color: 'white',
    opacity: 0.5,
    fontSize: 13,
  },
  fortuneTellerBoxStatus: {
    fontSize: 13,
  },
});
