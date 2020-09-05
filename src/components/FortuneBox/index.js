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
  const statusColor = {
    Waiting: '#f0ad4e',
    Completed: '#33E783',
  };
  export default class FortuneBox extends Component {
    constructor(props) {
      super(props);
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
      console.log(status);
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
              styles.fortuneBox,
              {
                elevation: elevationValue,
                transform: [{scaleX: scaleBoxValue, scaleY: scaleBoxValue}],
              },
            ]}>
            <View style={styles.fortuneBoxImage}>
              <View style={styles.fortuneBoxImageItem}>
                <Image
                  style={{height: 60, width: 60, borderRadius: 30}}
                  source={{
                    uri: image,
                  }}
                />
              </View>
            </View>
            <View style={styles.fortuneBoxInfo}>
              <Text style={styles.fortuneBoxInfoTitle}>{title}</Text>
              <Text style={styles.fortuneBoxInfoDesc}>{desc}</Text>
            </View>
            <View style={styles.fortuneBoxInfo2}>
              {waitTime != '' && (
                <Text style={styles.fortuneBoxInfoTitle}>{waitTime} dk</Text>
              )}
              <Text
                style={[styles.fortuneBoxStatus, {color: statusColor[status]}]}>
                {status}
              </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      );
    }
  }
  
  const styles = StyleSheet.create({
    fortuneBox: {
      backgroundColor: 'rgba(227,227,227,0.1)',
      height: 100,
      borderRadius: 10,
      marginTop: 15,
      marginHorizontal: 15,
      paddingHorizontal: 20,
      alignSelf: 'stretch',
      flexDirection: 'row',
    },
    fortuneBoxImage: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    fortuneBoxInfo: {
      flex: 5,
      justifyContent: 'center',
      alignItems: 'flex-start',
      alignSelf: 'stretch',
      padding: 15,
    },
    fortuneBoxInfo2: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'flex-end',
      alignSelf: 'stretch',
    },
    fortuneBoxImageItem: {
      height: 60,
      width: 60,
      borderRadius: 30,
      backgroundColor: 'grey',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 2,
    },
    fortuneBoxInfoTitle: {
      color: 'white',
      fontSize: 16,
    },
    fortuneBoxInfoDesc: {
      color: 'white',
      opacity: 0.5,
      fontSize: 13,
    },
    fortuneBoxStatus: {
      fontSize: 13,
    },
  });
  