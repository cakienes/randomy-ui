import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Image,
  Dimensions,
  View,
  Easing,
} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export default class PersonBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickAnimation: new Animated.Value(10),
      clickAnimation2: new Animated.Value(0),
      likeAnimation: new Animated.Value(0),
      likeAnimationOpacity: new Animated.Value(1),
    };
  }
  componentDidMount() {
    Animated.timing(this.state.clickAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.elastic(3),
    }).start();
  }

  pressInAnim = () => {
    Animated.timing(this.state.clickAnimation, {
      toValue: 10,
      duration: 30,
      useNativeDriver: true,
    }).start();
  };

  pressOutAnim = () => {
    Animated.timing(this.state.clickAnimation, {
      toValue: 0,
      duration: 30,
      useNativeDriver: true,
    }).start();
  };

  pressInAnim2 = () => {
    Animated.timing(this.state.clickAnimation2, {
      toValue: 10,
      duration: 30,
      useNativeDriver: true,
    }).start();
  };

  pressOutAnim2 = () => {
    Animated.timing(this.state.clickAnimation2, {
      toValue: 0,
      duration: 30,
      useNativeDriver: true,
    }).start();
  };

  onPress = () => {};
  likePic = () => {
    this.state.likeAnimationOpacity.setValue(1);
    this.state.likeAnimation.setValue(0);
    Animated.timing(this.state.likeAnimation, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
    }).start(() => {
      Animated.timing(this.state.likeAnimationOpacity, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
      }).start(() => this.props.nextQuestionFunc());
    });
  };
  render() {
    const animatedStyle = {
      opacity: this.state.clickAnimation.interpolate({
        inputRange: [0, 10],
        outputRange: [1, 0.85], // 0 : 150, 0.5 : 75, 1 : 0
      }),
      transform: [
        {
          scale: this.state.clickAnimation.interpolate({
            inputRange: [0, 10],
            outputRange: [1, 0.95], // 0 : 150, 0.5 : 75, 1 : 0
          }),
        },
        {
          rotateY: this.state.clickAnimation2.interpolate({
            inputRange: [0, 10],
            outputRange: ['0deg', '7deg'], // I would like to set pivot point at 25 25
          }),
          rotateX: this.state.clickAnimation2.interpolate({
            inputRange: [0, 10],
            outputRange: ['0deg', '-7deg'], // I would like to set pivot point at 25 25
          }),
        },
      ],
    };

    const {pictureUrl} = this.props;
    return (
      <Animated.View style={[styles.personBoxHolder, animatedStyle]}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={this.pressInAnim}
          onPressOut={this.pressOutAnim}
          onPress={this.likePic}>
          <Image
            source={{uri: pictureUrl}}
            resizeMode={'cover'}
            style={styles.imageBackground}
          />
          <Animated.View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: this.state.likeAnimationOpacity,
            }}>
            <LottieView
              progress={this.state.likeAnimation}
              loop={false}
              source={require('./likeAnimation.json')}
            />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          onPressIn={this.pressInAnim2}
          onPressOut={this.pressOutAnim2}
          style={styles.showDetailIcon}
          onPress={this.onPress}>
          <Icon name="eye" size={20} color="black" solid />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  personBoxHolder: {
    width: screenWidth / 2 - 20,
    height: (screenHeight - 180) / 2,
    borderRadius: 10,
    display: 'flex',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
  },
  showDetailIcon: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  imageBackground: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
});
